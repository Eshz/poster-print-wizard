import React from 'react';

interface PosterPreviewProps {
  posterData: {
    title: string;
    authors: string;
    school: string;
    contact: string;
    introduction: string;
    methods: string;
    findings: string;
    conclusions: string;
    references: string;
    keypoints: string[];
    keyDescriptions: string[];
    sectionTitles: string[];
    qrCodeUrl: string;
    qrCodeColor?: string;
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
  // QR Code generation
  const qrCodeUrl = posterData.qrCodeUrl ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}` : 
    '';

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

  // Classic layout (2 columns) - Updated to fix overflow issues
  const renderClassicLayout = () => (
    <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        {/* Introduction Section */}
        <div 
          className="p-3 rounded flex-grow overflow-auto"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-lg md:text-xl font-semibold mb-1`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {posterData.sectionTitles[0]}
          </h2>
          <p 
            className={`text-xs md:text-sm`}
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
          className="p-3 rounded flex-grow overflow-auto"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-lg md:text-xl font-semibold mb-1`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {posterData.sectionTitles[1]}
          </h2>
          <p 
            className={`text-xs md:text-sm`}
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
          className="p-3 rounded flex-grow overflow-auto"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-lg md:text-xl font-semibold mb-1`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {posterData.sectionTitles[2]}
          </h2>
          <p 
            className={`text-xs md:text-sm`}
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
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        {/* Key Takeaways and QR Code Section */}
        <div className="flex flex-col space-y-2">
          <div 
            className="border-t-2 border-b-2 py-2 text-center mb-1"
            style={{ borderColor: designSettings.sectionTitleColor }}
          >
            <div className="flex justify-between items-center px-2">
              <h2 
                className={`text-lg md:text-xl font-semibold`}
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                Key Takeaways
              </h2>
              
              {/* QR Code */}
              {posterData.qrCodeUrl && qrCodeUrl && (
                <div className="flex flex-col items-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="w-20 h-20 object-contain"
                  />
                  <p 
                    className="text-xs text-center mt-1"
                    style={{ 
                      color: designSettings.sectionTitleColor,
                      fontFamily: `var(--font-${designSettings.contentFont})`
                    }}
                  >
                    Scan for more info
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Key Points Grid - Updated to scroll if needed */}
        <div className="grid grid-cols-2 gap-2 flex-grow overflow-auto">
          {posterData.keypoints.map((point, index) => (
            <div 
              key={index} 
              className="p-2 rounded flex flex-col"
              style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
            >
              <div className="flex items-start mb-1">
                <div 
                  data-circle-number="true"
                  className="h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold mr-1 flex-shrink-0"
                  style={{ 
                    backgroundColor: designSettings.sectionTitleColor, 
                    color: designSettings.sectionBgColor,
                    width: "2rem",
                    height: "2rem",
                    minWidth: "2rem"
                  }}
                >
                  {index + 1}
                </div>
                <h3 
                  className={`text-sm font-semibold`}
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
        
        {/* Conclusions Section */}
        <div 
          className="p-3 rounded flex-grow overflow-auto"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-lg md:text-xl font-semibold mb-1`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {posterData.sectionTitles[3]}
          </h2>
          <p 
            className={`text-xs md:text-sm`}
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
          className="p-3 rounded flex-grow overflow-auto"
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-lg md:text-xl font-semibold mb-1`}
            style={{ 
              color: designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {posterData.sectionTitles[4]}
          </h2>
          <p 
            className={`text-xs md:text-sm whitespace-pre-line`}
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
              {posterData.sectionTitles[0]}
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
              {posterData.sectionTitles[1]}
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
              {posterData.sectionTitles[2]}
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
          <div className="flex justify-between items-center mb-2">
            <div 
              className="border-t-2 border-b-2 py-2 flex-1 text-center"
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
            
            {/* QR Code */}
            {posterData.qrCodeUrl && qrCodeUrl && (
              <div className="ml-2 flex flex-col items-center">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-20 h-20 object-contain"
                />
                <p 
                  className="text-xs text-center mt-1"
                  style={{ 
                    color: designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  Scan for more info
                </p>
              </div>
            )}
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
                    data-circle-number="true"
                    className="h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold mr-2 flex-shrink-0"
                    style={{ 
                      backgroundColor: designSettings.sectionTitleColor, 
                      color: designSettings.sectionBgColor,
                      width: "2rem",
                      height: "2rem",
                      minWidth: "2rem"
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
                    data-circle-number="true"
                    className="h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold mr-2 flex-shrink-0"
                    style={{ 
                      backgroundColor: designSettings.sectionTitleColor, 
                      color: designSettings.sectionBgColor,
                      width: "2rem",
                      height: "2rem",
                      minWidth: "2rem"
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
              {posterData.sectionTitles[3]}
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
              {posterData.sectionTitles[4]}
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
        {/* QR Code and Title Row */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-4/5">
            {/* Introduction Section */}
            <div 
              className="p-4 rounded"
              style={{ backgroundColor: designSettings.sectionBgColor }}
            >
              <h2 
                className={`text-2xl font-semibold mb-3`}
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {posterData.sectionTitles[0]}
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
          </div>

          {/* QR Code */}
          {posterData.qrCodeUrl && qrCodeUrl && (
            <div className="flex flex-col items-center">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-28 h-28 object-contain"
              />
              <p 
                className="text-xs text-center mt-1"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                Scan for more info
              </p>
            </div>
          )}
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
            {posterData.sectionTitles[1]}
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
            {posterData.sectionTitles[2]}
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
                  data-circle-number="true"
                  className="rounded-full flex items-center justify-center text-xl font-bold mr-3 flex-shrink-0"
                  style={{ 
                    backgroundColor: designSettings.sectionTitleColor, 
                    color: designSettings.sectionBgColor,
                    width: "2.5rem",
                    height: "2.5rem",
                    minWidth: "2.5rem"
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
            {posterData.sectionTitles[3]}
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
            {posterData.sectionTitles[4]}
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
        className="w-full p-4 text-center"
        style={{ 
          backgroundColor: designSettings.headerBgColor, 
          color: designSettings.headerTextColor,
          fontFamily: `var(--font-${designSettings.titleFont})`
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{posterData.title}</h1>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm">
          <div>{posterData.authors}</div>
          <div>{posterData.school}</div>
          <div>{posterData.contact}</div>
        </div>
      </div>

      {/* Dynamic Content Layout - adding overflow control */}
      <div className="flex-grow overflow-hidden p-2">
        {renderLayout()}
      </div>
    </div>
  );
};

export default PosterPreview;
