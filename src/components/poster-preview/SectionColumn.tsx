
import React from 'react';

interface Section {
  title: string;
  content: string;
  headerBg: string;
  headerTextColor: string;
  contentBg: string;
  contentTextColor: string;
}

interface SectionColumnProps {
  sections: Section[];
  designSettings: any;
}

const SectionColumn: React.FC<SectionColumnProps> = ({
  sections,
  designSettings
}) => {
  return (
    <div className="space-y-2 overflow-auto flex flex-col h-full">
      {sections.map((section, index) => (
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
  );
};

export default SectionColumn;
