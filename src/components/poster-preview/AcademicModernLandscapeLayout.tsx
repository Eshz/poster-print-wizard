
import React from 'react';
import ImagesDisplay from './ImagesDisplay';

interface AcademicModernLandscapeLayoutProps {
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
}

const AcademicModernLandscapeLayout: React.FC<AcademicModernLandscapeLayoutProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  activeSections,
  keyTakeawayColors
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 h-full p-2">
      {/* Column 1: First two sections */}
      <div className="space-y-2 overflow-auto flex flex-col h-full">
        {activeSections.slice(0, 2).map((section, index) => (
          <div key={index} className="flex flex-col">
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

      {/* Column 2: Remaining sections */}
      <div className="space-y-2 overflow-auto flex flex-col h-full">
        {activeSections.slice(2).map((section, index) => (
          <div key={index + 2} className="flex flex-col">
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
        
        {/* Images section if present */}
        {posterData.images && posterData.images.length > 0 && (
          <div 
            className="p-3 rounded-lg flex-1"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Column 3: Key Takeaways */}
      <div className="space-y-2 overflow-auto flex flex-col h-full">
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <>
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
            
            {/* Key Takeaways Items */}
            <div className="space-y-2 flex-1">
              {posterData.keypoints.map((point: string, index: number) => {
                const isVisible = posterData.keyVisibility?.[index] !== false;
                if (!point?.trim() || !isVisible) return null;
                
                const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
                
                return (
                  <div key={index} className="flex min-h-[60px]">
                    {/* Number Circle */}
                    <div 
                      className="w-12 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <span 
                        className="text-xl font-bold"
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
                      className="flex-1 p-3 flex flex-col justify-center gap-1"
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
          </>
        )}
      </div>

      {/* Column 4: References */}
      <div className="space-y-2 overflow-auto flex flex-col h-full">
        {posterData.references?.trim() && (
          <div className="flex flex-col flex-1">
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
            
            {/* References Content with hanging indent */}
            <div 
              className="p-3 flex-1"
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
      </div>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
