
import React from 'react';

interface ReferencesColumnProps {
  posterData: any;
  designSettings: any;
}

const ReferencesColumn: React.FC<ReferencesColumnProps> = ({
  posterData,
  designSettings
}) => {
  if (!posterData.references?.trim()) {
    return <div className="space-y-2 overflow-auto flex flex-col h-full"></div>;
  }

  return (
    <div className="space-y-2 overflow-auto flex flex-col h-full">
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
        
        {/* References Content with consistent left alignment */}
        <div 
          className="p-3 flex-1"
          style={{ backgroundColor: "#3E3C72" }}
        >
          <div 
            className="text-xs leading-relaxed whitespace-pre-line"
            style={{ 
              color: "#FFFFFF",
              fontFamily: `var(--font-${designSettings.contentFont})`,
              paddingLeft: '0.5rem'
            }}
            dangerouslySetInnerHTML={{
              __html: posterData.references.replace(/\n/g, '<br>')
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferencesColumn;
