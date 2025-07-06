
import { pdf } from '@react-pdf/renderer';
import { toast } from "sonner";
import { createPdfDocument } from './PdfDocument';
import { PosterData, DesignSettings } from '@/types/project';
import { registerFontsSync } from './fontRegistration';

/**
 * Exports poster using react-pdf for high-quality vector-based output
 */
export const exportToReactPDF = async (
  posterData: PosterData,
  designSettings: DesignSettings,
  qrCodeUrl?: string
) => {
  try {
    console.log('🚀 Starting react-pdf export process...');
    console.log('📊 Poster data received:', {
      title: posterData.title,
      authors: posterData.authors,
      sectionsCount: [posterData.introduction, posterData.methods, posterData.findings, posterData.conclusions].filter(s => s?.trim()).length,
      keypointsCount: posterData.keypoints?.length || 0,
      hasReferences: !!posterData.references?.trim(),
      showKeypoints: posterData.showKeypoints,
      showQrCode: posterData.showQrCode
    });
    console.log('🎨 Design settings received:', {
      layout: designSettings.layout,
      orientation: designSettings.orientation,
      titleFont: designSettings.titleFont,
      contentFont: designSettings.contentFont,
      colors: {
        headerBg: designSettings.headerBgColor,
        headerText: designSettings.headerTextColor,
        sectionBg: designSettings.sectionBgColor
      }
    });
    
    toast.info('Preparing fonts and generating PDF...');
    
    // Ensure fonts are registered before creating document
    console.log('🎯 Registering fonts for PDF generation...');
    const fontsRegistered = registerFontsSync();
    console.log(`📝 Font registration result: ${fontsRegistered ? 'Success' : 'Using fallbacks'}`);
    
    console.log('📄 Creating PDF document...');
    const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);
    
    console.log('🔄 Converting to blob...');
    const startTime = Date.now();
    
    // Add small delay to ensure fonts are ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const blob = await pdf(doc).toBlob();
    const conversionTime = Date.now() - startTime;
    console.log(`⏱️ PDF conversion completed in ${conversionTime}ms`);
    
    // Create download link
    console.log('💾 Creating download...');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conference-poster-A0-${designSettings.orientation || 'portrait'}-vector.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ PDF export successful! File size: ${sizeInMB}MB`);
    toast.success(`High-quality vector PDF exported! File size: ${sizeInMB}MB`);
    
  } catch (error) {
    console.error('❌ React-PDF export failed:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('font') || error.message.includes('Font')) {
        console.error('🔤 Font-related error detected');
        toast.error('PDF export failed due to font issues. Using fallback fonts...');
      } else if (error.message.includes('Buffer')) {
        console.error('📦 Buffer-related error detected');
        toast.error('PDF export failed due to image processing issues.');
      } else {
        toast.error(`PDF export failed: ${error.message}`);
      }
    } else {
      toast.error('Vector PDF export failed. Please try again.');
    }
    
    throw error;
  }
};
