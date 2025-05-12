
import React from 'react';

interface KeyTakeawayProps {
  number: number;
  title: string;
  description: string;
  designSettings: any;
  className?: string;
  titleSizeClass?: string;
  textSizeClass?: string;
  circleSize?: string;
  useCircleText?: boolean;
}

const KeyTakeaway: React.FC<KeyTakeawayProps> = ({
  number,
  title,
  description,
  designSettings,
  className = "p-2 rounded flex flex-col",
  titleSizeClass = "text-sm",
  textSizeClass = "text-xs",
  circleSize = "2rem",
  useCircleText = false
}) => {
  return (
    <div 
      className={className}
      style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
    >
      <div className="flex items-start mb-1">
        <div 
          data-circle-number="true"
          className={`rounded-full flex items-center justify-center text-lg font-bold mr-1 flex-shrink-0 ${useCircleText ? 'text-xl' : ''}`}
          style={{ 
            backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor, 
            color: designSettings.sectionBgColor,
            width: circleSize,
            height: circleSize,
            minWidth: circleSize
          }}
        >
          {number}
        </div>
        <h3 
          className={`${titleSizeClass} font-semibold`}
          style={{ 
            color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          {title}
        </h3>
      </div>
      <p 
        className={textSizeClass}
        style={{ 
          color: designSettings.sectionTextColor,
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default KeyTakeaway;
