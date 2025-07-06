import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { A0_WIDTH, A0_HEIGHT } from './pdfConstants';
import { styles } from './pdfStyles';
import { PdfDocumentProps } from './pdfTypes';
import { PdfHeader } from './components/PdfHeader';
import { PdfContent } from './components/PdfContent';

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

  return (
    <Document>
      <Page size={[pageWidth, pageHeight]} style={styles.page}>
        <PdfHeader posterData={posterData} qrCodeUrl={qrCodeUrl} />
        <PdfContent posterData={posterData} designSettings={designSettings} />
      </Page>
    </Document>
  );
};

// Keep the component export for backward compatibility
const PdfDocument: React.FC<PdfDocumentProps> = ({ posterData, designSettings, qrCodeUrl }) => {
  return createPdfDocument(posterData, designSettings, qrCodeUrl);
};

export default PdfDocument;
