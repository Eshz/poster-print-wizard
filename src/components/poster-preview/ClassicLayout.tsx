
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';
import { calculateDynamicTextSizes, getContentDensity } from '@/utils/dynamicTextSizing';

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
  const visibleImages = posterData.images?.filter(img => img.visible) || [];
  
  // Ensure sectionTitles exists with fallback values
  const sectionTitles = posterData?.sectionTitles || [
    "1. Introduction",
    "2. Methods",
    "3. Findings",
    "4. Conclusions",
    "5. References"
  ];
  
  const keypoints = posterData?.keypoints || ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"];
  const keyDescriptions = posterData?.keyDescriptions || ["Description 1", "Description 2", "Description 3", "Description 4"];
  
  // Calculate content density and text sizes
  const sections = [
    posterData?.introduction || "",
    posterData?.methods || "",
    posterData?.findings || "",
    posterData?.conclusions || "",
    posterData?.references || ""
  ];
  
  const contentDensity = getContentDensity(sections, posterData.images, keypoints);
  const textSizes = calculateDynamicTextSizes(contentDensity, hasImages, sections.length);
  
  // Determine layout based on content
  const shouldUseThreeColumn = hasImages && visibleImages.length > 2;
  const shouldMoveImagesToSeparateColumn = hasImages && (
    sections.reduce((acc, section) => acc + section.length, 0) > 2000 ||
    visibleImages.length > 1
  );

  if (shouldUseThreeColumn || shouldMoveImagesToSeparateColumn) {
    // Three-column layout for heavy content
    return (
      <div className="grid grid-cols-3 gap-2 h-full overflow-hidden">
        {/* Left Column - Introduction & Methods */}
        <div className="flex flex-col space-y-2 h-full overflow-hidden">
          <PosterSection 
            title={sectionTitles[0] || "Introduction"}
            content={posterData?.introduction || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[1] || "Methods"}
            content={posterData?.methods || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
        </div>
        
        {/* Middle Column - Findings & Key Points */}
        <div className="flex flex-col space-y-2 h-full overflow-hidden">
          <PosterSection 
            title={sectionTitles[2] || "Findings"}
            content={posterData?.findings || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          {/* Key Points in compact layout */}
          {showKeypoints && (
            <>
              <div 
                className="border-t-2 border-b-2 py-1 text-center"
                style={{ borderColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
              >
                <h2 
                  className={`${textSizes.sectionHeading} font-semibold`}
                  style={{ 
                    color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  Key Takeaways
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-1 flex-grow overflow-auto">
                {keypoints.slice(0, 2).map((point: string, index: number) => (
                  <KeyTakeaway
                    key={index}
                    number={index + 1}
                    title={point}
                    description={keyDescriptions[index] || ""}
                    designSettings={designSettings}
                    titleSizeClass={textSizes.bodyText}
                    textSizeClass={textSizes.caption}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Right Column - Images, Conclusions, References */}
        <div className="flex flex-col space-y-2 h-full overflow-hidden">
          {/* Images Section */}
          {hasImages && (
            <div className="flex-shrink-0">
              <ImagesDisplay 
                images={posterData.images}
                designSettings={designSettings}
                className="max-h-64"
              />
            </div>
          )}
          
          {/* Remaining Key Points */}
          {showKeypoints && keypoints.length > 2 && (
            <div className="grid grid-cols-1 gap-1">
              {keypoints.slice(2).map((point: string, index: number) => (
                <KeyTakeaway
                  key={index}
                  number={index + 3}
                  title={point}
                  description={keyDescriptions[index + 2] || ""}
                  designSettings={designSettings}
                  titleSizeClass={textSizes.bodyText}
                  textSizeClass={textSizes.caption}
                />
              ))}
            </div>
          )}
          
          <PosterSection 
            title={sectionTitles[3] || "Conclusions"}
            content={posterData?.conclusions || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[4] || "References"}
            content={posterData?.references || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.caption}
            isPreLine={true}
          />
        </div>
      </div>
    );
  }

  // Original two-column layout for lighter content
  return (
    <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        <PosterSection 
          title={sectionTitles[0] || "Introduction"}
          content={posterData?.introduction || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        <PosterSection 
          title={sectionTitles[1] || "Methods"}
          content={posterData?.methods || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        <PosterSection 
          title={sectionTitles[2] || "Findings"}
          content={posterData?.findings || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        {/* Images Section - Left Column only if content is light */}
        {hasImages && !shouldMoveImagesToSeparateColumn && (
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
                className={`${textSizes.sectionHeading} font-semibold`}
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
                titleSizeClass={textSizes.bodyText}
                textSizeClass={textSizes.caption}
              />
            ))}
          </div>
        )}
        
        <PosterSection 
          title={sectionTitles[3] || "Conclusions"}
          content={posterData?.conclusions || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        <PosterSection 
          title={sectionTitles[4] || "References"}
          content={posterData?.references || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.caption}
          isPreLine={true}
        />
      </div>
    </div>
  );
};

export default ClassicLayout;
