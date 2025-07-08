import { StyleSheet } from '@react-pdf/renderer';
import { DesignSettings } from '@/types/project';

// A0 dimensions in points (72 DPI)
export const A0_WIDTH = 2384;
export const A0_HEIGHT = 3370;

/**
 * Creates PDF styles based on design settings and fonts
 */
export const createPdfStyles = (
  designSettings: DesignSettings,
  titleFont: string,
  contentFont: string
) => {
  return StyleSheet.create({
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
};