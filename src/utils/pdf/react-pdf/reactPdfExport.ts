
import { pdf } from '@react-pdf/renderer';
import { toast } from "sonner";
import { createPdfDocument } from './PdfDocument';
import { registerPdfFonts, validateFontRegistration } from './fontRegistration';
import { PosterData, DesignSettings } from '@/types/project';

/**
 * Exports poster using react-pdf for high-quality vector-based output
 */
export const exportToReactPDF = async (
  posterData: PosterData,
  designSettings: DesignSettings,
  qrCodeUrl?: string
) => {
  try {
    toast.info('Preparing fonts for high-quality PDF export...');
    
    // Register fonts from Google Fonts URLs
    const fontsRegistered = await registerPdfFonts();
    if (!fontsRegistered) {
      toast.warning('Font registration failed - PDF will use fallback fonts');
    }

    // Validate font registration
    const fontsValidated = validateFontRegistration();
    if (!fontsValidated) {
      console.warn('Font validation failed, continuing with available fonts');
    }

    // Add a small delay to ensure fonts are fully registered
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.info('Generating high-quality vector PDF...');
    
    // Create the PDF document
    const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);
    
    // Generate PDF blob
    const blob = await pdf(doc).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conference-poster-A0-${designSettings.orientation || 'portrait'}-vector.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    toast.success(`High-quality vector PDF exported with proper fonts! File size: ${sizeInMB}MB`);
    
  } catch (error) {
    console.error('React-PDF export failed:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('font') || error.message.includes('Font')) {
        toast.error('PDF export failed due to font loading issues. Please try again.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        toast.error('PDF export failed due to network issues. Please check your connection and try again.');
      } else {
        toast.error(`PDF export failed: ${error.message}`);
      }
    } else {
      toast.error('Vector PDF export failed. Please try again.');
    }
    
    throw error;
  }
};
