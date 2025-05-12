
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';

interface ModernLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl
}) => {
  return (
    <div className="p-4 h-full flex flex-col">
      {/* Three column layout */}
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {/* Column 1: Introduction & Methods */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={posterData.sectionTitles[0]}
            content={posterData.introduction}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          <PosterSection 
            title={posterData.sectionTitles[1]}
            content={posterData.methods}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
        </div>
        
        {/* Column 2: Findings & Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={posterData.sectionTitles[2]}
            content={posterData.findings}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          {/* Key Points */}
          <div className="flex justify-between items-center mb-2">
            <div 
              className="border-t-2 border-b-2 py-2 flex-1 text-center"
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
            
            {/* QR Code */}
            {posterData.qrCodeUrl && qrCodeUrl && (
              <div className="ml-2 flex flex-col items-center">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-20 h-20 object-contain"
                />
                <p 
                  className="text-xs text-center mt-1"
                  style={{ 
                    color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  Scan for more info
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-2 flex-grow flex flex-col justify-between">
            {posterData.keypoints.slice(0, 2).map((point: string, index: number) => (
              <KeyTakeaway
                key={index}
                number={index + 1}
                title={point}
                description={posterData.keyDescriptions[index]}
                designSettings={designSettings}
                className="p-3 flex-1"
              />
            ))}
          </div>
        </div>
        
        {/* Column 3: Conclusions & References + Remaining Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          <div className="space-y-2 flex-grow flex flex-col justify-between">
            {posterData.keypoints.slice(2).map((point: string, index: number) => (
              <KeyTakeaway
                key={index}
                number={index + 3}
                title={point}
                description={posterData.keyDescriptions[index + 2]}
                designSettings={designSettings}
                className="p-3 flex-1"
              />
            ))}
          </div>
          
          <PosterSection 
            title={posterData.sectionTitles[3]}
            content={posterData.conclusions}
            designSettings={designSettings}
            className="p-4 flex-grow"
          />
          
          <PosterSection 
            title={posterData.sectionTitles[4]}
            content={posterData.references}
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
