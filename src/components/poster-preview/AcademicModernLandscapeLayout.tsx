
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import SectionColumn from './SectionColumn';
import KeyTakeawaysColumn from './KeyTakeawaysColumn';
import ReferencesColumn from './ReferencesColumn';
import MasonryGrid from './MasonryGrid';

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
  // Check if references should be shown
  const showReferences = posterData.showReferences !== false && posterData.references?.trim();
  
  // Check if key takeaways should be shown
  const hasKeyTakeaways = showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim());
  
  // Check if there are visible images
  const hasImages = posterData.images && posterData.images.filter((img: any) => img.visible).length > 0;
  
  // Create grid items for masonry layout
  const gridItems = [];
  
  // Distribute sections into grid items with size hints
  activeSections.forEach((section, index) => {
    const contentLength = section.content?.length || 0;
    const isLargeContent = contentLength > 600;
    
    gridItems.push(
      <div 
        key={`section-${index}`}
        className="flex flex-col h-full"
        data-size={isLargeContent ? 'large' : 'normal'}
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
        data-size="normal"
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
      <div key="keytakeaways" data-size="normal">
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
      <div key="references" data-size="normal">
        <ReferencesColumn
          posterData={posterData}
          designSettings={designSettings}
        />
      </div>
    );
  }

  return (
    <div className="h-full p-2">
      <MasonryGrid
        columns={Math.min(4, gridItems.length)} // Max 4 columns for landscape
        gap={8}
        className="h-full"
      >
        {gridItems}
      </MasonryGrid>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
