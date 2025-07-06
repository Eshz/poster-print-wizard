import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { getAvailableFontFamily, mapFontKeyToFamily } from './fontManager';

interface PdfDocumentProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl?: string;
}

// A0 dimensions in points (72 DPI)
const A0_WIDTH = 2384;
const A0_HEIGHT = 3370;

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

  // Get font families with fallbacks
  const titleFont = getAvailableFontFamily(mapFontKeyToFamily(designSettings.titleFont || 'merriweather'));
  const contentFont = getAvailableFontFamily(mapFontKeyToFamily(designSettings.contentFont || 'roboto'));

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

  // Create dynamic styles with resolved fonts
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 0,
    },
    header: {
      padding: 20,
      backgroundColor: designSettings.headerBgColor || '#FFFFFF',
      borderBottomWidth: 2,
      borderBottomColor: designSettings.headerTextColor || '#1E3A8A',
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      color: designSettings.headerTextColor || '#1E3A8A',
      fontFamily: titleFont,
      textAlign: 'center',
      marginBottom: 12,
    },
    authors: {
      fontSize: 24,
      color: designSettings.headerTextColor || '#1E3A8A',
      fontFamily: contentFont,
      textAlign: 'center',
      marginBottom: 8,
    },
    school: {
      fontSize: 20,
      color: designSettings.headerTextColor || '#1E3A8A',
      fontFamily: contentFont,
      textAlign: 'center',
      marginBottom: 8,
    },
    contact: {
      fontSize: 18,
      color: designSettings.headerTextColor || '#1E3A8A',
      fontFamily: contentFont,
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
      backgroundColor: designSettings.sectionBgColor || '#3B82F6',
      borderRadius: 8,
      overflow: 'hidden',
    },
    sectionHeader: {
      backgroundColor: designSettings.sectionBgColor || '#3B82F6',
      padding: 16,
      borderBottomWidth: 2,
      borderBottomColor: '#FFFFFF',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: designSettings.sectionTitleColor || '#FFFFFF',
      fontFamily: titleFont,
    },
    sectionContent: {
      padding: 16,
      backgroundColor: designSettings.sectionBgColor || '#3B82F6',
    },
    sectionText: {
      fontSize: 14,
      color: designSettings.sectionTextColor || '#FFFFFF',
      fontFamily: contentFont,
      lineHeight: 1.6,
    },
    keyTakeaway: {
      flexDirection: 'row',
      marginBottom: 12,
      backgroundColor: designSettings.keyPointsBgColor || '#EFF6FF',
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
      fontFamily: titleFont,
    },
    keyContent: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },
    keyTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: designSettings.keyPointsTextColor || '#1E3A8A',
      fontFamily: titleFont,
      marginBottom: 4,
    },
    keyDescription: {
      fontSize: 10,
      color: designSettings.keyPointsTextColor || '#1E3A8A',
      fontFamily: contentFont,
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
      fontFamily: titleFont,
    },
    referencesContent: {
      padding: 16,
      backgroundColor: '#3E3C72',
    },
    referenceItem: {
      fontSize: 12,
      color: '#FFFFFF',
      fontFamily: contentFont,
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
