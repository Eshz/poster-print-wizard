
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
  method: ExportMethod = 'react-pdf',
  projectData?: { posterData: any; designSettings: any }
) => {
  // Get poster data for react-pdf method
  const posterData = projectData?.posterData || extractPosterDataFromDOM();
  const designSettings = projectData?.designSettings || extractDesignSettings();
  
  // Generate QR code URL if needed
  const qrCodeUrl = posterData.qrCodeUrl && posterData.showQrCode !== false
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}`
    : undefined;

  try {
    switch (method) {
      case 'react-pdf':
        // Best quality - vector-based PDF generation
        await exportToReactPDF(posterData, designSettings, qrCodeUrl);
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
    
    // Try fallback method
    if (method !== 'html2pdf') {
      toast.error(`${method} export failed, trying fallback method...`);
      await exportToPDF(elementId, orientation, 'html2pdf');
    } else {
      toast.error("All PDF export methods failed. Please try again.");
    }
  }
};

/**
 * Extract poster data from DOM for react-pdf (fallback method)
 */
const extractPosterDataFromDOM = () => {
  // Try to extract data from the DOM elements if available
  const titleElement = document.querySelector('[data-poster-title]') || document.querySelector('h1');
  const authorsElement = document.querySelector('[data-poster-authors]');
  const schoolElement = document.querySelector('[data-poster-school]');
  const contactElement = document.querySelector('[data-poster-contact]');
  
  // Extract section content from DOM
  const introElement = document.querySelector('[data-section="introduction"]');
  const methodsElement = document.querySelector('[data-section="methods"]');
  const findingsElement = document.querySelector('[data-section="findings"]');
  const conclusionsElement = document.querySelector('[data-section="conclusions"]');
  const referencesElement = document.querySelector('[data-section="references"]');
  
  return {
    title: titleElement?.textContent || "Conference Poster Title",
    authors: authorsElement?.textContent || "Author Names",
    school: schoolElement?.textContent || "Institution",
    contact: contactElement?.textContent || "contact@example.com",
    introduction: introElement?.textContent || "Introduction content...",
    methods: methodsElement?.textContent || "Methods content...",
    findings: findingsElement?.textContent || "Findings content...",
    conclusions: conclusionsElement?.textContent || "Conclusions content...",
    references: referencesElement?.textContent || "References...",
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
