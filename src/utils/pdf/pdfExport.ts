
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';
import { compressImages } from './imageCompression';
import { scaleElementForPdf } from './elementScaling';
import { createPdfConfig } from './pdfConfig';

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
 * Ensures proper styling for PDF export and removes scrollbars
 */
const preparePosterForExport = (clonedElement: HTMLElement) => {
  // Set exact dimensions to match preview
  clonedElement.style.width = '800px';
  clonedElement.style.height = '1131px';
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
 * Updated to use the original poster dimensions before zoom scaling
 * @param elementId The ID of the DOM element to export
 */
export const exportToPDF = (elementId: string) => {
  // Get the original poster content (before zoom scaling)
  const element = getOriginalPosterElement();
  
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  console.log("Found original poster content element:", element);
  
  // Create a clean copy of the poster for PDF export
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Prepare the element for export
  preparePosterForExport(clonedElement);
  
  const tempDiv = createTempContainer(clonedElement);
  
  // Compress images before processing
  compressImages(clonedElement);
  
  // Scale the element for PDF export using the corrected scaling logic
  scaleElementForPdf(clonedElement);
  
  toast.info("Preparing high-quality A0 PDF export...");
  
  // Create PDF configuration
  const pdfConfig = createPdfConfig();
  
  setTimeout(() => {
    html2pdf().from(clonedElement).set(pdfConfig).outputPdf('blob').then((pdfBlob: Blob) => {
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'conference-poster-A0.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      const sizeInMB = (pdfBlob.size / (1024 * 1024)).toFixed(2);
      toast.success(`A0 PDF exported successfully! File size: ${sizeInMB}MB`);
      
      // Clean up
      cleanupTempContainer(tempDiv);
    }).catch(err => {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. Please try again.");
      // Clean up
      cleanupTempContainer(tempDiv);
    });
  }, 500);
};
