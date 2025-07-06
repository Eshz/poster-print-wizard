
import { pdf } from '@react-pdf/renderer';
import { toast } from "sonner";
import { createPdfDocument } from './PdfDocument';
import { registerFontsForPDF, areFontsLoaded } from './fontManager';
import { PosterData, DesignSettings } from '@/types/project';

/**
 * Exports poster using react-pdf with local TTF fonts for high-quality vector-based output
 */
export const exportToReactPDF = async (
  posterData: PosterData,
  designSettings: DesignSettings,
  qrCodeUrl?: string
) => {
  try {
    toast.info('Loading local font files for high-quality vector PDF...');
    
    // Register fonts from local TTF files with proper error handling
    await registerFontsForPDF();
    
    // Verify fonts are loaded
    if (!areFontsLoaded()) {
      console.warn('No custom fonts loaded, proceeding with system fonts');
      toast.warning('Custom fonts could not be loaded, using system fonts instead');
    } else {
      toast.success('Custom fonts loaded successfully!');
    }
    
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
      if (error.message.includes('font') || error.message.includes('Font')) {
        toast.error('PDF export failed due to font loading issues. Using system fonts instead.');
        // Try again without custom fonts
        try {
          const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);
          const blob = await pdf(doc).toBlob();
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `conference-poster-A0-${designSettings.orientation || 'portrait'}-system-fonts.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          toast.success('PDF exported with system fonts!');
        } catch (fallbackError) {
          toast.error('PDF export failed completely. Please try again.');
          throw fallbackError;
        }
      } else if (error.message.includes('404') || error.message.includes('not found')) {
        toast.error('Font files not found. Please add TTF font files to the /public/fonts/ directory as specified in the README.');
      } else {
        toast.error(`Vector PDF export failed: ${error.message}`);
      }
    } else {
      toast.error('Vector PDF export failed. Please check that font files are properly installed.');
    }
    
    throw error;
  }
};
