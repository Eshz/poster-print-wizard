
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';
import { compressImages } from './imageCompression';
import { scaleElementForPdf, calculateScaleFactor } from './elementScaling';
import { createPdfConfig, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Creates a temporary container for the cloned element
 */
const createTempContainer = (clonedElement: HTMLElement) => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
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
 * Exports a DOM element as a compressed A0-sized PDF
 * @param elementId The ID of the DOM element to export
 */
export const exportToPDF = (elementId: string) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    toast.error("Could not find element to export");
    return;
  }
  
  // Find the actual poster content, ignoring any zoom transformations
  const posterContent = element.querySelector('.bg-white.border.border-gray-200') as HTMLElement;
  
  if (!posterContent) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  // Create a completely new poster for PDF export by cloning the original
  const clonedElement = posterContent.cloneNode(true) as HTMLElement;
  const tempDiv = createTempContainer(clonedElement);
  
  // Compress images before processing
  compressImages(clonedElement);
  
  // Scale the element for PDF export
  const scaleFactor = scaleElementForPdf(clonedElement);
  
  toast.info("Preparing PDF export for A0 size (841 x 1189 mm)...");
  
  // Create PDF configuration
  const pdfConfig = createPdfConfig(
    PREVIEW_WIDTH * scaleFactor,
    PREVIEW_HEIGHT * scaleFactor
  );
  
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
  }, 1000);
};
