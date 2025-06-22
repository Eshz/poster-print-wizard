
import React from 'react';

interface ContentSectionProps {
  title: string;
  content: string;
  headerBg: string;
  headerTextColor: string;
  contentBg: string;
  contentTextColor: string;
  designSettings: any;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  headerBg,
  headerTextColor,
  contentBg,
  contentTextColor,
  designSettings
}) => {
  return (
    <div className="flex flex-col min-h-0">
      <div 
        className="px-2 py-1 border-b-2 flex-shrink-0"
        style={{ 
          backgroundColor: headerBg,
          borderBottomColor: headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
        }}
      >
        <h2 
          className="text-xs font-bold"
          style={{ 
            color: headerTextColor,
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          {title}
        </h2>
      </div>
      
      <div 
        className="p-2 flex-1 overflow-auto"
        style={{ backgroundColor: contentBg }}
      >
        <p 
          className="text-xs leading-relaxed"
          style={{ 
            color: contentTextColor,
            fontFamily: `var(--font-${designSettings.contentFont})`
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default ContentSection;
