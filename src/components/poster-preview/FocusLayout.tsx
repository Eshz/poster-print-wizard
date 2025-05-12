
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';

interface FocusLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
}

const FocusLayout: React.FC<FocusLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl
}) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="max-w-4xl mx-auto space-y-6 flex-grow flex flex-col">
        {/* QR Code and Title Row */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-4/5">
            <PosterSection 
              title={posterData.sectionTitles[0]}
              content={posterData.introduction}
              designSettings={designSettings}
              className="p-4"
              titleSizeClass="text-2xl"
              textSizeClass="text-base"
            />
          </div>

          {/* QR Code */}
          {posterData.qrCodeUrl && qrCodeUrl && (
            <div className="flex flex-col items-center">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-28 h-28 object-contain"
              />
              <p 
                className="text-xs text-center mt-1"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                Scan for more info
              </p>
            </div>
          )}
        </div>
        
        <PosterSection 
          title={posterData.sectionTitles[1]}
          content={posterData.methods}
          designSettings={designSettings}
          className="p-4 flex-grow"
          titleSizeClass="text-2xl"
          textSizeClass="text-base"
        />
        
        <PosterSection 
          title={posterData.sectionTitles[2]}
          content={posterData.findings}
          designSettings={designSettings}
          className="p-4 flex-grow"
          titleSizeClass="text-2xl"
          textSizeClass="text-base"
        />
        
        {/* Key Takeaways Section */}
        <div 
          className="border-t-2 border-b-2 py-4 text-center my-6"
          style={{ borderColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
        >
          <h2 
            className={`text-2xl font-semibold`}
            style={{ 
              color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            Key Takeaways
          </h2>
        </div>
        
        {/* Key Points in a row */}
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {posterData.keypoints.map((point: string, index: number) => (
            <KeyTakeaway
              key={index}
              number={index + 1}
              title={point}
              description={posterData.keyDescriptions[index]}
              designSettings={designSettings}
              className="p-4 flex-1"
              titleSizeClass="text-lg"
              textSizeClass="text-sm"
              circleSize="2.5rem"
              useCircleText={true}
            />
          ))}
        </div>
        
        <PosterSection 
          title={posterData.sectionTitles[3]}
          content={posterData.conclusions}
          designSettings={designSettings}
          className="p-4 flex-grow"
          titleSizeClass="text-2xl"
          textSizeClass="text-base"
        />
        
        <PosterSection 
          title={posterData.sectionTitles[4]}
          content={posterData.references}
          designSettings={designSettings}
          className="p-4 flex-grow"
          titleSizeClass="text-2xl"
          textSizeClass="text-base"
          isPreLine={true}
        />
      </div>
    </div>
  );
};

export default FocusLayout;
