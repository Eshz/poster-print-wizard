
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../pdfStyles';
import { PdfSectionsProps } from '../pdfTypes';

export const PdfSections: React.FC<PdfSectionsProps> = ({ sections }) => {
  return (
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
  );
};
