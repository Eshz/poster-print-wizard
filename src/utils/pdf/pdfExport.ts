
import { toast } from "sonner";
import { compressImages } from './imageCompression';
import { scaleElementForPdf } from './elementScaling';
import { preloadFonts } from './fontLoader';
import { 
  createTempContainer, 
  cleanupTempContainer, 
  getOriginalPosterElement, 
  extractDesignSettings 
} from './domUtils';
import { processQrCodeImages } from './qrCodeProcessor';
import { preparePosterForExport } from './exportPreparation';
import { generatePdf } from './pdfGenerator';

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
    const designSettings = extractDesignSettings();
    
    // Scale the element for PDF export using the corrected scaling logic with orientation
    // Pass design settings to ensure proper font application
    await scaleElementForPdf(clonedElement, orientation, designSettings);
    
    // Generate PDF with proper timeout for font rendering
    await generatePdf(clonedElement, tempDiv, orientation);
  } catch (error) {
    console.error("PDF preparation failed:", error);
    toast.error("PDF preparation failed. Please try again.");
    cleanupTempContainer(tempDiv);
  }
};
