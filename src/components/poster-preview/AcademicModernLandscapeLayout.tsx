
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import SectionColumn from './SectionColumn';
import KeyTakeawaysColumn from './KeyTakeawaysColumn';
import ReferencesColumn from './ReferencesColumn';
import FlexibleGrid from './FlexibleGrid';

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
  
  // Create grid items for flexible layout
  const gridItems = [];
  
  // Distribute sections into grid items
  activeSections.forEach((section, index) => {
    gridItems.push(
      <div 
        key={`section-${index}`}
        className="flex flex-col h-full"
      >
        <SectionColumn
          sections={[section]}
          designSettings={designSettings}
        />
      </div>
    );
  });

  // Add images if present
  if (hasImages) {
    gridItems.push(
      <div 
        key="images"
        className="p-3 rounded-lg"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        <ImagesDisplay 
          images={posterData.images} 
          designSettings={designSettings}
        />
      </div>
    );
  }

  // Add key takeaways
  if (hasKeyTakeaways) {
    gridItems.push(
      <div key="keytakeaways">
        <KeyTakeawaysColumn
          posterData={posterData}
          designSettings={designSettings}
          showKeypoints={showKeypoints}
          keyTakeawayColors={keyTakeawayColors}
        />
      </div>
    );
  }

  // Add references
  if (showReferences) {
    gridItems.push(
      <div key="references">
        <ReferencesColumn
          posterData={posterData}
          designSettings={designSettings}
        />
      </div>
    );
  }

  // Dynamic column calculation based on content
  const calculateColumns = () => {
    const itemCount = gridItems.length;
    if (itemCount <= 2) return 2;
    if (itemCount <= 4) return 3;
    return 4;
  };

  return (
    <div className="h-full p-2">
      <FlexibleGrid
        minColumnWidth={200}
        maxColumns={calculateColumns()}
        gap={8}
        className="h-full"
        autoFit={true}
      >
        {gridItems}
      </FlexibleGrid>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
