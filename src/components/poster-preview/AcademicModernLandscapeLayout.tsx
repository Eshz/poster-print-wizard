
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import SectionColumn from './SectionColumn';
import KeyTakeawaysColumn from './KeyTakeawaysColumn';
import ReferencesColumn from './ReferencesColumn';

interface AcademicModernLandscapeLayoutProps {
  posterData: any;
  designSettings: any;
  showKeypoints: boolean;
  activeSections: Array<{
    title: string;
    content: string;
    headerBg: string;
    headerTextColor: string;
    contentBg: string;
    contentTextColor: string;
  }>;
  keyTakeawayColors: Array<{
    bg: string;
    textColor: string;
  }>;
}

const AcademicModernLandscapeLayout: React.FC<AcademicModernLandscapeLayoutProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  activeSections,
  keyTakeawayColors
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 h-full p-2">
      {/* Column 1: First two sections */}
      <SectionColumn
        sections={activeSections.slice(0, 2)}
        designSettings={designSettings}
      />

      {/* Column 2: Remaining sections and Images */}
      <div className="space-y-2 overflow-auto flex flex-col h-full">
        <SectionColumn
          sections={activeSections.slice(2)}
          designSettings={designSettings}
        />
        
        {/* Images section if present */}
        {posterData.images && posterData.images.length > 0 && (
          <div 
            className="p-3 rounded-lg flex-1"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Column 3: Key Takeaways */}
      <KeyTakeawaysColumn
        posterData={posterData}
        designSettings={designSettings}
        showKeypoints={showKeypoints}
        keyTakeawayColors={keyTakeawayColors}
      />

      {/* Column 4: References */}
      <ReferencesColumn
        posterData={posterData}
        designSettings={designSettings}
      />
    </div>
  );
};

export default AcademicModernLandscapeLayout;
