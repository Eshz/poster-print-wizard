
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
  // Get all sections
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

  // References section
  const referencesSection = {
    title: posterData.sectionTitles?.[4] || "5. References", 
    content: posterData.references,
    headerBg: "#3E3C72",
    headerTextColor: "#FFFFFF",
    contentBg: "#3E3C72",
    contentTextColor: "#FFFFFF"
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      {/* Main Content Area - 4-Column Horizontal Layout */}
      <div className="flex-1 grid grid-cols-4 gap-2 min-h-0">
        
        {/* Column 1 - Background */}
        {activeSections[0] && (
          <div className="flex flex-col min-h-0">
            <div 
              className="px-2 py-1 border-b-2 border-white flex-shrink-0"
              style={{ 
                backgroundColor: activeSections[0].headerBg,
                borderBottomColor: "#FFFFFF"
              }}
            >
              <h2 
                className="text-xs font-bold"
                style={{ 
                  color: activeSections[0].headerTextColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {activeSections[0].title}
              </h2>
            </div>
            
            <div 
              className="p-2 flex-1 overflow-auto"
              style={{ backgroundColor: activeSections[0].contentBg }}
            >
              <p 
                className="text-xs leading-relaxed"
                style={{ 
                  color: activeSections[0].contentTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {activeSections[0].content}
              </p>
            </div>
          </div>
        )}

        {/* Column 2 - Methodology */}
        {activeSections[1] && (
          <div className="flex flex-col min-h-0">
            <div 
              className="px-2 py-1 border-b-2 flex-shrink-0"
              style={{ 
                backgroundColor: activeSections[1].headerBg,
                borderBottomColor: activeSections[1].headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
              }}
            >
              <h2 
                className="text-xs font-bold"
                style={{ 
                  color: activeSections[1].headerTextColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {activeSections[1].title}
              </h2>
            </div>
            
            <div 
              className="p-2 flex-1 overflow-auto"
              style={{ backgroundColor: activeSections[1].contentBg }}
            >
              <p 
                className="text-xs leading-relaxed"
                style={{ 
                  color: activeSections[1].contentTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {activeSections[1].content}
              </p>
            </div>
          </div>
        )}

        {/* Column 3 - Results and Images */}
        <div className="flex flex-col gap-2">
          {/* Results Section */}
          {activeSections[2] && (
            <div className="flex-1 flex flex-col min-h-0">
              <div 
                className="px-2 py-1 border-b-2 border-white flex-shrink-0"
                style={{ 
                  backgroundColor: activeSections[2].headerBg,
                  borderBottomColor: "#FFFFFF"
                }}
              >
                <h2 
                  className="text-xs font-bold"
                  style={{ 
                    color: activeSections[2].headerTextColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {activeSections[2].title}
                </h2>
              </div>
              
              <div 
                className="p-2 flex-1 overflow-auto"
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
              className="flex-1 p-2 rounded overflow-auto bg-gray-50 border border-gray-200"
              style={{ minHeight: '120px' }}
            >
              <h3 className="text-xs font-bold mb-1 text-gray-700">Visual Data</h3>
              <ImagesDisplay 
                images={posterData.images}
                designSettings={designSettings}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* Column 4 - Conclusions, Key Takeaways and References */}
        <div className="flex flex-col gap-2">
          {/* Conclusions Section */}
          {activeSections[3] && (
            <div className="flex-1 flex flex-col min-h-0">
              <div 
                className="px-2 py-1 border-b-2 flex-shrink-0"
                style={{ 
                  backgroundColor: activeSections[3].headerBg,
                  borderBottomColor: activeSections[3].headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
                }}
              >
                <h2 
                  className="text-xs font-bold"
                  style={{ 
                    color: activeSections[3].headerTextColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {activeSections[3].title}
                </h2>
              </div>
              
              <div 
                className="p-2 flex-1 overflow-auto"
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

          {/* Key Takeaways - Vertical Stack */}
          {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 pb-1">
                <div className="flex-1 h-0.5 bg-gray-800"></div>
                <h2 
                  className="text-xs font-bold text-center whitespace-nowrap px-2"
                  style={{ 
                    color: "#202B5B",
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  Key Takeaways
                </h2>
                <div className="flex-1 h-0.5 bg-gray-800"></div>
              </div>
              
              <div className="flex flex-col gap-1">
                {posterData.keypoints.slice(0, 4).map((point: string, index: number) => {
                  const isVisible = posterData.keyVisibility?.[index] !== false;
                  if (!point?.trim() || !isVisible) return null;
                  
                  const colors = [
                    { bg: "#0007DB", textColor: "#FFFFFF" },
                    { bg: "#244466", textColor: "#FFFFFF" },
                    { bg: "#C8E4F2", textColor: "#202B5B" },
                    { bg: "#D0D0F4", textColor: "#202B5B" }
                  ];
                  
                  const colorSet = colors[index] || colors[0];
                  
                  return (
                    <div key={index} className="flex items-center gap-2 min-h-[40px]">
                      <div 
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0 rounded-full"
                        style={{ backgroundColor: colorSet.bg }}
                      >
                        <span 
                          className="text-xs font-bold"
                          style={{ 
                            color: colorSet.textColor,
                            fontFamily: `var(--font-${designSettings.titleFont})`
                          }}
                        >
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="text-xs font-bold leading-tight"
                          style={{ 
                            color: "#202B5B",
                            fontFamily: `var(--font-${designSettings.titleFont})`
                          }}
                        >
                          {point}
                        </h3>
                        {posterData.keyDescriptions?.[index] && (
                          <p 
                            className="text-xs leading-tight mt-0.5"
                            style={{ 
                              color: "#666666",
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

          {/* References Section */}
          {referencesSection.content?.trim() && (
            <div className="flex flex-col min-h-0 flex-1">
              <div 
                className="px-2 py-1 border-b-2 border-white flex-shrink-0"
                style={{ 
                  backgroundColor: referencesSection.headerBg,
                  borderBottomColor: "#FFFFFF"
                }}
              >
                <h2 
                  className="text-xs font-bold"
                  style={{ 
                    color: referencesSection.headerTextColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {referencesSection.title}
                </h2>
              </div>
              
              <div 
                className="p-2 flex-1 overflow-auto"
                style={{ backgroundColor: referencesSection.contentBg }}
              >
                <div 
                  className="text-xs leading-relaxed whitespace-pre-line"
                  style={{ 
                    color: referencesSection.contentTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`,
                    textIndent: '-1em',
                    paddingLeft: '1em'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: referencesSection.content.replace(/\n/g, '<br>')
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
