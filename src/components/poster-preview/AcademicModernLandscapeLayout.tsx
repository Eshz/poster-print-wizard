
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
  
  // Smart column distribution with better balancing
  const distributeColumns = () => {
    if (totalSections <= 2) {
      return {
        column1: totalSections >= 1 ? [activeSections[0]] : [],
        column2: totalSections >= 2 ? [activeSections[1]] : [],
        column3: [],
        column4: []
      };
    }
    
    // For 3+ sections, distribute more intelligently based on available columns
    if (hasKeyTakeaways && showReferences) {
      // 4 columns total: sections | sections | key takeaways + sections | references
      if (totalSections === 3) {
        return {
          column1: [activeSections[0]],
          column2: [activeSections[1]],
          column3: [activeSections[2]], // Move one section to fill space under key takeaways
          column4: []
        };
      } else if (totalSections === 4) {
        return {
          column1: [activeSections[0], activeSections[1]],
          column2: [activeSections[2]],
          column3: [activeSections[3]], // Fill space under key takeaways
          column4: []
        };
      } else if (totalSections >= 5) {
        const sectionsPerColumn = Math.ceil((totalSections - 1) / 3); // Reserve 1 section for key takeaways column
        return {
          column1: activeSections.slice(0, sectionsPerColumn),
          column2: activeSections.slice(sectionsPerColumn, sectionsPerColumn * 2),
          column3: activeSections.slice(sectionsPerColumn * 2),
          column4: []
        };
      }
    } else if (hasKeyTakeaways && !showReferences) {
      // 3 columns total: sections | sections | key takeaways + sections
      if (totalSections === 3) {
        return {
          column1: [activeSections[0]],
          column2: [activeSections[1]],
          column3: [activeSections[2]], // Fill space under key takeaways
          column4: []
        };
      } else if (totalSections === 4) {
        return {
          column1: [activeSections[0], activeSections[1]],
          column2: [activeSections[2]],
          column3: [activeSections[3]], // Fill space under key takeaways
          column4: []
        };
      } else if (totalSections >= 5) {
        return {
          column1: activeSections.slice(0, 2),
          column2: activeSections.slice(2, 4),
          column3: activeSections.slice(4),
          column4: []
        };
      }
    } else if (!hasKeyTakeaways && showReferences) {
      // 3 columns total: sections | sections | references
      if (totalSections === 3) {
        return {
          column1: [activeSections[0]],
          column2: [activeSections[1], activeSections[2]],
          column3: [],
          column4: []
        };
      } else if (totalSections >= 4) {
        const half = Math.ceil(totalSections / 2);
        return {
          column1: activeSections.slice(0, half),
          column2: activeSections.slice(half),
          column3: [],
          column4: []
        };
      }
    } else {
      // 2 columns total: sections | sections
      const half = Math.ceil(totalSections / 2);
      return {
        column1: activeSections.slice(0, half),
        column2: activeSections.slice(half),
        column3: [],
        column4: []
      };
    }
    
    // Fallback
    return {
      column1: [activeSections[0]],
      column2: activeSections.slice(1),
      column3: [],
      column4: []
    };
  };
  
  const columnDistribution = distributeColumns();

  return (
    <div className={`${gridCols} gap-2 h-full p-2 grid`}>
      {/* Column 1: Distributed sections - full height */}
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0">
          <SectionColumn
            sections={columnDistribution.column1}
            designSettings={designSettings}
          />
        </div>
      </div>

      {/* Column 2: Distributed sections and Images - full height */}
      <div className="h-full flex flex-col gap-2">
        {/* Sections part - takes most of the space */}
        <div className="flex-1 min-h-0">
          <SectionColumn
            sections={columnDistribution.column2}
            designSettings={designSettings}
          />
        </div>
        
        {/* Images section if present - fixed height but flexible */}
        {hasImages && (
          <div 
            className="p-3 rounded-lg flex-shrink-0"
            style={{ 
              backgroundColor: "#F2F2F2",
              height: columnDistribution.column2.length > 0 ? "200px" : "auto"
            }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Column 3: Key Takeaways + Additional Sections - full height */}
      {hasKeyTakeaways && (
        <div className="h-full flex flex-col gap-2">
          {/* Key Takeaways - flexible height */}
          <div className="flex-shrink-0">
            <KeyTakeawaysColumn
              posterData={posterData}
              designSettings={designSettings}
              showKeypoints={showKeypoints}
              keyTakeawayColors={keyTakeawayColors}
            />
          </div>
          
          {/* Additional sections to fill empty space */}
          {columnDistribution.column3 && columnDistribution.column3.length > 0 && (
            <div className="flex-1 min-h-0">
              <SectionColumn
                sections={columnDistribution.column3}
                designSettings={designSettings}
              />
            </div>
          )}
        </div>
      )}

      {/* Column 4 (or rightmost): References - always at bottom - full height */}
      {showReferences && (
        <div className="h-full flex flex-col gap-2">
          {/* Additional sections if any (only when no key takeaways) */}
          {!hasKeyTakeaways && columnDistribution.column3 && columnDistribution.column3.length > 0 && (
            <div className="flex-1 min-h-0">
              <SectionColumn
                sections={columnDistribution.column3}
                designSettings={designSettings}
              />
            </div>
          )}
          
          {/* References - always at the bottom of the rightmost panel */}
          <div className="flex-1 min-h-0 flex flex-col justify-end">
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
