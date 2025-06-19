
import React from 'react';
import { PosterData } from '@/types/project';
import { getFontFamily } from '@/utils/fontUtils';
import PosterSection from './PosterSection';
import ImagesDisplay from './ImagesDisplay';
import KeyTakeaway from './KeyTakeaway';

interface EnhancedDesignSettings {
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
  titleFontClass: string;
  contentFontClass: string;
}

interface AcademicBlueGridLayoutProps {
  posterData: PosterData;
  designSettings: EnhancedDesignSettings;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const AcademicBlueGridLayout: React.FC<AcademicBlueGridLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const titleFontFamily = getFontFamily(designSettings.titleFont);
  const contentFontFamily = getFontFamily(designSettings.contentFont);

  return (
    <div className="w-full h-full p-8 bg-white overflow-y-auto">
      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Introduction Section */}
          {posterData.sections.length > 0 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {posterData.sections[0].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  section={posterData.sections[0]} 
                  designSettings={designSettings}
                />
              </div>
            </div>
          )}

          {/* Objectives Section */}
          {posterData.sections.length > 1 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {posterData.sections[1].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  section={posterData.sections[1]} 
                  designSettings={designSettings}
                />
              </div>
            </div>
          )}

          {/* Methodology Section with Grid */}
          {posterData.sections.length > 2 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {posterData.sections[2].title}
              </h2>
              <div 
                className="text-sm leading-relaxed mb-4"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  section={posterData.sections[2]} 
                  designSettings={designSettings}
                />
              </div>
              
              {/* Grid for Images/Illustrations */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="h-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 italic text-xs rounded"
                  style={{ backgroundColor: '#f3f6fa' }}
                >
                  [Survey/Tests Infographic]
                </div>
                <div 
                  className="h-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 italic text-xs rounded"
                  style={{ backgroundColor: '#f3f6fa' }}
                >
                  [Participants & Tools Icons]
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Results Section with Grid */}
          {posterData.sections.length > 3 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {posterData.sections[3].title}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div 
                  className="text-sm leading-relaxed"
                  style={{ 
                    color: designSettings.sectionTextColor,
                    fontFamily: contentFontFamily
                  }}
                >
                  <PosterSection 
                    section={posterData.sections[3]} 
                    designSettings={designSettings}
                  />
                  
                  {/* Key Points as bullet list */}
                  {showKeypoints && posterData.keyTakeaways.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {posterData.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                        <li key={index} className="text-sm">
                          • {takeaway.title}: {takeaway.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div 
                  className="h-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 italic text-xs rounded"
                  style={{ backgroundColor: '#f3f6fa' }}
                >
                  [Bar/Donut Chart - Cognitive Score]
                </div>
              </div>
            </div>
          )}

          {/* Discussion Section */}
          {posterData.sections.length > 4 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {posterData.sections[4].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  section={posterData.sections[4]} 
                  designSettings={designSettings}
                />
              </div>
            </div>
          )}

          {/* Conclusion Section */}
          {posterData.sections.length > 5 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {posterData.sections[5].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  section={posterData.sections[5]} 
                  designSettings={designSettings}
                />
              </div>
            </div>
          )}

          {/* References Section */}
          {posterData.references && posterData.references.length > 0 && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                References
              </h2>
              <ul className="text-xs space-y-1" style={{ fontFamily: contentFontFamily }}>
                {posterData.references.map((ref, index) => (
                  <li key={index} style={{ color: designSettings.sectionTextColor }}>
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Images Display */}
          {posterData.images && posterData.images.length > 0 && (
            <div className="bg-white">
              <ImagesDisplay 
                images={posterData.images} 
                designSettings={designSettings}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500" style={{ fontFamily: contentFontFamily }}>
        Academic research poster - Generated with PosterMaker
      </div>
    </div>
  );
};

export default AcademicBlueGridLayout;
