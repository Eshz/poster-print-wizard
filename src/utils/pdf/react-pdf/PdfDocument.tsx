import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { getAvailableFontFamily, mapFontKeyToFamily } from './fontManager';
import { createPdfStyles, A0_WIDTH, A0_HEIGHT } from './pdfStyles';
import { processPosterData } from './pdfDataProcessor';
import { PdfHeader } from './components/PdfHeader';
import { PdfSection } from './components/PdfSection';
import { PdfKeyTakeaways } from './components/PdfKeyTakeaways';
import { PdfReferences } from './components/PdfReferences';

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

  // Process poster data
  const { sections, visibleKeyPoints, referenceItems } = processPosterData(posterData);

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

        {/* Content */}
        <View style={styles.content}>
          {/* Left Column - Main Sections */}
          <View style={[styles.column, { flex: 2 }]}>
            {sections.map((section, index) => (
              <PdfSection 
                key={index} 
                section={section} 
                styles={styles} 
              />
            ))}
          </View>

          {/* Right Column - Key Takeaways and References */}
          <View style={styles.column}>
            {/* Key Takeaways */}
            {posterData.showKeypoints !== false && visibleKeyPoints.length > 0 && (
              <PdfKeyTakeaways 
                posterData={posterData}
                visibleKeyPoints={visibleKeyPoints}
                styles={styles}
              />
            )}

            {/* References */}
            {posterData.references?.trim() && (
              <PdfReferences 
                posterData={posterData}
                referenceItems={referenceItems}
                styles={styles}
              />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Keep the component export for backward compatibility
const PdfDocument: React.FC<PdfDocumentProps> = ({ posterData, designSettings, qrCodeUrl }) => {
  return createPdfDocument(posterData, designSettings, qrCodeUrl);
};

export default PdfDocument;
