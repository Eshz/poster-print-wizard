
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import ContentSections from './ContentSections';
import KeyTakeawaysSection from './KeyTakeawaysSection';
import ReferencesFormatter from './ReferencesFormatter';

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
  
  // Determine if we need to move sections to right column due to overflow
  const shouldMoveToRight = shouldRedistribute && activeSections.length > 2;
  
  // Split sections between columns if redistribution is needed
  const leftColumnSections = shouldMoveToRight 
    ? activeSections.slice(0, Math.ceil(activeSections.length / 2))
    : activeSections;
    
  const rightColumnSections = shouldMoveToRight 
    ? activeSections.slice(Math.ceil(activeSections.length / 2))
    : [];

  // Calculate if References should expand (when key takeaways are minimal or hidden)
  const shouldReferencesExpand = !showKeypoints || visibleKeyTakeaways.length <= 2;

  return (
    <div className="flex gap-3 h-full p-3">
      {/* Left Column - Main Sections with overflow handling */}
      <div className="w-1/2 h-full flex flex-col gap-3">
        <ContentSections
          activeSections={leftColumnSections}
          designSettings={designSettings}
          shouldLeftStretch={shouldLeftStretch && !shouldMoveToRight}
          shouldRedistribute={shouldRedistribute}
        />
        
        {/* Images section if present and no overflow - flexible height */}
        {hasVisibleImages && !shouldMoveToRight && (
          <div 
            className={`p-4 rounded-lg flex-shrink-0 ${!leftColumnSections.length ? 'flex-1' : 'max-h-64 overflow-hidden'}`}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Adaptive layout based on content overflow */}
      <div className="w-1/2 h-full flex flex-col gap-3">
        {/* Overflow sections from left column if needed */}
        {rightColumnSections.length > 0 && (
          <ContentSections
            activeSections={rightColumnSections}
            designSettings={designSettings}
            shouldLeftStretch={false}
            shouldRedistribute={shouldRedistribute}
          />
        )}

        {/* Key Takeaways Section - adaptive height */}
        {showKeypoints && visibleKeyTakeaways.length > 0 && (
          <div className={shouldReferencesExpand ? 'flex-shrink-0' : 'flex-1'}>
            <KeyTakeawaysSection
              posterData={posterData}
              designSettings={designSettings}
              keyTakeawayColors={keyTakeawayColors}
              showKeypoints={showKeypoints}
            />
          </div>
        )}

        {/* Images in right column if overflow occurred */}
        {hasVisibleImages && shouldMoveToRight && (
          <div 
            className="p-4 rounded-lg flex-shrink-0 max-h-48 overflow-hidden"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
            />
          </div>
        )}

        {/* References Section - expands when key takeaways are minimal */}
        <div className={shouldReferencesExpand ? 'flex-1' : 'flex-shrink-0'}>
          <ReferencesFormatter
            references={posterData.references}
            designSettings={designSettings}
            sectionTitle={posterData.sectionTitles?.[4] || "5. References"}
          />
        </div>
      </div>
    </div>
  );
};

export default AcademicModernPortraitLayout;
