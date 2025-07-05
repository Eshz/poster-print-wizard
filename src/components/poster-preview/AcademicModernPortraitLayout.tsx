
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import KeyTakeawaysSection from './KeyTakeawaysSection';
import ReferencesFormatter from './ReferencesFormatter';
import MasonryGrid from './MasonryGrid';

interface AcademicModernPortraitLayoutProps {
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
  shouldLeftStretch: boolean;
}

const AcademicModernPortraitLayout: React.FC<AcademicModernPortraitLayoutProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  activeSections,
  keyTakeawayColors,
  shouldLeftStretch
}) => {
  // Check if there are any visible images
  const hasVisibleImages = posterData.images && posterData.images.filter((img: any) => img.visible).length > 0;
  
  // Count visible key takeaways
  const visibleKeyTakeaways = posterData.keypoints?.filter(
    (point: string, index: number) => point?.trim() && posterData.keyVisibility?.[index] !== false
  ) || [];
  
  // Calculate if References should expand (when key takeaways are minimal or hidden)
  const shouldReferencesExpand = !showKeypoints || visibleKeyTakeaways.length <= 2;

  // Create grid items for masonry layout in proper order
  const gridItems = [];
  
  // 1. Add content sections first
  activeSections.forEach((section, index) => {
    const contentLength = section.content?.length || 0;
    const isLargeContent = contentLength > 400;
    
    gridItems.push(
      <div 
        key={`section-${index}`}
        className="flex flex-col h-full"
        data-size={isLargeContent ? 'large' : 'normal'}
        data-order={index + 1}
      >
        {/* Section Header */}
        <div 
          className="px-4 py-3 border-b-2 border-white flex-shrink-0"
          style={{ 
            backgroundColor: section.headerBg,
            borderBottomColor: section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
          }}
        >
          <h2 
            className="text-lg font-bold"
            style={{ 
              color: section.headerTextColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {section.title}
          </h2>
        </div>
        
        {/* Section Content */}
        <div 
          className="p-4 flex-1 overflow-auto"
          style={{ backgroundColor: section.contentBg }}
        >
          <p 
            className="text-sm leading-relaxed"
            style={{ 
              color: section.contentTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {section.content}
          </p>
        </div>
      </div>
    );
  });

  // 2. Add images after sections
  if (hasVisibleImages) {
    gridItems.push(
      <div 
        key="images"
        className="p-4 rounded-lg"
        style={{ backgroundColor: "#F2F2F2" }}
        data-size="normal"
        data-order={activeSections.length + 1}
      >
        <ImagesDisplay 
          images={posterData.images} 
          designSettings={designSettings}
        />
      </div>
    );
  }

  // 3. Add key takeaways second to last
  if (showKeypoints && visibleKeyTakeaways.length > 0) {
    gridItems.push(
      <div 
        key="keytakeaways"
        data-size={shouldReferencesExpand ? 'small' : 'normal'}
        data-order={98} // High order to ensure it comes before references
      >
        <KeyTakeawaysSection
          posterData={posterData}
          designSettings={designSettings}
          keyTakeawayColors={keyTakeawayColors}
          showKeypoints={showKeypoints}
        />
      </div>
    );
  }

  // 4. Add references last (always)
  gridItems.push(
    <div 
      key="references"
      data-size={shouldReferencesExpand ? 'large' : 'normal'}
      data-order={99} // Highest order to ensure it's always last
    >
      <ReferencesFormatter
        references={posterData.references}
        designSettings={designSettings}
        sectionTitle={posterData.sectionTitles?.[4] || "5. References"}
      />
    </div>
  );

  return (
    <div className="h-full p-3">
      <MasonryGrid
        columns={Math.min(3, gridItems.length)} // Max 3 columns for portrait
        gap={12}
        className="h-full"
      >
        {gridItems}
      </MasonryGrid>
    </div>
  );
};

export default AcademicModernPortraitLayout;
