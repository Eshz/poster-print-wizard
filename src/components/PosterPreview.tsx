
import React from 'react';

interface PosterPreviewProps {
  posterData: {
    title: string;
    authors: string;
    contact: string;
    introduction: string;
    methods: string;
    findings: string;
    conclusions: string;
    references: string;
    keypoints: string[];
    keyDescriptions: string[];
  };
  designSettings: {
    layout: string;
    titleFont: string;
    contentFont: string;
    headerBgColor: string;
    headerTextColor: string;
    sectionBgColor: string;
    sectionTitleColor: string;
    sectionTextColor: string;
    keyPointsBgColor: string;
    keyPointsTextColor: string;
  };
}

const PosterPreview: React.FC<PosterPreviewProps> = ({ posterData, designSettings }) => {
  // Apply the selected layout
  const renderLayout = () => {
    switch(designSettings.layout) {
      case 'modern':
        return renderModernLayout();
      case 'focus':
        return renderFocusLayout();
      case 'classic':
      default:
        return renderClassicLayout();
    }
  };

  // Classic layout (2 columns)
  const renderClassicLayout = () => (
    <div className="grid grid-cols-2 gap-2 p-4 h-full">
      {/* Left Column */}
      <div className="flex flex-col space-y-4 h-full">
        {/* Introduction Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            1. Introduction
          </h2>
          <p 
            className={`text-sm md:text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.introduction}
          </p>
        </div>
        
        {/* Methods Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            2. Methods
          </h2>
          <p 
            className={`text-sm md:text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.methods}
          </p>
        </div>
        
        {/* Findings Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            3. Findings
          </h2>
          <p 
            className={`text-sm md:text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.findings}
          </p>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="flex flex-col space-y-4 h-full">
        {/* Key Takeaways Section */}
        <div 
          className="border-t-2 border-b-2 py-4 text-center mb-2"
          style={{ borderColor: designSettings.sectionTitleColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            Key Takeaways
          </h2>
        </div>
        
        {/* Key Points Grid */}
        <div className="grid grid-cols-2 gap-2 flex-grow">
          {posterData.keypoints.map((point, index) => (
            <div 
              key={index} 
              className="p-3 rounded flex flex-col"
              style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
            >
              <div className="flex items-start mb-2">
                <div 
                  className="h-10 w-10 rounded-full flex items-center justify-center text-xl font-bold mr-2"
                  style={{ 
                    backgroundColor: designSettings.sectionTitleColor, 
                    color: designSettings.sectionBgColor
                  }}
                >
                  {index + 1}
                </div>
                <h3 
                  className={`text-lg font-semibold`}
                  style={{ 
                    color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {point}
                </h3>
              </div>
              <p 
                className={`text-sm`}
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {posterData.keyDescriptions[index]}
              </p>
            </div>
          ))}
        </div>
        
        {/* Conclusions Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            4. Conclusions and implications
          </h2>
          <p 
            className={`text-sm md:text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.conclusions}
          </p>
        </div>
        
        {/* References Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            5. References
          </h2>
          <p 
            className={`text-sm md:text-base whitespace-pre-line`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.references}
          </p>
        </div>
      </div>
    </div>
  );

  // Modern layout (3 columns)
  const renderModernLayout = () => (
    <div className="p-4 h-full flex flex-col">
      {/* Three column layout */}
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {/* Column 1: Introduction & Methods */}
        <div className="flex flex-col space-y-4 h-full">
          {/* Introduction Section */}
          <div 
            className="p-4 rounded flex-grow"
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2`}
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              1. Introduction
            </h2>
            <p 
              className={`text-sm`}
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              {posterData.introduction}
            </p>
          </div>
          
          {/* Methods Section */}
          <div 
            className="p-4 rounded flex-grow"
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2`}
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              2. Methods
            </h2>
            <p 
              className={`text-sm`}
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              {posterData.methods}
            </p>
          </div>
        </div>
        
        {/* Column 2: Findings & Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          {/* Findings Section */}
          <div 
            className="p-4 rounded flex-grow"
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2`}
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              3. Findings
            </h2>
            <p 
              className={`text-sm`}
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              {posterData.findings}
            </p>
          </div>
          
          {/* Key Points */}
          <div 
            className="border-t-2 border-b-2 py-2 text-center mb-2"
            style={{ borderColor: designSettings.sectionTitleColor }}
          >
            <h2 
              className={`text-lg font-semibold`}
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              Key Takeaways
            </h2>
          </div>
          
          <div className="space-y-2 flex-grow flex flex-col justify-between">
            {posterData.keypoints.slice(0, 2).map((point, index) => (
              <div 
                key={index} 
                className="p-3 rounded flex-1"
                style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
              >
                <div className="flex items-start mb-1">
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold mr-2"
                    style={{ 
                      backgroundColor: designSettings.sectionTitleColor, 
                      color: designSettings.sectionBgColor
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3 
                    className={`text-base font-semibold`}
                    style={{ 
                      color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                      fontFamily: `var(--font-${designSettings.titleFont})`
                    }}
                  >
                    {point}
                  </h3>
                </div>
                <p 
                  className={`text-xs`}
                  style={{ 
                    color: designSettings.sectionTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  {posterData.keyDescriptions[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Column 3: Conclusions & References + Remaining Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          <div className="space-y-2 flex-grow flex flex-col justify-between">
            {posterData.keypoints.slice(2).map((point, index) => (
              <div 
                key={index} 
                className="p-3 rounded flex-1"
                style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
              >
                <div className="flex items-start mb-1">
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold mr-2"
                    style={{ 
                      backgroundColor: designSettings.sectionTitleColor, 
                      color: designSettings.sectionBgColor
                    }}
                  >
                    {index + 3}
                  </div>
                  <h3 
                    className={`text-base font-semibold`}
                    style={{ 
                      color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                      fontFamily: `var(--font-${designSettings.titleFont})`
                    }}
                  >
                    {point}
                  </h3>
                </div>
                <p 
                  className={`text-xs`}
                  style={{ 
                    color: designSettings.sectionTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  {posterData.keyDescriptions[index + 2]}
                </p>
              </div>
            ))}
          </div>
          
          {/* Conclusions Section */}
          <div 
            className="p-4 rounded flex-grow"
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2`}
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              4. Conclusions
            </h2>
            <p 
              className={`text-sm`}
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              {posterData.conclusions}
            </p>
          </div>
          
          {/* References Section */}
          <div 
            className="p-4 rounded flex-grow"
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2`}
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              5. References
            </h2>
            <p 
              className={`text-xs whitespace-pre-line`}
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              {posterData.references}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Focus layout (centered content)
  const renderFocusLayout = () => (
    <div className="p-4 h-full flex flex-col">
      <div className="max-w-4xl mx-auto space-y-6 flex-grow flex flex-col">
        {/* Introduction Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            1. Introduction
          </h2>
          <p 
            className={`text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.introduction}
          </p>
        </div>
        
        {/* Methods Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            2. Methods
          </h2>
          <p 
            className={`text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.methods}
          </p>
        </div>
        
        {/* Findings Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            3. Findings
          </h2>
          <p 
            className={`text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.findings}
          </p>
        </div>
        
        {/* Key Takeaways Section */}
        <div 
          className="border-t-2 border-b-2 py-4 text-center my-6"
          style={{ borderColor: designSettings.sectionTitleColor }}
        >
          <h2 
            className={`text-2xl font-semibold`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            Key Takeaways
          </h2>
        </div>
        
        {/* Key Points in a row */}
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {posterData.keypoints.map((point, index) => (
            <div 
              key={index} 
              className="p-4 rounded flex-1"
              style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
            >
              <div className="flex items-start mb-2">
                <div 
                  className="h-10 w-10 rounded-full flex items-center justify-center text-xl font-bold mr-3"
                  style={{ 
                    backgroundColor: designSettings.sectionTitleColor, 
                    color: designSettings.sectionBgColor
                  }}
                >
                  {index + 1}
                </div>
                <h3 
                  className={`text-lg font-semibold`}
                  style={{ 
                    color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {point}
                </h3>
              </div>
              <p 
                className={`text-sm`}
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {posterData.keyDescriptions[index]}
              </p>
            </div>
          ))}
        </div>
        
        {/* Conclusions Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            4. Conclusions and implications
          </h2>
          <p 
            className={`text-base`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.conclusions}
          </p>
        </div>
        
        {/* References Section */}
        <div 
          className="p-4 rounded flex-grow"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            5. References
          </h2>
          <p 
            className={`text-base whitespace-pre-line`}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {posterData.references}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="poster-preview"
      className="w-full aspect-[1/1.414] bg-white border border-gray-200 relative overflow-hidden flex flex-col"
      style={{ 
        maxWidth: '100%',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div 
        className="w-full p-6 text-center"
        style={{ 
          backgroundColor: designSettings.headerBgColor, 
          color: designSettings.headerTextColor,
          fontFamily: `var(--font-${designSettings.titleFont})`
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{posterData.title}</h1>
        <div className="flex justify-between items-center">
          <div className="text-sm md:text-lg">{posterData.authors}</div>
          <div className="text-sm md:text-lg">{posterData.contact}</div>
        </div>
      </div>

      {/* Dynamic Content Layout */}
      <div className="flex-grow">
        {renderLayout()}
      </div>
    </div>
  );
};

export default PosterPreview;
