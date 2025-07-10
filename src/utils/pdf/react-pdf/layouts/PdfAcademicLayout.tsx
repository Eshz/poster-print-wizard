import React from 'react';
import { View } from '@react-pdf/renderer';
import { PosterData, DesignSettings } from '@/types/project';
import { PdfSection } from '../components/PdfSection';
import { PdfKeyTakeaways } from '../components/PdfKeyTakeaways';
import { PdfReferences } from '../components/PdfReferences';
import { processPosterData } from '../pdfDataProcessor';

interface PdfAcademicLayoutProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  styles: any;
}

export const PdfAcademicLayout: React.FC<PdfAcademicLayoutProps> = ({ 
  posterData, 
  designSettings, 
  styles 
}) => {
  const { sections, visibleKeyPoints, referenceItems } = processPosterData(posterData);

  return (
    <View style={styles.content}>
      {/* Academic 3-column layout with masonry-like arrangement */}
      <View style={{ flexDirection: 'row' }}>
        {/* Left Column */}
        <View style={[styles.column, { flex: 1, marginRight: 15 }]}>
          {sections[0] && (
            <View style={{ marginBottom: 20 }}>
              <PdfSection section={sections[0]} styles={styles} />
            </View>
          )}
          {sections[3] && <PdfSection section={sections[3]} styles={styles} />}
        </View>

        {/* Center Column */}
        <View style={[styles.column, { flex: 1, marginHorizontal: 15 }]}>
          {sections[1] && (
            <View style={{ marginBottom: 20 }}>
              <PdfSection section={sections[1]} styles={styles} />
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

        {/* Right Column */}
        <View style={[styles.column, { flex: 1, marginLeft: 15 }]}>
          {sections[2] && (
            <View style={{ marginBottom: 20 }}>
              <PdfSection section={sections[2]} styles={styles} />
            </View>
          )}
          {posterData.showKeypoints !== false && visibleKeyPoints.length > 0 && (
            <PdfKeyTakeaways 
              posterData={posterData}
              visibleKeyPoints={visibleKeyPoints}
              styles={styles}
            />
          )}
        </View>
      </View>
    </View>
  );
};