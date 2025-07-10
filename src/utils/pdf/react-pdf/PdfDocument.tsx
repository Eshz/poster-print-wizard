import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { getAvailableFontFamily, mapFontKeyToFamily } from './fontManager';
import { createPdfStyles, A0_WIDTH, A0_HEIGHT } from './pdfStyles';
import { processPosterData } from './pdfDataProcessor';
import { PdfHeader } from './components/PdfHeader';
import { PdfLayoutRouter } from './PdfLayoutRouter';

interface PdfDocumentProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl?: string;
}

/**
 * Creates a PDF Document element that can be passed directly to pdf()
 */
export const createPdfDocument = (
  posterData: PosterData,
  designSettings: DesignSettings,
  qrCodeUrl?: string
) => {
  const isLandscape = designSettings.orientation === 'landscape';
  const pageWidth = isLandscape ? A0_HEIGHT : A0_WIDTH;
  const pageHeight = isLandscape ? A0_WIDTH : A0_HEIGHT;

  // Get font families with fallbacks - ensure exact matches
  const titleFontFamily = mapFontKeyToFamily(designSettings.titleFont || 'merriweather');
  const contentFontFamily = mapFontKeyToFamily(designSettings.contentFont || 'roboto');
  
  const titleFont = getAvailableFontFamily(titleFontFamily);
  const contentFont = getAvailableFontFamily(contentFontFamily);
  
  console.log(`PDF using fonts - Title: ${titleFont} (requested: ${titleFontFamily}), Content: ${contentFont} (requested: ${contentFontFamily})`);

  // Create styles with resolved fonts
  const styles = createPdfStyles(designSettings, titleFont, contentFont);

  return (
    <Document>
      <Page size={[pageWidth, pageHeight]} style={styles.page}>
        {/* Header */}
        <PdfHeader 
          posterData={posterData} 
          qrCodeUrl={qrCodeUrl} 
          styles={styles} 
        />

        {/* Dynamic Layout Content */}
        <PdfLayoutRouter 
          posterData={posterData}
          designSettings={designSettings}
          styles={styles}
        />
      </Page>
    </Document>
  );
};

// Keep the component export for backward compatibility
const PdfDocument: React.FC<PdfDocumentProps> = ({ posterData, designSettings, qrCodeUrl }) => {
  return createPdfDocument(posterData, designSettings, qrCodeUrl);
};

export default PdfDocument;
