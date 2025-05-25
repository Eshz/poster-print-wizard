
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';
import { calculateDynamicTextSizes, getContentDensity } from '@/utils/dynamicTextSizing';

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
  
  // Determine if we need a four-column layout for very dense content
  const shouldUseFourColumn = hasImages && visibleImages.length > 3 && 
    sections.reduce((acc, section) => acc + section.length, 0) > 3000;
  
  if (shouldUseFourColumn) {
    // Four-column layout for very dense content
    return (
      <div className="p-2 h-full flex flex-col">
        <div className="grid grid-cols-4 gap-2 flex-grow">
          {/* Column 1: Introduction */}
          <div className="flex flex-col space-y-2 h-full">
            <PosterSection 
              title={sectionTitles[0] || "Introduction"}
              content={posterData?.introduction || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            <PosterSection 
              title={sectionTitles[1] || "Methods"}
              content={posterData?.methods || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
          </div>
          
          {/* Column 2: Findings & Images */}
          <div className="flex flex-col space-y-2 h-full">
            <PosterSection 
              title={sectionTitles[2] || "Findings"}
              content={posterData?.findings || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            {hasImages && (
              <div className="flex-shrink-0">
                <ImagesDisplay 
                  images={posterData.images.slice(0, Math.ceil(visibleImages.length / 2))}
                  designSettings={designSettings}
                  className="max-h-48"
                />
              </div>
            )}
          </div>
          
          {/* Column 3: Key Points */}
          <div className="flex flex-col space-y-2 h-full">
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
                
                <div className="space-y-1 flex-grow">
                  {keypoints.map((point: string, index: number) => (
                    <KeyTakeaway
                      key={index}
                      number={index + 1}
                      title={point}
                      description={keyDescriptions[index] || ""}
                      designSettings={designSettings}
                      className="p-2"
                      titleSizeClass={textSizes.caption}
                      textSizeClass="text-xs"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Column 4: Conclusions, References & More Images */}
          <div className="flex flex-col space-y-2 h-full">
            <PosterSection 
              title={sectionTitles[3] || "Conclusions"}
              content={posterData?.conclusions || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            {hasImages && visibleImages.length > Math.ceil(visibleImages.length / 2) && (
              <div className="flex-shrink-0">
                <ImagesDisplay 
                  images={posterData.images.slice(Math.ceil(visibleImages.length / 2))}
                  designSettings={designSettings}
                  className="max-h-32"
                />
              </div>
            )}
            
            <PosterSection 
              title={sectionTitles[4] || "References"}
              content={posterData?.references || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.caption}
              isPreLine={true}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // Original three-column layout with adaptations
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {/* Column 1: Introduction & Methods */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={sectionTitles[0] || "Introduction"}
            content={posterData?.introduction || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[1] || "Methods"}
            content={posterData?.methods || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          {/* Images in first column only if not too many */}
          {hasImages && visibleImages.length <= 2 && (
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
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          {/* Images moved here if too many for column 1 */}
          {hasImages && visibleImages.length > 2 && (
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
              className="max-h-64"
            />
          )}
          
          {/* Key Points */}
          {showKeypoints && (
            <>
              <div 
                className="border-t-2 border-b-2 py-2 text-center mb-2"
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
              
              <div className="space-y-2 flex-grow flex flex-col justify-between">
                {keypoints.slice(0, 2).map((point: string, index: number) => (
                  <KeyTakeaway
                    key={index}
                    number={index + 1}
                    title={point}
                    description={keyDescriptions[index] || ""}
                    designSettings={designSettings}
                    className="p-3 flex-1"
                    titleSizeClass={textSizes.bodyText}
                    textSizeClass={textSizes.caption}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Column 3: Conclusions & References + Remaining Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          {showKeypoints && keypoints.length > 2 && (
            <div className="space-y-2 flex-grow flex flex-col justify-between">
              {keypoints.slice(2).map((point: string, index: number) => (
                <KeyTakeaway
                  key={index}
                  number={index + 3}
                  title={point}
                  description={keyDescriptions[index + 2] || ""}
                  designSettings={designSettings}
                  className="p-3 flex-1"
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
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[4] || "References"}
            content={posterData?.references || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.caption}
            isPreLine={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
