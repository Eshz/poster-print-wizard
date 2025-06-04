
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';
import { compressImages } from './imageCompression';
import { scaleElementForPdf } from './elementScaling';
import { createPdfConfig } from './pdfConfig';

/**
 * Creates a temporary container for the cloned element
 */
const createTempContainer = (clonedElement: HTMLElement) => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
  tempDiv.style.width = '800px';
  tempDiv.style.height = '1131px';
  tempDiv.style.overflow = 'visible';
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(clonedElement);
  return tempDiv;
};

/**
 * Cleans up the temporary container
 */
const cleanupTempContainer = (tempDiv: HTMLElement) => {
  document.body.removeChild(tempDiv);
};

/**
 * Ensures proper styling for PDF export
 */
const preparePosterForExport = (clonedElement: HTMLElement) => {
  // Ensure the poster takes up the full container space
  clonedElement.style.width = '800px';
  clonedElement.style.height = '1131px';
  clonedElement.style.position = 'relative';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.display = 'flex';
  clonedElement.style.flexDirection = 'column';
  
  // Force visibility on all elements
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.visibility = 'visible';
    htmlElement.style.opacity = '1';
  });
};

/**
 * Exports a DOM element as a high-quality A0-sized PDF
 * Updated to work with the new zoom-independent scaling system
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
  
  // Scale the element for PDF export with the new system
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
