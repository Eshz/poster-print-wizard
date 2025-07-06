
import React from 'react';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { registerFontsSync } from './fontRegistration';
import { createDynamicStyles } from './pdfStyles';
import { A0_WIDTH, A0_HEIGHT, KEY_TAKEAWAY_COLORS } from './pdfConstants';

// Register fonts on module load
registerFontsSync();

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
  
  // Create dynamic styles based on design settings
  const styles = createDynamicStyles(designSettings);

  // Filter active sections
  const sections = [
    { title: posterData.sectionTitles?.[0] || "1. Introduction", content: posterData.introduction },
    { title: posterData.sectionTitles?.[1] || "2. Methods", content: posterData.methods },
    { title: posterData.sectionTitles?.[2] || "3. Findings", content: posterData.findings },
    { title: posterData.sectionTitles?.[3] || "4. Conclusions", content: posterData.conclusions },
  ].filter(section => section.content?.trim());

  // Filter visible key takeaways
  const visibleKeyPoints = posterData.keypoints?.filter(
    (point: string, index: number) => point?.trim() && posterData.keyVisibility?.[index] !== false
  ) || [];

  // Parse references into individual items
  const referenceItems = posterData.references?.split('\n').filter(ref => ref.trim()) || [];

  return (
    <Document>
      <Page size={[pageWidth, pageHeight]} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{posterData.title}</Text>
          <Text style={styles.authors}>{posterData.authors}</Text>
          <Text style={styles.school}>{posterData.school}</Text>
          <Text style={styles.contact}>{posterData.contact}</Text>
          
          {/* QR Code */}
          {qrCodeUrl && posterData.showQrCode !== false && (
            <Image style={styles.qrCode} src={qrCodeUrl} />
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Left Column - Main Sections */}
          <View style={[styles.column, { flex: 2 }]}>
            {sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionText}>{section.content}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Right Column - Key Takeaways and References */}
          <View style={styles.column}>
            {/* Key Takeaways */}
            {posterData.showKeypoints !== false && visibleKeyPoints.length > 0 && (
              <View>
                {visibleKeyPoints.map((point: string, index: number) => (
                  <View key={index} style={styles.keyTakeaway}>
                    <View style={[styles.keyNumber, { backgroundColor: KEY_TAKEAWAY_COLORS[index] || KEY_TAKEAWAY_COLORS[0] }]}>
                      <Text style={styles.keyNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.keyContent}>
                      <Text style={styles.keyTitle}>{point}</Text>
                      {posterData.keyDescriptions?.[index] && (
                        <Text style={styles.keyDescription}>{posterData.keyDescriptions[index]}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* References */}
            {posterData.references?.trim() && (
              <View style={styles.referencesSection}>
                <View style={styles.referencesHeader}>
                  <Text style={styles.referencesTitle}>
                    {posterData.sectionTitles?.[4] || "References"}
                  </Text>
                </View>
                <View style={styles.referencesContent}>
                  {referenceItems.map((ref, index) => (
                    <Text key={index} style={styles.referenceItem}>• {ref.trim()}</Text>
                  ))}
                </View>
              </View>
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
