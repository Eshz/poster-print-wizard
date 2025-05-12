
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
    <div className="grid grid-cols-2 gap-2 p-4">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Introduction Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            1. Introduction
          </h2>
          <p 
            className={`text-sm md:text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.introduction}
          </p>
        </div>
        
        {/* Methods Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            2. Methods
          </h2>
          <p 
            className={`text-sm md:text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.methods}
          </p>
        </div>
        
        {/* Findings Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            3. Findings
          </h2>
          <p 
            className={`text-sm md:text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.findings}
          </p>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="space-y-4">
        {/* Key Takeaways Section */}
        <div 
          className="border-t-2 border-b-2 py-4 text-center mb-2"
          style={{ borderColor: designSettings.sectionTitleColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            Key Takeaways
          </h2>
        </div>
        
        {/* Key Points Grid */}
        <div className="grid grid-cols-2 gap-2">
          {posterData.keypoints.map((point, index) => (
            <div 
              key={index} 
              className="p-3 rounded"
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
                  className={`text-lg font-semibold font-${designSettings.titleFont}`}
                  style={{ color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
                >
                  {point}
                </h3>
              </div>
              <p 
                className={`text-sm font-${designSettings.contentFont}`}
                style={{ color: designSettings.sectionTextColor }}
              >
                {posterData.keyDescriptions[index]}
              </p>
            </div>
          ))}
        </div>
        
        {/* Conclusions Section */}
        <div 
          className="p-4 rounded mt-4" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            4. Conclusions and implications
          </h2>
          <p 
            className={`text-sm md:text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.conclusions}
          </p>
        </div>
        
        {/* References Section */}
        <div 
          className="p-4 rounded mt-4" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-xl md:text-2xl font-semibold mb-2 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            5. References
          </h2>
          <p 
            className={`text-sm md:text-base whitespace-pre-line font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.references}
          </p>
        </div>
      </div>
    </div>
  );

  // Modern layout (3 columns)
  const renderModernLayout = () => (
    <div className="p-4 space-y-4">
      {/* Three column layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Column 1: Introduction & Methods */}
        <div className="space-y-4">
          {/* Introduction Section */}
          <div 
            className="p-4 rounded" 
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2 font-${designSettings.titleFont}`}
              style={{ color: designSettings.sectionTitleColor }}
            >
              1. Introduction
            </h2>
            <p 
              className={`text-sm font-${designSettings.contentFont}`}
              style={{ color: designSettings.sectionTextColor }}
            >
              {posterData.introduction}
            </p>
          </div>
          
          {/* Methods Section */}
          <div 
            className="p-4 rounded" 
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2 font-${designSettings.titleFont}`}
              style={{ color: designSettings.sectionTitleColor }}
            >
              2. Methods
            </h2>
            <p 
              className={`text-sm font-${designSettings.contentFont}`}
              style={{ color: designSettings.sectionTextColor }}
            >
              {posterData.methods}
            </p>
          </div>
        </div>
        
        {/* Column 2: Findings & Key Points */}
        <div className="space-y-4">
          {/* Findings Section */}
          <div 
            className="p-4 rounded" 
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2 font-${designSettings.titleFont}`}
              style={{ color: designSettings.sectionTitleColor }}
            >
              3. Findings
            </h2>
            <p 
              className={`text-sm font-${designSettings.contentFont}`}
              style={{ color: designSettings.sectionTextColor }}
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
              className={`text-lg font-semibold font-${designSettings.titleFont}`}
              style={{ color: designSettings.sectionTitleColor }}
            >
              Key Takeaways
            </h2>
          </div>
          
          <div className="space-y-2">
            {posterData.keypoints.slice(0, 2).map((point, index) => (
              <div 
                key={index} 
                className="p-3 rounded"
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
                    className={`text-base font-semibold font-${designSettings.titleFont}`}
                    style={{ color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
                  >
                    {point}
                  </h3>
                </div>
                <p 
                  className={`text-xs font-${designSettings.contentFont}`}
                  style={{ color: designSettings.sectionTextColor }}
                >
                  {posterData.keyDescriptions[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Column 3: Conclusions & References + Remaining Key Points */}
        <div className="space-y-4">
          <div className="space-y-2">
            {posterData.keypoints.slice(2).map((point, index) => (
              <div 
                key={index} 
                className="p-3 rounded"
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
                    className={`text-base font-semibold font-${designSettings.titleFont}`}
                    style={{ color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
                  >
                    {point}
                  </h3>
                </div>
                <p 
                  className={`text-xs font-${designSettings.contentFont}`}
                  style={{ color: designSettings.sectionTextColor }}
                >
                  {posterData.keyDescriptions[index + 2]}
                </p>
              </div>
            ))}
          </div>
          
          {/* Conclusions Section */}
          <div 
            className="p-4 rounded" 
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2 font-${designSettings.titleFont}`}
              style={{ color: designSettings.sectionTitleColor }}
            >
              4. Conclusions
            </h2>
            <p 
              className={`text-sm font-${designSettings.contentFont}`}
              style={{ color: designSettings.sectionTextColor }}
            >
              {posterData.conclusions}
            </p>
          </div>
          
          {/* References Section */}
          <div 
            className="p-4 rounded" 
            style={{ backgroundColor: designSettings.sectionBgColor }}
          >
            <h2 
              className={`text-xl font-semibold mb-2 font-${designSettings.titleFont}`}
              style={{ color: designSettings.sectionTitleColor }}
            >
              5. References
            </h2>
            <p 
              className={`text-xs whitespace-pre-line font-${designSettings.contentFont}`}
              style={{ color: designSettings.sectionTextColor }}
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
    <div className="p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Introduction Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            1. Introduction
          </h2>
          <p 
            className={`text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.introduction}
          </p>
        </div>
        
        {/* Methods Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            2. Methods
          </h2>
          <p 
            className={`text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.methods}
          </p>
        </div>
        
        {/* Findings Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            3. Findings
          </h2>
          <p 
            className={`text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
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
            className={`text-2xl font-semibold font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            Key Takeaways
          </h2>
        </div>
        
        {/* Key Points in a row */}
        <div className="grid grid-cols-2 gap-4">
          {posterData.keypoints.map((point, index) => (
            <div 
              key={index} 
              className="p-4 rounded"
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
                  className={`text-lg font-semibold font-${designSettings.titleFont}`}
                  style={{ color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
                >
                  {point}
                </h3>
              </div>
              <p 
                className={`text-sm font-${designSettings.contentFont}`}
                style={{ color: designSettings.sectionTextColor }}
              >
                {posterData.keyDescriptions[index]}
              </p>
            </div>
          ))}
        </div>
        
        {/* Conclusions Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            4. Conclusions and implications
          </h2>
          <p 
            className={`text-base font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
          >
            {posterData.conclusions}
          </p>
        </div>
        
        {/* References Section */}
        <div 
          className="p-4 rounded" 
          style={{ backgroundColor: designSettings.sectionBgColor }}
        >
          <h2 
            className={`text-2xl font-semibold mb-3 font-${designSettings.titleFont}`}
            style={{ color: designSettings.sectionTitleColor }}
          >
            5. References
          </h2>
          <p 
            className={`text-base whitespace-pre-line font-${designSettings.contentFont}`}
            style={{ color: designSettings.sectionTextColor }}
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
      className="w-full aspect-[1/1.414] bg-white border border-gray-200 relative overflow-hidden"
      style={{ 
        maxWidth: '100%',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div 
        className={`w-full p-6 text-center font-${designSettings.titleFont}`}
        style={{ backgroundColor: designSettings.headerBgColor, color: designSettings.headerTextColor }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{posterData.title}</h1>
        <div className="flex justify-between items-center">
          <div className="text-sm md:text-lg">{posterData.authors}</div>
          <div className="text-sm md:text-lg">{posterData.contact}</div>
        </div>
      </div>

      {/* Dynamic Content Layout */}
      {renderLayout()}
    </div>
  );
};

export default PosterPreview;
