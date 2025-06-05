
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
  tempDiv.style.overflow = 'hidden'; // Prevent scrollbars
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
 * Ensures proper styling for PDF export and removes scrollbars
 */
const preparePosterForExport = (clonedElement: HTMLElement) => {
  // Set exact dimensions to match preview
  clonedElement.style.width = '800px';
  clonedElement.style.height = '1131px';
  clonedElement.style.position = 'relative';
  clonedElement.style.overflow = 'hidden'; // Critical: prevent scrollbars
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
    htmlElement.style.overflow = 'hidden'; // Prevent any child scrollbars
    
    // Remove any scroll-related styles
    htmlElement.style.overflowX = 'hidden';
    htmlElement.style.overflowY = 'hidden';
    htmlElement.style.scrollBehavior = 'auto';
  });
  
  // Ensure the main container has proper flex layout
  const mainContainer = clonedElement.querySelector('.p-4.h-full.flex.flex-col');
  if (mainContainer) {
    const container = mainContainer as HTMLElement;
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.padding = '16px';
  }
};

/**
 * Exports a DOM element as a high-quality A0-sized PDF
 * Updated to properly handle layout and eliminate scrollbars
 * @param elementId The ID of the DOM element to export
 */
export const exportToPDF = (elementId: string) => {
  // Target the actual poster content directly
  const element = document.getElementById('poster-content');
  
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  console.log("Found poster content element:", element);
  
  // Create a clean copy of the poster for PDF export
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Prepare the element for export
  preparePosterForExport(clonedElement);
  
  const tempDiv = createTempContainer(clonedElement);
  
  // Compress images before processing
  compressImages(clonedElement);
  
  // Scale the element for PDF export
  scaleElementForPdf(clonedElement);
  
  toast.info("Preparing high-quality A0 PDF export...");
  
  // Create PDF configuration with updated settings
  const pdfConfig = {
    ...createPdfConfig(),
    html2canvas: { 
      ...createPdfConfig().html2canvas,
      scrollX: 0,
      scrollY: 0,
      width: 800,
      height: 1131,
      windowWidth: 800,
      windowHeight: 1131,
      x: 0,
      y: 0,
      allowTaint: true,
      useCORS: true,
      scale: 2.5,
      backgroundColor: '#ffffff',
      removeContainer: false,
      foreignObjectRendering: true,
      imageTimeout: 0,
      logging: false
    }
  };
  
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
