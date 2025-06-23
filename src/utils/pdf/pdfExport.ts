import { toast } from "sonner";
import html2pdf from 'html2pdf.js';
import { compressImages } from './imageCompression';
import { scaleElementForPdf } from './elementScaling';
import { createPdfConfig, detectPosterOrientation } from './pdfConfig';

/**
 * Creates a temporary container for the cloned element with proper isolation
 */
const createTempContainer = (clonedElement: HTMLElement, orientation: 'landscape' | 'portrait') => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'fixed';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
  tempDiv.style.overflow = 'hidden';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.margin = '0';
  tempDiv.style.padding = '0';
  
  // Set dimensions based on orientation
  if (orientation === 'landscape') {
    tempDiv.style.width = '1131px';
    tempDiv.style.height = '800px';
  } else {
    tempDiv.style.width = '800px';
    tempDiv.style.height = '1131px';
  }
  
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(clonedElement);
  return tempDiv;
};

/**
 * Cleans up the temporary container
 */
const cleanupTempContainer = (tempDiv: HTMLElement) => {
  if (tempDiv && tempDiv.parentNode) {
    document.body.removeChild(tempDiv);
  }
};

/**
 * Ensures all Google Fonts are loaded and applied correctly
 */
const ensureFontsLoaded = async (clonedElement: HTMLElement) => {
  // Get all unique font families used in the element
  const fontFamilies = new Set<string>();
  
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((el) => {
    const computedStyle = window.getComputedStyle(el);
    const fontFamily = computedStyle.fontFamily;
    if (fontFamily && fontFamily !== 'inherit') {
      fontFamilies.add(fontFamily);
    }
  });

  // Load fonts explicitly
  const fontPromises = Array.from(fontFamilies).map(async (fontFamily) => {
    try {
      await document.fonts.load(`16px ${fontFamily}`);
      await document.fonts.load(`bold 16px ${fontFamily}`);
    } catch (error) {
      console.warn(`Could not load font: ${fontFamily}`, error);
    }
  });

  await Promise.all(fontPromises);
  
  // Ensure fonts are applied to all elements
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(el);
    htmlElement.style.fontFamily = computedStyle.fontFamily;
    htmlElement.style.fontSize = computedStyle.fontSize;
    htmlElement.style.fontWeight = computedStyle.fontWeight;
    htmlElement.style.fontStyle = computedStyle.fontStyle;
  });
};

/**
 * Gets the original poster element from the preview (without zoom scaling)
 */
const getOriginalPosterElement = () => {
  // Get the poster content element that hasn't been scaled by zoom
  const posterPreview = document.getElementById('poster-preview');
  if (posterPreview) {
    const posterContent = posterPreview.querySelector('#poster-content');
    return posterContent as HTMLElement;
  }
  return document.getElementById('poster-content');
};

/**
 * Converts QR code images to base64 to ensure they export properly
 */
const processQrCodeImages = async (clonedElement: HTMLElement) => {
  const qrImages = clonedElement.querySelectorAll('img[src*="qrserver.com"]');
  
  for (const img of qrImages) {
    const imgElement = img as HTMLImageElement;
    try {
      // Fetch the QR code image and convert to base64
      const response = await fetch(imgElement.src);
      const blob = await response.blob();
      const reader = new FileReader();
      
      await new Promise((resolve) => {
        reader.onload = () => {
          imgElement.src = reader.result as string;
          resolve(null);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Could not convert QR code to base64:', error);
    }
  }
};

/**
 * Ensures proper styling for PDF export and removes scrollbars
 */
const preparePosterForExport = (clonedElement: HTMLElement, orientation: 'landscape' | 'portrait') => {
  // Set exact dimensions based on orientation
  if (orientation === 'landscape') {
    clonedElement.style.width = '1131px';
    clonedElement.style.height = '800px';
  } else {
    clonedElement.style.width = '800px';
    clonedElement.style.height = '1131px';
  }
  
  clonedElement.style.position = 'relative';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.display = 'flex';
  clonedElement.style.flexDirection = 'column';
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.boxSizing = 'border-box';
  clonedElement.style.backgroundColor = '#ffffff';
  
  // Remove any transforms that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  // Force visibility and remove scrollbars on all child elements
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.visibility = 'visible';
    htmlElement.style.opacity = '1';
    htmlElement.style.overflow = 'hidden';
    
    // Remove any scroll-related styles
    htmlElement.style.overflowX = 'hidden';
    htmlElement.style.overflowY = 'hidden';
    htmlElement.style.scrollBehavior = 'auto';
  });
  
  // Ensure the main container has proper flex layout
  const mainContainer = clonedElement.querySelector('.p-4.h-full.flex.flex-col') || 
                        clonedElement.querySelector('.p-2') ||
                        clonedElement.querySelector('[class*="p-"]');
  if (mainContainer) {
    const container = mainContainer as HTMLElement;
    container.style.height = '100%';
    container.style.overflow = 'hidden';
  }
};

/**
 * Exports a DOM element as a high-quality A0-sized PDF
 * Automatically detects orientation and preserves fonts
 * @param elementId The ID of the DOM element to export
 */
export const exportToPDF = async (elementId: string) => {
  // Get the original poster content (before zoom scaling)
  const element = getOriginalPosterElement();
  
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  console.log("Found original poster content element:", element);
  
  // Detect poster orientation
  const orientation = detectPosterOrientation(element);
  console.log("Detected poster orientation:", orientation);
  
  // Create a clean copy of the poster for PDF export
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Prepare the element for export
  preparePosterForExport(clonedElement, orientation);
  
  const tempDiv = createTempContainer(clonedElement, orientation);
  
  try {
    // Ensure fonts are loaded and applied
    await ensureFontsLoaded(clonedElement);
    
    // Process QR code images first
    await processQrCodeImages(clonedElement);
    
    // Compress other images
    compressImages(clonedElement);
    
    // Scale the element for PDF export using the corrected scaling logic
    scaleElementForPdf(clonedElement, orientation);
    
    toast.info(`Preparing high-quality A0 ${orientation} PDF export...`);
    
    // Create PDF configuration with detected orientation
    const pdfConfig = createPdfConfig(orientation);
    
    setTimeout(() => {
      html2pdf().from(clonedElement).set(pdfConfig).outputPdf('blob').then((pdfBlob: Blob) => {
        // Create download link
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `conference-poster-A0-${orientation}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        const sizeInMB = (pdfBlob.size / (1024 * 1024)).toFixed(2);
        toast.success(`A0 ${orientation} PDF exported successfully! File size: ${sizeInMB}MB`);
        
        // Clean up
        cleanupTempContainer(tempDiv);
      }).catch(err => {
        console.error("PDF export failed:", err);
        toast.error("PDF export failed. Please try again.");
        // Clean up
        cleanupTempContainer(tempDiv);
      });
    }, 500);
  } catch (error) {
    console.error("PDF preparation failed:", error);
    toast.error("PDF preparation failed. Please try again.");
    cleanupTempContainer(tempDiv);
  }
};
