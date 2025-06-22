
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
  // Get all sections including references
  const allSections = [
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
    },
    { 
      title: posterData.sectionTitles?.[4] || "5. References", 
      content: posterData.references,
      headerBg: "#3E3C72",
      headerTextColor: "#FFFFFF",
      contentBg: "#3E3C72",
      contentTextColor: "#FFFFFF"
    }
  ];

  // Filter out empty sections
  const activeSections = allSections.filter(section => section.content?.trim());

  // Key takeaway colors matching the design
  const keyTakeawayColors = [
    { bg: "#0007DB", textColor: "#FFFFFF" }, // Blue
    { bg: "#244466", textColor: "#FFFFFF" }, // Dark blue
    { bg: "#C8E4F2", textColor: "#202B5B" }, // Light blue
    { bg: "#D0D0F4", textColor: "#202B5B" }  // Light purple
  ];

  return (
    <div className="h-full w-full flex flex-col gap-3 p-3">
      {/* Main Content Area - Proper Landscape Layout */}
      <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
        
        {/* Left Column - First two sections */}
        <div className="flex flex-col gap-3">
          {activeSections.slice(0, 2).map((section, index) => (
            <div key={index} className="flex-1 flex flex-col min-h-0">
              {/* Section Header */}
              <div 
                className="px-3 py-2 border-b-2 border-white flex-shrink-0"
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
                className="p-3 flex-1 overflow-auto"
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

        {/* Middle Column - Results and Images/Charts area */}
        <div className="flex flex-col gap-3">
          {/* Results Section */}
          {activeSections[2] && (
            <div className="flex-1 flex flex-col min-h-0">
              <div 
                className="px-3 py-2 border-b-2 border-white flex-shrink-0"
                style={{ 
                  backgroundColor: activeSections[2].headerBg,
                  borderBottomColor: "#FFFFFF"
                }}
              >
                <h2 
                  className="text-sm font-bold"
                  style={{ 
                    color: activeSections[2].headerTextColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {activeSections[2].title}
                </h2>
              </div>
              
              <div 
                className="p-3 flex-1 overflow-auto"
                style={{ backgroundColor: activeSections[2].contentBg }}
              >
                <p 
                  className="text-xs leading-relaxed"
                  style={{ 
                    color: activeSections[2].contentTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  {activeSections[2].content}
                </p>
              </div>
            </div>
          )}

          {/* Images/Charts Area */}
          {posterData.images && posterData.images.length > 0 && (
            <div 
              className="flex-1 p-3 rounded-lg overflow-auto bg-gray-50 border border-gray-200"
              style={{ minHeight: '200px' }}
            >
              <h3 className="text-sm font-bold mb-2 text-gray-700">Visual Data</h3>
              <ImagesDisplay 
                images={posterData.images}
                designSettings={designSettings}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* Right Column - Conclusions and Key Takeaways */}
        <div className="flex flex-col gap-3">
          {/* Conclusions Section */}
          {activeSections[3] && (
            <div className="flex-1 flex flex-col min-h-0">
              <div 
                className="px-3 py-2 border-b-2 border-white flex-shrink-0"
                style={{ 
                  backgroundColor: activeSections[3].headerBg,
                  borderBottomColor: activeSections[3].headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
                }}
              >
                <h2 
                  className="text-sm font-bold"
                  style={{ 
                    color: activeSections[3].headerTextColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {activeSections[3].title}
                </h2>
              </div>
              
              <div 
                className="p-3 flex-1 overflow-auto"
                style={{ backgroundColor: activeSections[3].contentBg }}
              >
                <p 
                  className="text-xs leading-relaxed"
                  style={{ 
                    color: activeSections[3].contentTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  {activeSections[3].content}
                </p>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center gap-2 pb-2 flex-shrink-0">
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
              
              <div className="grid grid-cols-2 gap-2 flex-1 overflow-auto">
                {posterData.keypoints.slice(0, 4).map((point: string, index: number) => {
                  const isVisible = posterData.keyVisibility?.[index] !== false;
                  if (!point?.trim() || !isVisible) return null;
                  
                  const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
                  
                  return (
                    <div key={index} className="flex flex-col min-h-[80px]">
                      <div 
                        className="w-full h-8 flex items-center justify-center flex-shrink-0"
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
                      
                      <div 
                        className="flex-1 p-2 flex flex-col justify-center gap-1 overflow-auto"
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

      {/* Bottom Row - References */}
      {activeSections[4] && (
        <div className="h-32 flex flex-col min-h-0">
          <div 
            className="px-3 py-2 border-b-2 border-white flex-shrink-0"
            style={{ 
              backgroundColor: activeSections[4].headerBg,
              borderBottomColor: "#FFFFFF"
            }}
          >
            <h2 
              className="text-sm font-bold"
              style={{ 
                color: activeSections[4].headerTextColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              {activeSections[4].title}
            </h2>
          </div>
          
          <div 
            className="p-3 flex-1 overflow-auto"
            style={{ backgroundColor: activeSections[4].contentBg }}
          >
            <div 
              className="text-xs leading-relaxed whitespace-pre-line columns-3 gap-6"
              style={{ 
                color: activeSections[4].contentTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`,
                textIndent: '-1em',
                paddingLeft: '1em'
              }}
              dangerouslySetInnerHTML={{
                __html: activeSections[4].content.replace(/\n/g, '<br>')
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicModernLandscapeLayout;
