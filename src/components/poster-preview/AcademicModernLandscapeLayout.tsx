
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
  
  // Smart column distribution - References must be last column (rightmost)
  const distributeColumns = () => {
    // If we have references, reserve the last column for it and distribute sections accordingly
    const availableColumnsForSections = showReferences ? columnsCount - 1 : columnsCount;
    const availableColumnsForContent = hasKeyTakeaways ? availableColumnsForSections - 1 : availableColumnsForSections;
    
    if (totalSections <= availableColumnsForContent) {
      // If we have enough columns for all sections, distribute them one per column
      const distribution: any = {
        column1: totalSections >= 1 ? [activeSections[0]] : [],
        column2: totalSections >= 2 ? [activeSections[1]] : [],
        column3: totalSections >= 3 ? [activeSections[2]] : [],
        column4: totalSections >= 4 ? [activeSections[3]] : []
      };
      return distribution;
    } else {
      // More sections than available columns - need to balance
      const sectionsPerColumn = Math.ceil(totalSections / availableColumnsForContent);
      const distribution: any = {
        column1: [],
        column2: [],
        column3: [],
        column4: []
      };
      
      // Distribute sections sequentially but balanced
      activeSections.forEach((section, index) => {
        const targetColumn = Math.floor(index / sectionsPerColumn) + 1;
        if (targetColumn <= availableColumnsForContent) {
          distribution[`column${targetColumn}`].push(section);
        } else {
          // Overflow - add to last available column
          distribution[`column${availableColumnsForContent}`].push(section);
        }
      });
      
      // Balance columns if one is too heavy compared to others
      if (availableColumnsForContent >= 2) {
        const column1Count = distribution.column1.length;
        const column2Count = distribution.column2.length;
        
        if (column1Count > column2Count + 1 && column1Count > 1) {
          // Move last section from column1 to column2
          const sectionToMove = distribution.column1.pop();
          distribution.column2.push(sectionToMove);
        }
      }
      
      return distribution;
    }
  };
  
  const columnDistribution = distributeColumns();

  return (
    <div className={`${gridCols} gap-2 h-full p-2 grid`}>
      {/* Column 1: First sections - full height */}
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0">
          <SectionColumn
            sections={columnDistribution.column1}
            designSettings={designSettings}
          />
        </div>
      </div>

      {/* Column 2: More sections and Images - full height */}
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

      {/* Column 3: Key Takeaways and potentially additional sections - only if visible and not the last column */}
      {hasKeyTakeaways && !showReferences && (
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

      {/* Column 3: Key Takeaways with References coming after - only if both are visible */}
      {hasKeyTakeaways && showReferences && (
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

      {/* Last Column: References (always rightmost and bottom when enabled) */}
      {showReferences && (
        <div className="h-full flex flex-col gap-2">
          {/* Additional sections at the top if distributed to this column */}
          {columnDistribution.column4 && columnDistribution.column4.length > 0 && (
            <div className="flex-1 min-h-0">
              <SectionColumn
                sections={columnDistribution.column4}
                designSettings={designSettings}
              />
            </div>
          )}
          
          {/* References - always at the bottom of the rightmost column */}
          <div className="flex-shrink-0">
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
