
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
    // Rotate the entire layout 90 degrees to make it landscape
    <div className="h-full w-full transform rotate-90 origin-center" style={{ transformOrigin: 'center center' }}>
      <div className="flex flex-col gap-3 h-full p-3" style={{ width: '100vh', height: '100vw' }}>
        {/* Main Content Area - 4 Column Grid for Landscape */}
        <div className="flex-1 grid grid-cols-4 gap-3 min-h-0">
          {/* First 4 sections in columns */}
          {activeSections.slice(0, 4).map((section, index) => (
            <div key={index} className="flex flex-col min-h-0">
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

        {/* Bottom Row - References and Key Takeaways */}
        <div className="flex gap-3" style={{ height: '30%' }}>
          {/* References Section - takes up 60% */}
          {activeSections[4] && (
            <div className="flex-[3] flex flex-col min-h-0">
              {/* References Header */}
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
              
              {/* References Content */}
              <div 
                className="p-3 flex-1 overflow-auto"
                style={{ backgroundColor: activeSections[4].contentBg }}
              >
                <div 
                  className="text-xs leading-relaxed whitespace-pre-line"
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

          {/* Key Takeaways - takes up 40% */}
          {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
            <div className="flex-[2] flex flex-col min-h-0">
              {/* Key Takeaways Title with lines */}
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
              
              {/* Key Takeaways Items - Compact grid for landscape */}
              <div className="grid grid-cols-2 gap-2 flex-1 overflow-auto">
                {posterData.keypoints.slice(0, 4).map((point: string, index: number) => {
                  const isVisible = posterData.keyVisibility?.[index] !== false;
                  if (!point?.trim() || !isVisible) return null;
                  
                  const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
                  
                  return (
                    <div key={index} className="flex flex-col min-h-[80px]">
                      {/* Number Circle - smaller for landscape */}
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
                      
                      {/* Content - compact for landscape */}
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

          {/* Images section - if no key takeaways */}
          {(!showKeypoints || !posterData.keypoints?.some((point: string) => point?.trim())) && 
           posterData.images && posterData.images.length > 0 && (
            <div 
              className="flex-[2] p-3 rounded-lg overflow-auto"
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
    </div>
  );
};

export default AcademicModernLandscapeLayout;
