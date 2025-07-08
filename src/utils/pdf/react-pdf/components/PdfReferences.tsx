import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { PosterData } from '@/types/project';

interface PdfReferencesProps {
  posterData: PosterData;
  referenceItems: string[];
  styles: any;
}

export const PdfReferences: React.FC<PdfReferencesProps> = ({ 
  posterData, 
  referenceItems, 
  styles 
}) => (
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
);