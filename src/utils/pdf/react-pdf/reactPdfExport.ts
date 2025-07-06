
import { pdf } from '@react-pdf/renderer';
import { toast } from "sonner";
import { createPdfDocument } from './PdfDocument';
import { registerFontsForPDF } from './fontManager';
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
    toast.info('Preparing fonts for high-quality vector PDF...');
    
    // Register fonts dynamically with error handling
    await registerFontsForPDF();
    
    toast.info('Generating high-quality vector PDF...');
    
    // Create the PDF document with proper font handling
    const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);
    
    // Generate PDF blob with error handling
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
    toast.success(`High-quality vector PDF exported! File size: ${sizeInMB}MB`);
    
  } catch (error) {
    console.error('React-PDF export failed:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('font')) {
        toast.error('PDF export failed due to font loading issues. Using system fonts as fallback.');
      } else {
        toast.error(`Vector PDF export failed: ${error.message}`);
      }
    } else {
      toast.error('Vector PDF export failed. Please try again.');
    }
    
    throw error;
  }
};
