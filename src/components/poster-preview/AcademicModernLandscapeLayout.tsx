
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';

interface AcademicModernLandscapeLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const AcademicModernLandscapeLayout: React.FC<AcademicModernLandscapeLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const sections = [
    { 
      title: posterData.sectionTitles?.[0] || "1. Background", 
      content: posterData.introduction,
      headerBg: "#0007DB",
      headerTextColor: "#FFFFFF",
      contentBg: "#0007DB",
      contentTextColor: "#FFFFFF"
    },
    { 
      title: posterData.sectionTitles?.[1] || "2. Methodology", 
      content: posterData.methods,
      headerBg: "#CFE0FC",
      headerTextColor: "#202B5B",
      contentBg: "#CFE0FC",
      contentTextColor: "#202B5B"
    },
    { 
      title: posterData.sectionTitles?.[2] || "3. Results", 
      content: posterData.findings,
      headerBg: "#1A3D84",
      headerTextColor: "#FFFFFF",
      contentBg: "#1A3D84",
      contentTextColor: "#FFFFFF"
    },
    { 
      title: posterData.sectionTitles?.[3] || "4. Importance", 
      content: posterData.conclusions,
      headerBg: "#BAE1FE",
      headerTextColor: "#202B5B",
      contentBg: "#BAE1FE",
      contentTextColor: "#202B5B"
    }
  ];

  // Filter out empty sections
  const activeSections = sections.filter(section => section.content?.trim());

  // Key takeaway colors matching the design
  const keyTakeawayColors = [
    { bg: "#0007DB", textColor: "#FFFFFF" }, // Blue
    { bg: "#244466", textColor: "#FFFFFF" }, // Dark blue
    { bg: "#C8E4F2", textColor: "#202B5B" }, // Light blue
    { bg: "#D0D0F4", textColor: "#202B5B" }  // Light purple
  ];

  return (
    <div className="flex flex-col gap-3 h-full p-3">
      {/* Top Row - Main Content in Landscape */}
      <div className="flex gap-3 flex-1">
        {/* Left Side - First two sections */}
        <div className="w-1/3 space-y-3 overflow-auto flex flex-col h-full">
          {activeSections.slice(0, 2).map((section, index) => (
            <div key={index} className="flex flex-col flex-1">
              {/* Section Header */}
              <div 
                className="px-3 py-2 border-b-2 border-white"
                style={{ 
                  backgroundColor: section.headerBg,
                  borderBottomColor: section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
                }}
              >
                <h2 
                  className="text-sm font-bold"
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
                className="p-3 flex-1"
                style={{ backgroundColor: section.contentBg }}
              >
                <p 
                  className="text-xs leading-relaxed"
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
        </div>

        {/* Center - Results and Conclusions */}
        <div className="w-1/3 space-y-3 overflow-auto flex flex-col h-full">
          {activeSections.slice(2, 4).map((section, index) => (
            <div key={index + 2} className="flex flex-col flex-1">
              {/* Section Header */}
              <div 
                className="px-3 py-2 border-b-2 border-white"
                style={{ 
                  backgroundColor: section.headerBg,
                  borderBottomColor: section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
                }}
              >
                <h2 
                  className="text-sm font-bold"
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
                className="p-3 flex-1"
                style={{ backgroundColor: section.contentBg }}
              >
                <p 
                  className="text-xs leading-relaxed"
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
        </div>

        {/* Right Side - Key Takeaways */}
        <div className="w-1/3 space-y-3 overflow-auto flex flex-col h-full">
          {/* Key Takeaways Header */}
          {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
            <div className="space-y-2 flex-1">
              {/* Key Takeaways Title with lines */}
              <div className="flex items-center gap-2 pb-1">
                <div className="flex-1 h-0.5 bg-gray-800"></div>
                <h2 
                  className="text-sm font-bold text-center whitespace-nowrap"
                  style={{ 
                    color: "#202B5B",
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  Key Takeaways
                </h2>
                <div className="flex-1 h-0.5 bg-gray-800"></div>
              </div>
              
              {/* Key Takeaways Items - Compact for landscape */}
              <div className="space-y-2 flex-1">
                {posterData.keypoints.slice(0, 4).map((point: string, index: number) => {
                  const isVisible = posterData.keyVisibility?.[index] !== false;
                  if (!point?.trim() || !isVisible) return null;
                  
                  const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
                  
                  return (
                    <div key={index} className="flex min-h-[60px]">
                      {/* Number Circle - smaller for landscape */}
                      <div 
                        className="w-10 flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: colors.bg }}
                      >
                        <span 
                          className="text-lg font-bold"
                          style={{ 
                            color: colors.textColor,
                            fontFamily: `var(--font-${designSettings.titleFont})`
                          }}
                        >
                          {index + 1}
                        </span>
                      </div>
                      
                      {/* Content - compact for landscape */}
                      <div 
                        className="flex-1 p-2 flex flex-col justify-center gap-1"
                        style={{ backgroundColor: "#F2F2F2" }}
                      >
                        <h3 
                          className="text-xs font-black leading-tight"
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
        </div>
      </div>

      {/* Bottom Row - References and Images */}
      <div className="flex gap-3" style={{ height: '25%' }}>
        {/* References Section - takes up 2/3 */}
        {posterData.references?.trim() && (
          <div className="w-2/3 flex flex-col">
            {/* References Header */}
            <div 
              className="px-3 py-2 border-b-2 border-white"
              style={{ 
                backgroundColor: "#3E3C72",
                borderBottomColor: "#FFFFFF"
              }}
            >
              <h2 
                className="text-sm font-bold"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {posterData.sectionTitles?.[4] || "5. References"}
              </h2>
            </div>
            
            {/* References Content */}
            <div 
              className="p-3 flex-1 overflow-auto"
              style={{ backgroundColor: "#3E3C72" }}
            >
              <div 
                className="text-xs leading-relaxed whitespace-pre-line"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: `var(--font-${designSettings.contentFont})`,
                  textIndent: '-1em',
                  paddingLeft: '1em'
                }}
                dangerouslySetInnerHTML={{
                  __html: posterData.references.replace(/\n/g, '<br>')
                }}
              />
            </div>
          </div>
        )}

        {/* Images section - takes up 1/3 */}
        {posterData.images && posterData.images.length > 0 && (
          <div 
            className="w-1/3 p-3 rounded-lg overflow-auto"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
              className="h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
