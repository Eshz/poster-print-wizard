
import React from 'react';

interface KeyTakeawaysSectionProps {
  keypoints: string[];
  keyDescriptions: string[];
  keyVisibility: boolean[];
  designSettings: any;
}

const KeyTakeawaysSection: React.FC<KeyTakeawaysSectionProps> = ({
  keypoints,
  keyDescriptions,
  keyVisibility,
  designSettings
}) => {
  const colors = [
    { bg: "#0007DB", textColor: "#FFFFFF" },
    { bg: "#244466", textColor: "#FFFFFF" },
    { bg: "#C8E4F2", textColor: "#202B5B" },
    { bg: "#D0D0F4", textColor: "#202B5B" }
  ];

  return (
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
        {keypoints.slice(0, 4).map((point: string, index: number) => {
          const isVisible = keyVisibility?.[index] !== false;
          if (!point?.trim() || !isVisible) return null;
          
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
                {keyDescriptions?.[index] && (
                  <p 
                    className="text-xs leading-tight mt-0.5"
                    style={{ 
                      color: "#666666",
                      fontFamily: `var(--font-${designSettings.contentFont})`
                    }}
                  >
                    {keyDescriptions[index]}
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

export default KeyTakeawaysSection;
