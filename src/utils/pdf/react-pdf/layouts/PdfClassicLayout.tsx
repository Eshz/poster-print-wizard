import React from 'react';
import { View } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { PdfSection } from '../components/PdfSection';
import { PdfKeyTakeaways } from '../components/PdfKeyTakeaways';
import { PdfReferences } from '../components/PdfReferences';
import { processPosterData } from '../pdfDataProcessor';

interface PdfClassicLayoutProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  styles: any;
}

export const PdfClassicLayout: React.FC<PdfClassicLayoutProps> = ({ 
  posterData, 
  designSettings, 
  styles 
}) => {
  const { sections, visibleKeyPoints, referenceItems } = processPosterData(posterData);

  return (
    <View style={styles.content}>
      {/* Left Column - Main Sections */}
      <View style={[styles.column, { flex: 2, marginRight: 20 }]}>
        {sections.map((section, index) => (
          <PdfSection 
            key={index} 
            section={section} 
            styles={styles} 
          />
        ))}
      </View>

      {/* Right Column - Key Takeaways and References */}
      <View style={[styles.column, { flex: 1 }]}>
        {/* Key Takeaways */}
        {posterData.showKeypoints !== false && visibleKeyPoints.length > 0 && (
          <PdfKeyTakeaways 
            posterData={posterData}
            visibleKeyPoints={visibleKeyPoints}
            styles={styles}
          />
        )}

        {/* References */}
        {posterData.references?.trim() && (
          <PdfReferences 
            posterData={posterData}
            referenceItems={referenceItems}
            styles={styles}
          />
        )}
      </View>
    </View>
  );
};