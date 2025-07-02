
import React from 'react';
import ImagesDisplay from './ImagesDisplay';

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

  return (
    <div className="flex gap-3 h-full p-3">
      {/* Left Column - Main Sections */}
      <div className="w-1/2 space-y-3 overflow-auto flex flex-col h-full">
        {activeSections.map((section, index) => (
          <div key={index} className={`flex flex-col ${shouldLeftStretch && index === activeSections.length - 1 ? 'flex-1' : ''}`}>
            {/* Section Header */}
            <div 
              className="px-4 py-3 border-b-2 border-white"
              style={{ 
                backgroundColor: section.headerBg,
                borderBottomColor: section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
              }}
            >
              <h2 
                className="text-lg font-bold"
                style={{ 
                  color: section.headerTextColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {section.title}
              </h2>
            </div>
            
            {/* Section Content */}
            <div 
              className={`p-4 ${shouldLeftStretch && index === activeSections.length - 1 ? 'flex-1' : ''}`}
              style={{ backgroundColor: section.contentBg }}
            >
              <p 
                className="text-sm leading-relaxed"
                style={{ 
                  color: section.contentTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {section.content}
              </p>
            </div>
          </div>
        ))}
        
        {/* Images section if present - only render if there are visible images */}
        {hasVisibleImages && (
          <div 
            className={`p-4 rounded-lg ${shouldLeftStretch && !activeSections.length ? 'flex-1' : ''}`}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Takeaways and References */}
      <div className="w-1/2 space-y-3 overflow-auto flex flex-col h-full">
        {/* Key Takeaways Header */}
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <div className="space-y-3">
            {/* Key Takeaways Title with lines */}
            <div className="flex items-center gap-4 pb-2">
              <div className="flex-1 h-0.5 bg-gray-800"></div>
              <h2 
                className="text-lg font-bold text-center whitespace-nowrap"
                style={{ 
                  color: "#202B5B",
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                Key Takeaways
              </h2>
              <div className="flex-1 h-0.5 bg-gray-800"></div>
            </div>
            
            {/* Key Takeaways Items */}
            <div className="space-y-3">
              {posterData.keypoints.map((point: string, index: number) => {
                const isVisible = posterData.keyVisibility?.[index] !== false;
                if (!point?.trim() || !isVisible) return null;
                
                const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
                
                return (
                  <div key={index} className="flex min-h-[80px]">
                    {/* Number Circle */}
                    <div 
                      className="w-16 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <span 
                        className="text-3xl font-bold"
                        style={{ 
                          color: colors.textColor,
                          fontFamily: `var(--font-${designSettings.titleFont})`
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Content - adaptive height */}
                    <div 
                      className="flex-1 p-4 flex flex-col justify-center gap-2"
                      style={{ backgroundColor: "#F2F2F2" }}
                    >
                      <h3 
                        className="text-sm font-black leading-tight"
                        style={{ 
                          color: "#202B5B",
                          fontFamily: `var(--font-${designSettings.titleFont})`
                        }}
                      >
                        {point}
                      </h3>
                      {posterData.keyDescriptions?.[index] && (
                        <p 
                          className="text-xs leading-relaxed"
                          style={{ 
                            color: "#202B5B",
                            fontFamily: `var(--font-${designSettings.contentFont})`
                          }}
                        >
                          {posterData.keyDescriptions[index]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Images in sidebar if present - only render if there are visible images */}
        {hasVisibleImages && posterData.images.length > 1 && (
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images.slice(1)} // Show additional images in sidebar
              designSettings={designSettings}
            />
          </div>
        )}

        {/* References Section */}
        {posterData.references?.trim() && (
          <div className={`flex flex-col ${!shouldLeftStretch ? 'flex-1' : ''}`}>
            {/* References Header */}
            <div 
              className="px-4 py-3 border-b-2 border-white"
              style={{ 
                backgroundColor: "#3E3C72",
                borderBottomColor: "#FFFFFF"
              }}
            >
              <h2 
                className="text-lg font-bold"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {posterData.sectionTitles?.[4] || "5. References"}
              </h2>
            </div>
            
            {/* References Content with hanging indent */}
            <div 
              className={`p-4 ${!shouldLeftStretch ? 'flex-1' : ''}`}
              style={{ backgroundColor: "#3E3C72" }}
            >
              <div 
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: `var(--font-${designSettings.contentFont})`,
                  textIndent: '-1.5em',
                  paddingLeft: '1.5em'
                }}
                dangerouslySetInnerHTML={{
                  __html: posterData.references.replace(/\n/g, '<br>')
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicModernPortraitLayout;
