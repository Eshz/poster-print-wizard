
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
  
  // Check if references should be shown
  const showReferences = posterData.showReferences !== false && posterData.references?.trim();
  
  // Check if key takeaways should be shown
  const hasKeyTakeaways = showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim());
  
  // Dynamic grid configuration based on visible columns
  let gridCols = 'grid-cols-2'; // Base: sections columns
  let columnsCount = 2;
  
  if (hasKeyTakeaways) {
    columnsCount++;
  }
  if (showReferences) {
    columnsCount++;
  }
  
  // Set appropriate grid class
  if (columnsCount === 2) {
    gridCols = 'grid-cols-2';
  } else if (columnsCount === 3) {
    gridCols = 'grid-cols-3';
  } else if (columnsCount === 4) {
    gridCols = 'grid-cols-4';
  }
  
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
    <div className={`${gridCols} gap-2 h-full p-2 grid`}>
      {/* Column 1: Balanced sections - full height */}
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0">
          <SectionColumn
            sections={column1Sections}
            designSettings={designSettings}
          />
        </div>
      </div>

      {/* Column 2: Remaining sections and Images - full height */}
      <div className="h-full flex flex-col gap-2">
        {/* Sections part - takes most of the space */}
        <div className="flex-1 min-h-0">
          <SectionColumn
            sections={column2Sections}
            designSettings={designSettings}
          />
        </div>
        
        {/* Images section if present - fixed height but flexible */}
        {hasImages && (
          <div 
            className="p-3 rounded-lg flex-shrink-0"
            style={{ 
              backgroundColor: "#F2F2F2",
              height: column2Sections.length > 0 ? "200px" : "auto"
            }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Column 3: Key Takeaways - full height - only if visible */}
      {hasKeyTakeaways && (
        <div className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <KeyTakeawaysColumn
              posterData={posterData}
              designSettings={designSettings}
              showKeypoints={showKeypoints}
              keyTakeawayColors={keyTakeawayColors}
            />
          </div>
        </div>
      )}

      {/* Column 4: References - full height - only if visible */}
      {showReferences && (
        <div className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <ReferencesColumn
              posterData={posterData}
              designSettings={designSettings}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicModernLandscapeLayout;
