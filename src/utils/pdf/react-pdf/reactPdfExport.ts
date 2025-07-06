
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
    toast.info('Generating high-quality vector PDF...');
    
    // Try to register fonts but don't fail if it doesn't work
    try {
      const fontsRegistered = await registerPdfFonts();
      if (fontsRegistered) {
        console.log('Fonts registered successfully');
        // Small delay to ensure fonts are ready
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        console.warn('Font registration failed, using fallback fonts');
      }
    } catch (fontError) {
      console.warn('Font registration error, continuing with fallback fonts:', fontError);
    }
    
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
    toast.success(`High-quality vector PDF exported! File size: ${sizeInMB}MB`);
    
  } catch (error) {
    console.error('React-PDF export failed:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('font') || error.message.includes('Font')) {
        toast.error('PDF export failed due to font issues. Trying with system fonts...');
        
        // Retry without custom fonts
        try {
          const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);
          const blob = await pdf(doc).toBlob();
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `conference-poster-A0-${designSettings.orientation || 'portrait'}-vector.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          toast.success('PDF exported with system fonts!');
          return;
        } catch (retryError) {
          console.error('Retry also failed:', retryError);
        }
      }
      
      toast.error(`PDF export failed: ${error.message.substring(0, 100)}`);
    } else {
      toast.error('Vector PDF export failed. Please try again.');
    }
    
    throw error;
  }
};
