
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import ContentSections from './ContentSections';
import KeyTakeawaysSection from './KeyTakeawaysSection';
import ReferencesFormatter from './ReferencesFormatter';
import FlexibleGrid from './FlexibleGrid';
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
  
  // Calculate content density for overflow detection
  const totalContentLength = activeSections.reduce((acc, section) => acc + (section.content?.length || 0), 0);
  const shouldRedistribute = totalContentLength > 2000; // Threshold for content redistribution
  
  // Count visible key takeaways
  const visibleKeyTakeaways = posterData.keypoints?.filter(
    (point: string, index: number) => point?.trim() && posterData.keyVisibility?.[index] !== false
  ) || [];
  
  // Calculate if References should expand (when key takeaways are minimal or hidden)
  const shouldReferencesExpand = !showKeypoints || visibleKeyTakeaways.length <= 2;

  // Create grid items for flexible layout
  const gridItems = [];
  
  // Add content sections as individual grid items
  activeSections.forEach((section, index) => {
    gridItems.push({
      id: `section-${index}`,
      component: (
        <div 
          key={`section-${index}`}
          className="flex flex-col h-full"
          style={{ gridRowEnd: section.content?.length > 400 ? 'span 2' : 'span 1' }} // Longer sections take more vertical space
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
      ),
      size: section.content?.length > 400 ? 'large' : 'normal'
    });
  });

  // Add images if present
  if (hasVisibleImages) {
    gridItems.push({
      id: 'images',
      component: (
        <div 
          key="images"
          className="p-4 rounded-lg"
          style={{ 
            backgroundColor: "#F2F2F2",
            gridRowEnd: 'span 1'
          }}
        >
          <ImagesDisplay 
            images={posterData.images} 
            designSettings={designSettings}
          />
        </div>
      ),
      size: 'normal'
    });
  }

  // Add key takeaways
  if (showKeypoints && visibleKeyTakeaways.length > 0) {
    gridItems.push({
      id: 'keytakeaways',
      component: (
        <div 
          key="keytakeaways"
          style={{ gridRowEnd: shouldReferencesExpand ? 'span 1' : 'span 2' }}
        >
          <KeyTakeawaysSection
            posterData={posterData}
            designSettings={designSettings}
            keyTakeawayColors={keyTakeawayColors}
            showKeypoints={showKeypoints}
          />
        </div>
      ),
      size: shouldReferencesExpand ? 'normal' : 'large'
    });
  }

  // Add references
  gridItems.push({
    id: 'references',
    component: (
      <div 
        key="references"
        style={{ gridRowEnd: shouldReferencesExpand ? 'span 2' : 'span 1' }}
      >
        <ReferencesFormatter
          references={posterData.references}
          designSettings={designSettings}
          sectionTitle={posterData.sectionTitles?.[4] || "5. References"}
        />
      </div>
    ),
    size: shouldReferencesExpand ? 'large' : 'normal'
  });

  return (
    <div className="h-full p-3">
      {/* Use flexible grid layout */}
      <FlexibleGrid
        minColumnWidth={300}
        maxColumns={2}
        gap={12}
        className="h-full"
        autoFit={false}
      >
        {gridItems.map(item => item.component)}
      </FlexibleGrid>
    </div>
  );
};

export default AcademicModernPortraitLayout;
