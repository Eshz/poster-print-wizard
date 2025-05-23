
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';

interface ClassicLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const ClassicLayout: React.FC<ClassicLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const hasImages = posterData.images && posterData.images.filter(img => img.visible).length > 0;
  
  // Ensure sectionTitles exists with fallback values
  const sectionTitles = posterData?.sectionTitles || [
    "1. Introduction",
    "2. Methods",
    "3. Findings",
    "4. Conclusions",
    "5. References"
  ];
  
  // Ensure keypoints and keyDescriptions exist with fallback values
  const keypoints = posterData?.keypoints || ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"];
  const keyDescriptions = posterData?.keyDescriptions || ["Description 1", "Description 2", "Description 3", "Description 4"];
  
  return (
    <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        <PosterSection 
          title={sectionTitles[0] || "Introduction"}
          content={posterData?.introduction || ""}
          designSettings={designSettings}
        />
        
        <PosterSection 
          title={sectionTitles[1] || "Methods"}
          content={posterData?.methods || ""}
          designSettings={designSettings}
        />
        
        <PosterSection 
          title={sectionTitles[2] || "Findings"}
          content={posterData?.findings || ""}
          designSettings={designSettings}
        />
        
        {/* Images Section - Left Column */}
        {hasImages && (
          <div className="flex-grow">
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
              className="h-full"
            />
          </div>
        )}
      </div>
      
      {/* Right Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        {/* Key Takeaways Section */}
        {showKeypoints && (
          <div className="flex flex-col space-y-2">
            <div 
              className="border-t-2 border-b-2 py-2 text-center mb-1"
              style={{ borderColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
            >
              <h2 
                className={`text-lg md:text-xl font-semibold`}
                style={{ 
                  color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                Key Takeaways
              </h2>
            </div>
          </div>
        )}
        
        {/* Key Points Grid */}
        {showKeypoints && (
          <div className="grid grid-cols-2 gap-2 flex-grow overflow-auto">
            {keypoints.map((point: string, index: number) => (
              <KeyTakeaway
                key={index}
                number={index + 1}
                title={point}
                description={keyDescriptions[index] || ""}
                designSettings={designSettings}
              />
            ))}
          </div>
        )}
        
        <PosterSection 
          title={sectionTitles[3] || "Conclusions"}
          content={posterData?.conclusions || ""}
          designSettings={designSettings}
        />
        
        <PosterSection 
          title={sectionTitles[4] || "References"}
          content={posterData?.references || ""}
          designSettings={designSettings}
          isPreLine={true}
        />
      </div>
    </div>
  );
};

export default ClassicLayout;
