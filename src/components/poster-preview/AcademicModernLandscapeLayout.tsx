
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
  // Calculate content distribution for overflow handling
  const totalSections = activeSections.length;
  const hasImages = posterData.images && posterData.images.length > 0;
  
  // Distribute sections across columns based on content length
  const sectionsWithLength = activeSections.map((section, index) => ({
    ...section,
    index,
    length: section.content?.length || 0
  }));
  
  // Sort by length and distribute to balance columns
  const sortedSections = [...sectionsWithLength].sort((a, b) => b.length - a.length);
  const column1Sections = [];
  const column2Sections = [];
  
  let column1Length = 0;
  let column2Length = 0;
  
  sortedSections.forEach(section => {
    if (column1Length <= column2Length) {
      column1Sections.push(section);
      column1Length += section.length;
    } else {
      column2Sections.push(section);
      column2Length += section.length;
    }
  });
  
  // Sort back by original index to maintain order
  column1Sections.sort((a, b) => a.index - b.index);
  column2Sections.sort((a, b) => a.index - b.index);

  return (
    <div className="grid grid-cols-4 gap-2 h-full p-2">
      {/* Column 1: Balanced sections */}
      <div className="h-full flex flex-col">
        <SectionColumn
          sections={column1Sections}
          designSettings={designSettings}
        />
      </div>

      {/* Column 2: Remaining sections and Images */}
      <div className="h-full flex flex-col gap-2">
        <div className="flex-1">
          <SectionColumn
            sections={column2Sections}
            designSettings={designSettings}
          />
        </div>
        
        {/* Images section if present - fixed height to prevent overflow */}
        {hasImages && (
          <div 
            className="p-3 rounded-lg flex-shrink-0 max-h-48 overflow-hidden"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Column 3: Key Takeaways - full height */}
      <div className="h-full">
        <KeyTakeawaysColumn
          posterData={posterData}
          designSettings={designSettings}
          showKeypoints={showKeypoints}
          keyTakeawayColors={keyTakeawayColors}
        />
      </div>

      {/* Column 4: References - full height */}
      <div className="h-full">
        <ReferencesColumn
          posterData={posterData}
          designSettings={designSettings}
        />
      </div>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
