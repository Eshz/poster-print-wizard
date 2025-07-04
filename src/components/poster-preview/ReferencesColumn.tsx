
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

  // Process references to handle proper bullet point indentation
  const processReferences = (text: string) => {
    const lines = text.split('\n');
    const processedLines: string[] = [];
    
    lines.forEach(line => {
      if (line.trim().startsWith('• ')) {
        // This is a bullet point line
        processedLines.push(line);
      } else if (line.trim() && processedLines.length > 0) {
        // This is a continuation line - add proper indentation
        // Add spaces to align with the text portion after the bullet
        const indentedLine = '  ' + line.trim(); // Two spaces to align with bullet text
        processedLines.push(indentedLine);
      } else {
        // Empty line or other content
        processedLines.push(line);
      }
    });
    
    return processedLines.join('\n');
  };

  const formattedReferences = processReferences(posterData.references);

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
              textIndent: '0',
              paddingLeft: '0.5rem'
            }}
          >
            {formattedReferences}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencesColumn;
