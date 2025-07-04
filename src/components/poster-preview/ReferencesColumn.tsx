
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

  // Convert plain text references to list items
  const formatReferences = (text: string) => {
    // Split by lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => (
      <li key={index} className="mb-1">
        <p className="text-xs leading-relaxed" style={{ 
          color: "#FFFFFF",
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}>
          {line.trim()}
        </p>
      </li>
    ));
  };

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
          <ul className="paragraph-list list-disc pl-4 space-y-1">
            {formatReferences(posterData.references)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReferencesColumn;
