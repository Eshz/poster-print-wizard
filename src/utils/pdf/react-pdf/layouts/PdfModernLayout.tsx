import React from 'react';
import { View } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { PdfSection } from '../components/PdfSection';
import { PdfKeyTakeaways } from '../components/PdfKeyTakeaways';
import { PdfReferences } from '../components/PdfReferences';
import { processPosterData } from '../pdfDataProcessor';

interface PdfModernLayoutProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  styles: any;
}

export const PdfModernLayout: React.FC<PdfModernLayoutProps> = ({ 
  posterData, 
  designSettings, 
  styles 
}) => {
  const { sections, visibleKeyPoints, referenceItems } = processPosterData(posterData);

  return (
    <View style={styles.content}>
      {/* Top Row - Introduction and Methods */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          {sections[0] && <PdfSection section={sections[0]} styles={styles} />}
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          {sections[1] && <PdfSection section={sections[1]} styles={styles} />}
        </View>
      </View>

      {/* Bottom Row - Findings, Conclusions, and Sidebar */}
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {/* Left side - Findings and Conclusions */}
        <View style={{ flex: 2, marginRight: 20 }}>
          <View style={{ marginBottom: 20 }}>
            {sections[2] && <PdfSection section={sections[2]} styles={styles} />}
          </View>
          {sections[3] && <PdfSection section={sections[3]} styles={styles} />}
        </View>

        {/* Right sidebar - Key Takeaways and References */}
        <View style={{ flex: 1 }}>
          {posterData.showKeypoints !== false && visibleKeyPoints.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <PdfKeyTakeaways 
                posterData={posterData}
                visibleKeyPoints={visibleKeyPoints}
                styles={styles}
              />
            </View>
          )}

          {posterData.references?.trim() && (
            <PdfReferences 
              posterData={posterData}
              referenceItems={referenceItems}
              styles={styles}
            />
          )}
        </View>
      </View>
    </View>
  );
};