
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
import { PosterData, DesignSettings } from '@/types/project';

export type ExportMethod = 'react-pdf' | 'canvas' | 'svg' | 'html2pdf';

/**
 * Exports a poster as a high-quality A0-sized PDF using actual poster data
 */
export const exportToPDF = async (
  elementId: string, 
  orientation: 'portrait' | 'landscape' = 'portrait',
  method: ExportMethod = 'react-pdf',
  posterData?: PosterData,
  designSettings?: DesignSettings
) => {
  console.log('🚀 Starting PDF export with method:', method);
  console.log('📊 Poster data:', posterData);
  console.log('🎨 Design settings:', designSettings);
  
  // If no poster data provided, try to extract from DOM (fallback)
  const finalPosterData = posterData || extractPosterDataFromDOM();
  const finalDesignSettings = designSettings || extractDesignSettings();
  
  console.log('📋 Final poster data being used:', finalPosterData);
  console.log('🎯 Final design settings being used:', finalDesignSettings);
  
  // Generate QR code URL if needed
  const qrCodeUrl = finalPosterData.qrCodeUrl && finalPosterData.showQrCode !== false
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(finalPosterData.qrCodeUrl)}&color=${(finalPosterData.qrCodeColor || '#000000').replace('#', '')}`
    : undefined;

  console.log('🔗 QR Code URL generated:', qrCodeUrl);

  try {
    switch (method) {
      case 'react-pdf':
        console.log('📄 Using react-pdf method for vector-based PDF generation...');
        await exportToReactPDF(finalPosterData, finalDesignSettings, qrCodeUrl);
        break;
        
      case 'svg':
        console.log('🖼️ Using SVG-based approach...');
        await exportToSVGPDF(elementId, finalPosterData, finalDesignSettings, orientation);
        break;
        
      case 'canvas':
        console.log('🎨 Using enhanced canvas rendering...');
        await exportToCanvasPDF(elementId, orientation);
        break;
        
      case 'html2pdf':
      default:
        console.log('📰 Using fallback html2pdf method...');
        await exportWithHtml2Pdf(elementId, orientation);
        break;
    }
    
    console.log('✅ PDF export completed successfully');
  } catch (error) {
    console.error(`❌ PDF export failed with method ${method}:`, error);
    
    // Try fallback method
    if (method !== 'html2pdf') {
      console.log('🔄 Trying fallback method...');
      toast.error(`${method} export failed, trying fallback method...`);
      await exportToPDF(elementId, orientation, 'html2pdf', posterData, designSettings);
    } else {
      console.error('💥 All PDF export methods failed');
      toast.error("All PDF export methods failed. Please try again.");
    }
  }
};

/**
 * Extract poster data from DOM for react-pdf (fallback only)
 */
const extractPosterDataFromDOM = (): PosterData => {
  console.log('⚠️ Using DOM extraction fallback - this should not happen with proper data passing');
  
  // This is a fallback - we should always pass actual data
  return {
    title: "Your Conference Poster Title",
    authors: "Author Name(s)",
    school: "Institution Name",
    contact: "email@example.com",
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
