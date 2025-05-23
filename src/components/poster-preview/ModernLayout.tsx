
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';

interface ModernLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({
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
    <div className="p-4 h-full flex flex-col">
      {/* Three column layout */}
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {/* Column 1: Introduction & Methods */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={sectionTitles[0] || "Introduction"}
            content={posterData?.introduction || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          <PosterSection 
            title={sectionTitles[1] || "Methods"}
            content={posterData?.methods || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          {/* Images in first column */}
          {hasImages && (
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
            />
          )}
        </div>
        
        {/* Column 2: Findings & Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={sectionTitles[2] || "Findings"}
            content={posterData?.findings || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          {/* Key Points */}
          {showKeypoints && (
            <>
              <div 
                className="border-t-2 border-b-2 py-2 text-center mb-2"
                style={{ borderColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
              >
                <h2 
                  className={`text-lg font-semibold`}
                  style={{ 
                    color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  Key Takeaways
                </h2>
              </div>
              
              <div className="space-y-2 flex-grow flex flex-col justify-between">
                {keypoints.slice(0, 2).map((point: string, index: number) => (
                  <KeyTakeaway
                    key={index}
                    number={index + 1}
                    title={point}
                    description={keyDescriptions[index] || ""}
                    designSettings={designSettings}
                    className="p-3 flex-1"
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Column 3: Conclusions & References + Remaining Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          {showKeypoints && (
            <div className="space-y-2 flex-grow flex flex-col justify-between">
              {keypoints.slice(2).map((point: string, index: number) => (
                <KeyTakeaway
                  key={index}
                  number={index + 3}
                  title={point}
                  description={keyDescriptions[index + 2] || ""}
                  designSettings={designSettings}
                  className="p-3 flex-1"
                />
              ))}
            </div>
          )}
          
          <PosterSection 
            title={sectionTitles[3] || "Conclusions"}
            content={posterData?.conclusions || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          <PosterSection 
            title={sectionTitles[4] || "References"}
            content={posterData?.references || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            isPreLine={true}
            textSizeClass="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
