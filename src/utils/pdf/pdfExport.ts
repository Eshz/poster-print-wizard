
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
import { exportToCanvasPDF } from './canvasExport';
import { exportToReactPDF } from './react-pdf/reactPdfExport';
import { exportToSVGPDF } from './svgExport';

export type ExportMethod = 'react-pdf' | 'canvas' | 'svg' | 'html2pdf';

/**
 * Exports a DOM element as a high-quality A0-sized PDF
 * Now supports multiple export methods for best quality
 */
export const exportToPDF = async (
  elementId: string, 
  orientation: 'portrait' | 'landscape' = 'portrait',
  method: ExportMethod = 'react-pdf'
) => {
  // Get poster data for react-pdf method
  const posterData = extractPosterDataFromDOM();
  const designSettings = extractDesignSettings();
  
  // Generate QR code URL if needed
  const qrCodeUrl = posterData.qrCodeUrl && posterData.showQrCode !== false
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}`
    : undefined;

  try {
    switch (method) {
      case 'react-pdf':
        // Best quality - vector-based PDF generation
        await exportToReactPDF(posterData, { ...designSettings, orientation }, qrCodeUrl);
        break;
        
      case 'svg':
        // High quality - SVG-based approach
        await exportToSVGPDF(elementId, posterData, designSettings, orientation);
        break;
        
      case 'canvas':
        // Good quality - enhanced canvas rendering
        await exportToCanvasPDF(elementId, orientation);
        break;
        
      case 'html2pdf':
      default:
        // Fallback - original html2pdf method
        await exportWithHtml2Pdf(elementId, orientation);
        break;
    }
  } catch (error) {
    console.error(`PDF export failed with method ${method}:`, error);
    
    // Try fallback method if react-pdf fails
    if (method === 'react-pdf') {
      toast.error(`Vector PDF export failed, trying canvas method...`);
      try {
        await exportToCanvasPDF(elementId, orientation);
      } catch (fallbackError) {
        toast.error("PDF export failed. Please try again with a different method.");
      }
    } else if (method !== 'html2pdf') {
      toast.error(`${method} export failed, trying fallback method...`);
      await exportToPDF(elementId, orientation, 'html2pdf');
    } else {
      toast.error("All PDF export methods failed. Please try again.");
    }
  }
};

/**
 * Extract poster data from DOM for react-pdf
 */
const extractPosterDataFromDOM = () => {
  // This would need to extract actual data from the current poster state
  // For now, return a basic structure - this should be connected to the actual poster data
  return {
    title: "Conference Poster Title",
    authors: "Author Names",
    school: "Institution",
    contact: "contact@example.com",
    introduction: "Introduction content...",
    methods: "Methods content...",
    findings: "Findings content...",
    conclusions: "Conclusions content...",
    references: "References...",
    keypoints: ["Key Point 1", "Key Point 2", "Key Point 3"],
    keyDescriptions: ["Description 1", "Description 2", "Description 3"],
    sectionTitles: ["1. Introduction", "2. Methods", "3. Findings", "4. Conclusions", "5. References"],
    qrCodeUrl: "https://example.com",
    qrCodeColor: "#000000",
    showKeypoints: true,
    showQrCode: true,
    showReferences: true,
    keyVisibility: [true, true, true],
    images: []
  };
};

/**
 * Original html2pdf export method as fallback
 */
const exportWithHtml2Pdf = async (elementId: string, orientation: 'portrait' | 'landscape') => {
  // Preload fonts silently in the background BEFORE getting the element
  toast.info(`Preparing fonts for ${orientation} PDF export...`);
  await preloadFonts();
  
  // Get the original poster content (after fonts are loaded)
  const element = getOriginalPosterElement();
  
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  console.log(`Found original poster content element for ${orientation} export:`, element);
  
  // Extract design settings BEFORE cloning to ensure we have the current font settings
  const designSettings = extractDesignSettings();
  console.log('Extracted design settings for PDF export:', designSettings);
  
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
