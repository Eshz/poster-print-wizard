
import React from 'react';

interface PosterSectionProps {
  title: string;
  content: string;
  designSettings: any;
  className?: string;
  isPreLine?: boolean;
  titleSizeClass?: string;
  textSizeClass?: string;
}

const PosterSection: React.FC<PosterSectionProps> = ({
  title,
  content,
  designSettings,
  className = "p-2 rounded flex-shrink-0",
  isPreLine = false,
  titleSizeClass = "text-lg md:text-xl",
  textSizeClass = "text-xs md:text-sm"
}) => {
  // Calculate content-based padding and spacing
  const contentLength = content.length;
  const isShortContent = contentLength < 200;
  const isMediumContent = contentLength >= 200 && contentLength < 500;
  
  // Adaptive padding based on content length
  const adaptivePadding = isShortContent ? "p-2" : isMediumContent ? "p-3" : "p-3";
  const adaptiveSpacing = isShortContent ? "mb-1" : "mb-2";
  
  // Override className to include adaptive padding
  const finalClassName = className.replace(/p-\d+/, adaptivePadding);

  return (
    <div 
      className={finalClassName}
      style={{ backgroundColor: designSettings.sectionBgColor }}
    >
      <h2 
        className={`${titleSizeClass} font-semibold ${adaptiveSpacing}`}
        style={{ 
          color: designSettings.sectionTitleColor,
          fontFamily: `var(--font-${designSettings.titleFont})`
        }}
      >
        {title}
      </h2>
      <p 
        className={`${textSizeClass} ${isPreLine ? 'whitespace-pre-line' : ''} leading-tight`}
        style={{ 
          color: designSettings.sectionTextColor,
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}
      >
        {content}
      </p>
    </div>
  );
};

export default PosterSection;
