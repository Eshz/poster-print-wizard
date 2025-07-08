import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { PosterData } from '@/types/project';
import { keyTakeawayColors } from '../pdfDataProcessor';

interface PdfKeyTakeawaysProps {
  posterData: PosterData;
  visibleKeyPoints: string[];
  styles: any;
}

export const PdfKeyTakeaways: React.FC<PdfKeyTakeawaysProps> = ({ 
  posterData, 
  visibleKeyPoints, 
  styles 
}) => (
  <View style={styles.keyTakeawaysContainer}>
    <Text style={styles.keyTakeawaysTitle}>Key Takeaways</Text>
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
);