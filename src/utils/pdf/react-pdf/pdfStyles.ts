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
      padding: 20,
      flexDirection: 'row',
      gap: 20,
      backgroundColor: '#F8FAFF',
    },
    column: {
      flex: 1,
      gap: 16,
    },
    section: {
      backgroundColor: designSettings.sectionBgColor || '#3B82F6',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sectionHeader: {
      backgroundColor: designSettings.sectionBgColor || '#3B82F6',
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: designSettings.sectionTitleColor || '#FFFFFF',
      fontFamily: titleFont,
      marginBottom: 0,
    },
    sectionContent: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      minHeight: 120,
    },
    sectionText: {
      fontSize: 16,
      color: '#374151',
      fontFamily: contentFont,
      lineHeight: 1.8,
      textAlign: 'justify',
    },
    keyTakeawaysContainer: {
      backgroundColor: designSettings.keyPointsBgColor || '#EFF6FF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
    },
    keyTakeawaysTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: designSettings.keyPointsTextColor || '#1E3A8A',
      fontFamily: titleFont,
      marginBottom: 16,
      textAlign: 'center',
    },
    keyTakeaway: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      overflow: 'hidden',
      border: '1px solid #E5E7EB',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    keyNumber: {
      width: 60,
      height: 60,
      backgroundColor: '#FF6B6B',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      margin: 8,
    },
    keyNumberText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontFamily: titleFont,
    },
    keyContent: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    keyTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: designSettings.keyPointsTextColor || '#1E3A8A',
      fontFamily: titleFont,
      marginBottom: 8,
    },
    keyDescription: {
      fontSize: 14,
      color: '#6B7280',
      fontFamily: contentFont,
      lineHeight: 1.6,
    },
    referencesSection: {
      backgroundColor: '#3E3C72',
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 20,
    },
    referencesHeader: {
      backgroundColor: '#3E3C72',
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    referencesTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontFamily: titleFont,
    },
    referencesContent: {
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    referenceItem: {
      fontSize: 14,
      color: '#374151',
      fontFamily: contentFont,
      lineHeight: 1.6,
      marginBottom: 12,
      textAlign: 'justify',
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