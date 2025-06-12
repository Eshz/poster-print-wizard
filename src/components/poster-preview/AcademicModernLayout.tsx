
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';

interface AcademicModernLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const AcademicModernLayout: React.FC<AcademicModernLayoutProps> = ({
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
    <div className="flex gap-3 h-full p-3">
      {/* Left Column - Main Sections - Changed from w-2/3 to w-1/2 */}
      <div className="w-1/2 space-y-3 overflow-auto">
        {activeSections.map((section, index) => (
          <div key={index} className="flex flex-col">
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
              className="p-4"
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
        
        {/* Images section if present */}
        {posterData.images && posterData.images.length > 0 && (
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Takeaways and References - Changed from w-1/3 to w-1/2 */}
      <div className="w-1/2 space-y-3 overflow-auto">
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

        {/* Additional Images in sidebar if present */}
        {posterData.images && posterData.images.length > 0 && (
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
          <div className="flex flex-col">
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
            
            {/* References Content - Updated font size to match introduction */}
            <div 
              className="p-4"
              style={{ backgroundColor: "#3E3C72" }}
            >
              <p 
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {posterData.references}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicModernLayout;
