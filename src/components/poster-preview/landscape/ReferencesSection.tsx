
import React from 'react';

interface ReferencesSectionProps {
  title: string;
  content: string;
  headerBg: string;
  headerTextColor: string;
  contentBg: string;
  contentTextColor: string;
  designSettings: any;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  title,
  content,
  headerBg,
  headerTextColor,
  contentBg,
  contentTextColor,
  designSettings
}) => {
  if (!content?.trim()) return null;

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div 
        className="px-2 py-1 border-b-2 border-white flex-shrink-0"
        style={{ 
          backgroundColor: headerBg,
          borderBottomColor: "#FFFFFF"
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
        <div 
          className="text-xs leading-relaxed whitespace-pre-line"
          style={{ 
            color: contentTextColor,
            fontFamily: `var(--font-${designSettings.contentFont})`,
            textIndent: '-1em',
            paddingLeft: '1em'
          }}
          dangerouslySetInnerHTML={{
            __html: content.replace(/\n/g, '<br>')
          }}
        />
      </div>
    </div>
  );
};

export default ReferencesSection;
