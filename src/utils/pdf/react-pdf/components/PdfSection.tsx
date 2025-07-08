import React from 'react';
import { View, Text } from '@react-pdf/renderer';

interface PdfSectionProps {
  section: {
    title: string;
    content: string;
  };
  styles: any;
}

export const PdfSection: React.FC<PdfSectionProps> = ({ section, styles }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
    <View style={styles.sectionContent}>
      <Text style={styles.sectionText}>{section.content}</Text>
    </View>
  </View>
);