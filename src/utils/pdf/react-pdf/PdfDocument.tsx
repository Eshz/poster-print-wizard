
import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';

// Register fonts for react-pdf
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2', fontWeight: 'bold' }
  ]
});

Font.register({
  family: 'Merriweather',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.woff2' },
    { src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRZVcf6lvA.woff2', fontWeight: 'bold' }
  ]
});

interface PdfDocumentProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl?: string;
}

// A0 dimensions in points (72 DPI)
const A0_WIDTH = 2384;
const A0_HEIGHT = 3370;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E3A8A',
    fontFamily: 'Merriweather',
    textAlign: 'center',
    marginBottom: 12,
  },
  authors: {
    fontSize: 24,
    color: '#1E3A8A',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 8,
  },
  school: {
    fontSize: 20,
    color: '#1E3A8A',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 8,
  },
  contact: {
    fontSize: 18,
    color: '#1E3A8A',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 16,
  },
  section: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
  },
  sectionContent: {
    padding: 16,
    backgroundColor: '#3B82F6',
  },
  sectionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    lineHeight: 1.6,
  },
  keyTakeaway: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    overflow: 'hidden',
  },
  keyNumber: {
    width: 48,
    height: 48,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
  },
  keyContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  keyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#202B5B',
    fontFamily: 'Merriweather',
    marginBottom: 4,
  },
  keyDescription: {
    fontSize: 10,
    color: '#202B5B',
    fontFamily: 'Roboto',
    lineHeight: 1.4,
  },
  referencesSection: {
    backgroundColor: '#3E3C72',
    borderRadius: 8,
    overflow: 'hidden',
  },
  referencesHeader: {
    backgroundColor: '#3E3C72',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  referencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
  },
  referencesContent: {
    padding: 16,
    backgroundColor: '#3E3C72',
  },
  referenceItem: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  qrCode: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

const PdfDocument: React.FC<PdfDocumentProps> = ({ posterData, designSettings, qrCodeUrl }) => {
  const isLandscape = designSettings.orientation === 'landscape';
  const pageWidth = isLandscape ? A0_HEIGHT : A0_WIDTH;
  const pageHeight = isLandscape ? A0_WIDTH : A0_HEIGHT;

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

  const keyTakeawayColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'
  ];

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
                    <View style={[styles.keyNumber, { backgroundColor: keyTakeawayColors[index] || keyTakeawayColors[0] }]}>
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
            {posterData.showReferences !== false && posterData.references?.trim() && (
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

export default PdfDocument;
