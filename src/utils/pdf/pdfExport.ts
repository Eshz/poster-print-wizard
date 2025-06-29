import { toast } from "sonner";
import html2pdf from 'html2pdf.js';
import { compressImages } from './imageCompression';
import { scaleElementForPdf } from './elementScaling';
import { createPdfConfig } from './pdfConfig';
import { getPosterDimensions } from '../posterConstants';
import { preloadFonts } from './fontLoader';

/**
 * Creates a temporary container for the cloned element with proper isolation
 */
const createTempContainer = (clonedElement: HTMLElement) => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'fixed';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
  tempDiv.style.width = '800px';
  tempDiv.style.height = '1131px';
  tempDiv.style.overflow = 'hidden';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.margin = '0';
  tempDiv.style.padding = '0';
  tempDiv.style.visibility = 'hidden'; // Make completely invisible
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
 * Ensures proper styling for PDF export and removes scrollbars based on orientation
 */
const preparePosterForExport = (clonedElement: HTMLElement, orientation: 'portrait' | 'landscape' = 'portrait') => {
  const dimensions = getPosterDimensions(orientation);
  
  // Set exact dimensions to match preview based on orientation
  clonedElement.style.width = `${dimensions.width}px`;
  clonedElement.style.height = `${dimensions.height}px`;
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
 * Updated to preload fonts invisibly without affecting the preview
 * @param elementId The ID of the DOM element to export
 * @param orientation The orientation of the poster ('portrait' or 'landscape')
 */
export const exportToPDF = async (elementId: string, orientation: 'portrait' | 'landscape' = 'portrait') => {
  // Preload fonts silently in the background BEFORE getting the element
  // This prevents visible font changes during export
  toast.info(`Preparing fonts for ${orientation} PDF export...`);
  await preloadFonts();
  
  // Get the original poster content (after fonts are loaded)
  const element = getOriginalPosterElement();
  
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  console.log(`Found original poster content element for ${orientation} export:`, element);
  
  // Create a clean copy of the poster for PDF export
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Prepare the element for export with the correct orientation
  preparePosterForExport(clonedElement, orientation);
  
  const tempDiv = createTempContainer(clonedElement);
  
  try {
    // Process QR code images first
    await processQrCodeImages(clonedElement);
    
    // Compress other images
    compressImages(clonedElement);
    
    toast.info(`Generating high-quality A0 PDF in ${orientation} mode...`);
    
    // Extract design settings from the poster data (if available)
    // Try to get design settings from the poster preview component
    const posterPreview = document.getElementById('poster-preview');
    let designSettings = null;
    if (posterPreview) {
      // Try to extract design settings from data attributes or global state
      const posterLayoutRenderer = posterPreview.querySelector('[data-design-settings]');
      if (posterLayoutRenderer) {
        try {
          designSettings = JSON.parse(posterLayoutRenderer.getAttribute('data-design-settings') || '{}');
        } catch (e) {
          console.warn('Could not parse design settings from data attribute');
        }
      }
    }
    
    // Scale the element for PDF export using the corrected scaling logic with orientation
    // Pass design settings to ensure proper font application
    await scaleElementForPdf(clonedElement, orientation, designSettings);
    
    // Create PDF configuration with orientation
    const pdfConfig = createPdfConfig(orientation);
    
    // Generate PDF with proper timeout for font rendering
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
        toast.success(`A0 PDF exported successfully in ${orientation} mode! File size: ${sizeInMB}MB`);
        
        // Clean up
        cleanupTempContainer(tempDiv);
      }).catch(err => {
        console.error("PDF export failed:", err);
        toast.error("PDF export failed. Please try again.");
        // Clean up
        cleanupTempContainer(tempDiv);
      });
    }, 1000); // Reduced timeout since fonts are preloaded
  } catch (error) {
    console.error("PDF preparation failed:", error);
    toast.error("PDF preparation failed. Please try again.");
    cleanupTempContainer(tempDiv);
  }
};
