
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
}

const PosterPreview: React.FC<PosterPreviewProps> = ({ posterData }) => {
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
      <div className="w-full p-6 bg-poster-blue text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{posterData.title}</h1>
        <div className="flex justify-between items-center">
          <div className="text-sm md:text-lg">{posterData.authors}</div>
          <div className="text-sm md:text-lg">{posterData.contact}</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-2 p-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Introduction Section */}
          <div className="bg-poster-lightblue p-4 rounded">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-poster-blue">1. Introduction</h2>
            <p className="text-sm md:text-base">{posterData.introduction}</p>
          </div>
          
          {/* Methods Section */}
          <div className="bg-poster-lightblue p-4 rounded">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-poster-blue">2. Methods</h2>
            <p className="text-sm md:text-base">{posterData.methods}</p>
          </div>
          
          {/* Findings Section */}
          <div className="bg-poster-lightblue p-4 rounded">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-poster-blue">3. Findings</h2>
            <p className="text-sm md:text-base">{posterData.findings}</p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          {/* Key Takeaways Section */}
          <div className="border-t-2 border-b-2 border-poster-blue py-4 text-center mb-2">
            <h2 className="text-xl md:text-2xl font-semibold text-poster-blue">Key Takeaways</h2>
          </div>
          
          {/* Key Points Grid */}
          <div className="grid grid-cols-2 gap-2">
            {posterData.keypoints.map((point, index) => (
              <div key={index} className="bg-poster-gray p-3 rounded">
                <div className="flex items-start mb-2">
                  <div className="h-10 w-10 bg-poster-blue text-white rounded-full flex items-center justify-center text-xl font-bold mr-2">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-poster-blue">{point}</h3>
                </div>
                <p className="text-sm">{posterData.keyDescriptions[index]}</p>
              </div>
            ))}
          </div>
          
          {/* Conclusions Section */}
          <div className="bg-poster-lightblue p-4 rounded mt-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-poster-blue">4. Conclusions and implications</h2>
            <p className="text-sm md:text-base">{posterData.conclusions}</p>
          </div>
          
          {/* References Section */}
          <div className="bg-poster-lightblue p-4 rounded mt-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-poster-blue">5. References</h2>
            <p className="text-sm md:text-base whitespace-pre-line">{posterData.references}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterPreview;
