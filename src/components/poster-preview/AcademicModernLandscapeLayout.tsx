
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
  
  // Smart column distribution with references always at bottom-right
  const distributeColumns = () => {
    // Base distribution logic
    if (totalSections <= 2) {
      if (totalSections === 1) {
        return {
          column1: [activeSections[0]],
          column2: []
        };
      } else {
        return {
          column1: [activeSections[0]],
          column2: [activeSections[1]]
        };
      }
    } else if (totalSections === 3) {
      // Distribute based on available space, considering key takeaways
      if (hasKeyTakeaways && !showReferences) {
        // 3 columns: spread sections more evenly
        return {
          column1: [activeSections[0]],
          column2: [activeSections[1]],
          column3: [activeSections[2]]
        };
      } else if (hasKeyTakeaways && showReferences) {
        // 4 columns: balance sections across first two columns
        return {
          column1: [activeSections[0], activeSections[1]],
          column2: [activeSections[2]]
        };
      } else {
        // 2 columns: distribute sections
        return {
          column1: [activeSections[0]],
          column2: [activeSections[1], activeSections[2]]
        };
      }
    } else if (totalSections === 4) {
      if (hasKeyTakeaways && showReferences) {
        // 4 columns: distribute sections across first two columns
        return {
          column1: [activeSections[0], activeSections[1]],
          column2: [activeSections[2], activeSections[3]]
        };
      } else if (hasKeyTakeaways && !showReferences) {
        // 3 columns: balance sections
        return {
          column1: [activeSections[0], activeSections[1]],
          column2: [activeSections[2]],
          column3: [activeSections[3]]
        };
      } else {
        // 2 columns: split evenly
        return {
          column1: [activeSections[0], activeSections[1]],
          column2: [activeSections[2], activeSections[3]]
        };
      }
    } else {
      // 5+ sections: distribute as evenly as possible
      const sectionsPerColumn = Math.ceil(totalSections / Math.max(2, columnsCount - (showReferences ? 1 : 0)));
      return {
        column1: activeSections.slice(0, sectionsPerColumn),
        column2: activeSections.slice(sectionsPerColumn, sectionsPerColumn * 2)
      };
    }
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

      {/* Column 3: Key Takeaways - full height - only if visible and not the rightmost column */}
      {hasKeyTakeaways && !showReferences && (
        <div className="h-full flex flex-col gap-2">
          <div className="flex-1 min-h-0">
            <KeyTakeawaysColumn
              posterData={posterData}
              designSettings={designSettings}
              showKeypoints={showKeypoints}
              keyTakeawayColors={keyTakeawayColors}
            />
          </div>
          
          {/* Additional sections if distributed to this column */}
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

      {/* Column 3: Key Takeaways when References are also shown - full height */}
      {hasKeyTakeaways && showReferences && (
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

      {/* Column 4 (or rightmost): References always at bottom - full height - only if visible */}
      {showReferences && (
        <div className="h-full flex flex-col gap-2">
          {/* Additional sections if distributed to this column - only when References is not in a 3-column layout */}
          {!hasKeyTakeaways && columnDistribution.column3 && columnDistribution.column3.length > 0 && (
            <div className="flex-1 min-h-0">
              <SectionColumn
                sections={columnDistribution.column3}
                designSettings={designSettings}
              />
            </div>
          )}
          
          {/* References - always at the bottom */}
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
