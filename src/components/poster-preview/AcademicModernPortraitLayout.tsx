
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
  
  // Calculate if we need to redistribute content due to overflow
  const totalContentLength = activeSections.reduce((acc, section) => acc + (section.content?.length || 0), 0);
  const shouldRedistribute = totalContentLength > 2000; // Threshold for content redistribution

  // Format references for proper list display
  const formatReferences = (text: string) => {
    // Split by lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => (
      <li key={index} className="mb-1">
        <p className="text-sm leading-relaxed" style={{ 
          color: "#FFFFFF",
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}>
          {line.trim()}
        </p>
      </li>
    ));
  };

  // Generate unique CSS for this component instance
  const uniqueId = `references-portrait-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex gap-3 h-full p-3">
      <style>
        {`
          .${uniqueId} ul.paragraph-list li::marker {
            color: #FFFFFF;
            font-family: var(--font-${designSettings.contentFont});
            font-weight: normal;
          }
        `}
      </style>
      {/* Left Column - Main Sections with height stretching */}
      <div className="w-1/2 h-full flex flex-col gap-3">
        {activeSections.map((section, index) => {
          const isLast = index === activeSections.length - 1;
          const shouldStretch = shouldLeftStretch && isLast;
          
          return (
            <div 
              key={index} 
              className={`flex flex-col ${shouldStretch ? 'flex-1' : ''} ${shouldRedistribute && section.content && section.content.length > 800 ? 'flex-1' : ''}`}
            >
              {/* Section Header */}
              <div 
                className="px-4 py-3 border-b-2 border-white flex-shrink-0"
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
              
              {/* Section Content - stretches to fill available space */}
              <div 
                className={`p-4 flex-1 overflow-auto ${shouldStretch ? 'min-h-0' : ''}`}
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
          );
        })}
        
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
        {/* Key Takeaways Header */}
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <div className="flex-1 flex flex-col">
            {/* Key Takeaways Title with lines */}
            <div className="flex items-center gap-4 pb-2 flex-shrink-0">
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
            
            {/* Key Takeaways Items - flexible height */}
            <div className="flex-1 space-y-3 overflow-auto">
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
        {posterData.references?.trim() && (
          <div className={`flex flex-col flex-1 min-h-0 ${uniqueId}`}>
            {/* References Header */}
            <div 
              className="px-4 py-3 border-b-2 border-white flex-shrink-0"
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
            
            {/* References Content - stretches to fill remaining space */}
            <div 
              className="p-4 flex-1 overflow-auto"
              style={{ backgroundColor: "#3E3C72" }}
            >
              <ul 
                className="paragraph-list list-disc pl-4 space-y-1"
                style={{
                  color: "#FFFFFF",
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {formatReferences(posterData.references)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicModernPortraitLayout;
