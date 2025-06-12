
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';

interface AcademicModernLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const AcademicModernLayout: React.FC<AcademicModernLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const sections = [
    { title: posterData.sectionTitles?.[0] || "1. Introduction", content: posterData.introduction },
    { title: posterData.sectionTitles?.[1] || "2. Methods", content: posterData.methods },
    { title: posterData.sectionTitles?.[2] || "3. Findings", content: posterData.findings },
    { title: posterData.sectionTitles?.[3] || "4. Conclusions", content: posterData.conclusions }
  ];

  // Filter out empty sections
  const activeSections = sections.filter(section => section.content?.trim());

  return (
    <div className="grid grid-cols-3 gap-3 h-full p-3">
      {/* Left Column - Main Sections */}
      <div className="col-span-2 space-y-3 overflow-auto">
        {activeSections.map((section, index) => (
          <PosterSection
            key={index}
            title={section.title}
            content={section.content}
            designSettings={designSettings}
            className="p-4 rounded-lg"
            titleSizeClass="text-xl md:text-2xl"
            textSizeClass="text-sm md:text-base"
          />
        ))}
        
        {/* Images section if present */}
        {posterData.images && posterData.images.length > 0 && (
          <div className="mt-3">
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Takeaways and References */}
      <div className="space-y-3 overflow-auto">
        {/* Key Takeaways */}
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: designSettings.keyPointsBgColor }}
          >
            <h2 
              className="text-lg font-bold mb-3 text-center"
              style={{ 
                color: designSettings.keyPointsTextColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {posterData.keypoints.map((point: string, index: number) => {
                const isVisible = posterData.keyVisibility?.[index] !== false;
                if (!point?.trim() || !isVisible) return null;
                
                return (
                  <KeyTakeaway
                    key={index}
                    number={index + 1}
                    title={point}
                    description={posterData.keyDescriptions?.[index] || ''}
                    designSettings={designSettings}
                    listMode={true}
                    className="py-2 border-b border-gray-200 last:border-b-0"
                    titleSizeClass="text-sm font-bold"
                    textSizeClass="text-xs"
                    circleSize="1.5rem"
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* References Section */}
        {posterData.references?.trim() && (
          <PosterSection
            title={posterData.sectionTitles?.[4] || "5. References"}
            content={posterData.references}
            designSettings={designSettings}
            className="p-4 rounded-lg"
            titleSizeClass="text-lg md:text-xl"
            textSizeClass="text-xs md:text-sm"
            isPreLine={true}
          />
        )}
      </div>
    </div>
  );
};

export default AcademicModernLayout;
