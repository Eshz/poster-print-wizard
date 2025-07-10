
import React from 'react';

interface KeyTakeawaysTileProps {
  posterData: any;
  designSettings: any;
  showKeypoints: boolean;
  keyTakeawayColors?: Array<{
    bg: string;
    textColor: string;
  }>;
  isCompact?: boolean; // For landscape mode
}

const KeyTakeawaysTile: React.FC<KeyTakeawaysTileProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  keyTakeawayColors = [
    { bg: "#FF6B6B", textColor: "#FFFFFF" },
    { bg: "#4ECDC4", textColor: "#FFFFFF" },
    { bg: "#45B7D1", textColor: "#FFFFFF" },
    { bg: "#96CEB4", textColor: "#FFFFFF" },
    { bg: "#FFEAA7", textColor: "#2D3436" }
  ],
  isCompact = false
}) => {
  // Hide if keypoints are disabled or empty
  if (!showKeypoints || !posterData.keypoints || !posterData.keypoints.some((point: string) => point?.trim())) {
    return null;
  }

  // Filter visible key points
  const visibleKeyPoints = posterData.keypoints
    .map((point: string, index: number) => ({ point, index }))
    .filter(({ point, index }) => point?.trim() && posterData.keyVisibility?.[index] !== false);

  if (visibleKeyPoints.length === 0) {
    return null;
  }

  const titleSize = isCompact ? "text-sm" : "text-lg";
  const itemSpacing = isCompact ? "space-y-2" : "space-y-3";
  const circleSize = isCompact ? "w-12" : "w-16";
  const circleTextSize = isCompact ? "text-lg" : "text-3xl";
  const contentPadding = isCompact ? "p-2" : "p-4";
  const contentGap = isCompact ? "gap-1" : "gap-2";
  const titleTextSize = isCompact ? "text-xs" : "text-sm";
  const descTextSize = "text-xs";
  const minHeight = isCompact ? "min-h-[60px]" : "min-h-[80px]";

  return (
    <div className="flex flex-col h-full">
      {/* Key Takeaways Title with lines */}
      <div className="flex items-center gap-2 pb-3 flex-shrink-0">
        <div className="flex-1 h-0.5 bg-gray-800"></div>
        <h2 
          className={`${titleSize} font-bold text-center whitespace-nowrap px-2`}
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
      <div className={`flex-1 ${itemSpacing} overflow-auto min-h-0`}>
        {visibleKeyPoints.map(({ point, index }, displayIndex) => {
          const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
          
          return (
            <div key={index} className={`flex ${minHeight}`}>
              {/* Number Circle */}
              <div 
                className={`${circleSize} flex items-center justify-center flex-shrink-0`}
                style={{ backgroundColor: colors.bg }}
              >
                <span 
                  className={`${circleTextSize} font-bold`}
                  style={{ 
                    color: colors.textColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {displayIndex + 1}
                </span>
              </div>
              
              {/* Content */}
              <div 
                className={`flex-1 ${contentPadding} flex flex-col justify-center ${contentGap}`}
                style={{ backgroundColor: "#F2F2F2" }}
              >
                <h3 
                  className={`${titleTextSize} font-black leading-tight`}
                  style={{ 
                    color: "#202B5B",
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {point}
                </h3>
                {posterData.keyDescriptions?.[index] && (
                  <p 
                    className={`${descTextSize} leading-relaxed`}
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
  );
};

export default KeyTakeawaysTile;
