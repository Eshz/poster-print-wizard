
import React from 'react';
import { PosterData } from '@/types/project';
import { getFontFamily } from '@/utils/fontUtils';
import PosterSection from './PosterSection';
import ImagesDisplay from './ImagesDisplay';

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

  // Map poster data to sections array for easier handling
  const sections = [
    { title: posterData.sectionTitles[0] || 'Introduction', content: posterData.introduction },
    { title: posterData.sectionTitles[1] || 'Objectives', content: posterData.methods },
    { title: posterData.sectionTitles[2] || 'Methodology', content: posterData.methods },
    { title: posterData.sectionTitles[3] || 'Results', content: posterData.findings },
    { title: posterData.sectionTitles[4] || 'Discussion', content: posterData.conclusions },
    { title: 'Conclusion', content: posterData.conclusions }
  ];

  return (
    <div className="w-full h-full p-8 bg-white overflow-y-auto">
      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Introduction Section */}
          {sections[0] && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {sections[0].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  title=""
                  content={sections[0].content || ''}
                  designSettings={designSettings}
                  className="p-0"
                />
              </div>
            </div>
          )}

          {/* Objectives Section */}
          {sections[1] && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {sections[1].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  title=""
                  content={sections[1].content || ''}
                  designSettings={designSettings}
                  className="p-0"
                />
              </div>
            </div>
          )}

          {/* Methodology Section with Grid */}
          {sections[2] && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {sections[2].title}
              </h2>
              <div 
                className="text-sm leading-relaxed mb-4"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  title=""
                  content={sections[2].content || ''}
                  designSettings={designSettings}
                  className="p-0"
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
          {sections[3] && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {sections[3].title}
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
                    title=""
                    content={sections[3].content || ''}
                    designSettings={designSettings}
                    className="p-0"
                  />
                  
                  {/* Key Points as bullet list */}
                  {showKeypoints && posterData.keypoints && posterData.keypoints.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {posterData.keypoints.slice(0, 2).map((keypoint, index) => (
                        <li key={index} className="text-sm">
                          • {keypoint}: {posterData.keyDescriptions?.[index] || ''}
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
          {sections[4] && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {sections[4].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  title=""
                  content={sections[4].content || ''}
                  designSettings={designSettings}
                  className="p-0"
                />
              </div>
            </div>
          )}

          {/* Conclusion Section */}
          {sections[5] && (
            <div className="bg-white">
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  borderColor: designSettings.sectionTitleColor,
                  fontFamily: titleFontFamily
                }}
              >
                {sections[5].title}
              </h2>
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: contentFontFamily
                }}
              >
                <PosterSection 
                  title=""
                  content={sections[5].content || ''}
                  designSettings={designSettings}
                  className="p-0"
                />
              </div>
            </div>
          )}

          {/* References Section */}
          {posterData.references && (
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
              <div className="text-xs" style={{ fontFamily: contentFontFamily, color: designSettings.sectionTextColor }}>
                {posterData.references}
              </div>
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
