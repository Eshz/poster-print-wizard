
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
  
  // Calculate if we need to redistribute content due to overflow
  const totalContentLength = activeSections.reduce((acc, section) => acc + (section.content?.length || 0), 0);
  const shouldRedistribute = totalContentLength > 2000; // Threshold for content redistribution

  return (
    <div className="flex gap-3 h-full p-3">
      {/* Left Column - Main Sections with height stretching */}
      <div className="w-1/2 h-full flex flex-col gap-3">
        <ContentSections
          activeSections={activeSections}
          designSettings={designSettings}
          shouldLeftStretch={shouldLeftStretch}
          shouldRedistribute={shouldRedistribute}
        />
        
        {/* Images section if present - flexible height */}
        {hasVisibleImages && (
          <div 
            className={`p-4 rounded-lg flex-shrink-0 ${!activeSections.length ? 'flex-1' : 'max-h-64 overflow-hidden'}`}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Takeaways and References with height stretching */}
      <div className="w-1/2 h-full flex flex-col gap-3">
        {/* Key Takeaways Section */}
        <KeyTakeawaysSection
          posterData={posterData}
          designSettings={designSettings}
          keyTakeawayColors={keyTakeawayColors}
          showKeypoints={showKeypoints}
        />

        {/* Additional Images in sidebar if present */}
        {hasVisibleImages && posterData.images.length > 1 && (
          <div 
            className="p-4 rounded-lg flex-shrink-0 max-h-48 overflow-hidden"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images.slice(1)}
              designSettings={designSettings}
            />
          </div>
        )}

        {/* References Section - stretches to fill remaining space */}
        <ReferencesFormatter
          references={posterData.references}
          designSettings={designSettings}
          sectionTitle={posterData.sectionTitles?.[4] || "5. References"}
        />
      </div>
    </div>
  );
};

export default AcademicModernPortraitLayout;
