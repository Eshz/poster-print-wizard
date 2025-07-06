
import React from 'react';
import { View } from '@react-pdf/renderer';
import { styles } from '../pdfStyles';
import { PdfContentProps } from '../pdfTypes';
import { PdfSections } from './PdfSections';
import { PdfSidebar } from './PdfSidebar';

export const PdfContent: React.FC<PdfContentProps> = ({ posterData, designSettings }) => {
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

  return (
    <View style={styles.content}>
      <PdfSections sections={sections} />
      <PdfSidebar posterData={posterData} visibleKeyPoints={visibleKeyPoints} />
    </View>
  );
};
