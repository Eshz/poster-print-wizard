
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';

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
  return (
    <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        <PosterSection 
          title={posterData.sectionTitles[0]}
          content={posterData.introduction}
          designSettings={designSettings}
        />
        
        <PosterSection 
          title={posterData.sectionTitles[1]}
          content={posterData.methods}
          designSettings={designSettings}
        />
        
        <PosterSection 
          title={posterData.sectionTitles[2]}
          content={posterData.findings}
          designSettings={designSettings}
        />
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
            {posterData.keypoints.map((point: string, index: number) => (
              <KeyTakeaway
                key={index}
                number={index + 1}
                title={point}
                description={posterData.keyDescriptions[index]}
                designSettings={designSettings}
              />
            ))}
          </div>
        )}
        
        <PosterSection 
          title={posterData.sectionTitles[3]}
          content={posterData.conclusions}
          designSettings={designSettings}
        />
        
        <PosterSection 
          title={posterData.sectionTitles[4]}
          content={posterData.references}
          designSettings={designSettings}
          isPreLine={true}
        />
      </div>
    </div>
  );
};

export default ClassicLayout;
