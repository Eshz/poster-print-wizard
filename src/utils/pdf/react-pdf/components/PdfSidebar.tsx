
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../pdfStyles';
import { PdfSidebarProps } from '../pdfTypes';
import { KEY_TAKEAWAY_COLORS } from '../pdfConstants';

export const PdfSidebar: React.FC<PdfSidebarProps> = ({ posterData, visibleKeyPoints }) => {
  // Parse references into individual items
  const referenceItems = posterData.references?.split('\n').filter(ref => ref.trim()) || [];

  return (
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
  );
};
