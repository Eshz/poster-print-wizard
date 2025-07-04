
import React from 'react';

interface ReferencesColumnProps {
  posterData: any;
  designSettings: any;
}

const ReferencesColumn: React.FC<ReferencesColumnProps> = ({
  posterData,
  designSettings
}) => {
  // Hide the entire column if references are disabled or empty
  if (posterData.showReferences === false || !posterData.references?.trim()) {
    return <div className="h-full flex flex-col"></div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col h-full">
        {/* References Header */}
        <div 
          className="px-3 py-2 border-b-2 border-white flex-shrink-0"
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
            {posterData.sectionTitles?.[4] || "6. References"}
          </h2>
        </div>
        
        {/* References Content - stretches to fill remaining space */}
        <div 
          className="p-3 flex-1 overflow-auto"
          style={{ backgroundColor: "#3E3C72" }}
        >
          <div 
            className="text-xs leading-relaxed h-full"
            style={{ 
              color: "#FFFFFF",
              fontFamily: `var(--font-${designSettings.contentFont})`,
              whiteSpace: 'pre-line',
              marginLeft: '1rem',
              textIndent: '-1rem'
            }}
          >
            {posterData.references}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencesColumn;
