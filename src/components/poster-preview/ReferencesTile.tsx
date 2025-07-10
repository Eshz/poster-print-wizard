
import React from 'react';

interface ReferencesTileProps {
  posterData: any;
  designSettings: any;
  isCompact?: boolean; // For landscape mode
}

const ReferencesTile: React.FC<ReferencesTileProps> = ({
  posterData,
  designSettings,
  isCompact = false
}) => {
  // Hide if references are disabled or empty
  if (posterData.showReferences === false || !posterData.references?.trim()) {
    return null;
  }

  // Convert plain text references to list items
  const formatReferences = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => (
      <li key={index} className="mb-1">
        <p 
          className={isCompact ? "text-xs" : "text-sm"} 
          style={{ 
            color: "#FFFFFF",
            fontFamily: `var(--font-${designSettings.contentFont})`,
            lineHeight: "1.4"
          }}
        >
          {line.trim()}
        </p>
      </li>
    ));
  };

  const titleSize = isCompact ? "text-sm" : "text-lg";
  const headerPadding = isCompact ? "px-3 py-2" : "px-4 py-3";
  const contentPadding = isCompact ? "p-3" : "p-4";
  const uniqueId = `references-tile-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col h-full ${uniqueId}`}>
      <style>
        {`
          .${uniqueId} ul.paragraph-list li::marker {
            color: #FFFFFF;
            font-family: var(--font-${designSettings.contentFont});
            font-weight: normal;
          }
        `}
      </style>
      
      {/* References Header */}
      <div 
        className={`${headerPadding} border-b-2 border-white flex-shrink-0`}
        style={{ 
          backgroundColor: "#3E3C72",
          borderBottomColor: "#FFFFFF"
        }}
      >
        <h2 
          className={`${titleSize} font-bold`}
          style={{ 
            color: "#FFFFFF",
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          {posterData.sectionTitles?.[4] || "References"}
        </h2>
      </div>
      
      {/* References Content */}
      <div 
        className={`${contentPadding} flex-1 overflow-auto`}
        style={{ backgroundColor: "#3E3C72" }}
      >
        <ul 
          className="paragraph-list list-disc pl-4 space-y-1"
          style={{
            color: "#FFFFFF",
            fontFamily: `var(--font-${designSettings.contentFont})`
          }}
        >
          {formatReferences(posterData.references)}
        </ul>
      </div>
    </div>
  );
};

export default ReferencesTile;
