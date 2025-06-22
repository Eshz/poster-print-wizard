
import React from 'react';
import ContentSection from './landscape/ContentSection';
import KeyTakeawaysSection from './landscape/KeyTakeawaysSection';
import ReferencesSection from './landscape/ReferencesSection';
import ImagesDisplay from './ImagesDisplay';

interface AcademicModernLandscapeLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const AcademicModernLandscapeLayout: React.FC<AcademicModernLandscapeLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  // Get all sections
  const sections = [
    { 
      title: posterData.sectionTitles?.[0] || "1. Background", 
      content: posterData.introduction,
      headerBg: "#0007DB",
      headerTextColor: "#FFFFFF",
      contentBg: "#0007DB",
      contentTextColor: "#FFFFFF"
    },
    { 
      title: posterData.sectionTitles?.[1] || "2. Methodology", 
      content: posterData.methods,
      headerBg: "#CFE0FC",
      headerTextColor: "#202B5B",
      contentBg: "#CFE0FC",
      contentTextColor: "#202B5B"
    },
    { 
      title: posterData.sectionTitles?.[2] || "3. Results", 
      content: posterData.findings,
      headerBg: "#1A3D84",
      headerTextColor: "#FFFFFF",
      contentBg: "#1A3D84",
      contentTextColor: "#FFFFFF"
    },
    { 
      title: posterData.sectionTitles?.[3] || "4. Importance", 
      content: posterData.conclusions,
      headerBg: "#BAE1FE",
      headerTextColor: "#202B5B",
      contentBg: "#BAE1FE",
      contentTextColor: "#202B5B"
    }
  ];

  // Filter out empty sections
  const activeSections = sections.filter(section => section.content?.trim());

  // References section
  const referencesSection = {
    title: posterData.sectionTitles?.[4] || "5. References", 
    content: posterData.references,
    headerBg: "#3E3C72",
    headerTextColor: "#FFFFFF",
    contentBg: "#3E3C72",
    contentTextColor: "#FFFFFF"
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      {/* Main Content Area - 4-Column Horizontal Layout */}
      <div className="flex-1 grid grid-cols-4 gap-2 min-h-0">
        
        {/* Column 1 - Background */}
        {activeSections[0] && (
          <ContentSection {...activeSections[0]} designSettings={designSettings} />
        )}

        {/* Column 2 - Methodology */}
        {activeSections[1] && (
          <ContentSection {...activeSections[1]} designSettings={designSettings} />
        )}

        {/* Column 3 - Results and Images */}
        <div className="flex flex-col gap-2">
          {/* Results Section */}
          {activeSections[2] && (
            <div className="flex-1 flex flex-col min-h-0">
              <ContentSection {...activeSections[2]} designSettings={designSettings} />
            </div>
          )}

          {/* Images/Charts Area */}
          {posterData.images && posterData.images.length > 0 && (
            <div 
              className="flex-1 p-2 rounded overflow-auto bg-gray-50 border border-gray-200"
              style={{ minHeight: '120px' }}
            >
              <h3 className="text-xs font-bold mb-1 text-gray-700">Visual Data</h3>
              <ImagesDisplay 
                images={posterData.images}
                designSettings={designSettings}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* Column 4 - Conclusions, Key Takeaways and References */}
        <div className="flex flex-col gap-2">
          {/* Conclusions Section */}
          {activeSections[3] && (
            <div className="flex-1 flex flex-col min-h-0">
              <ContentSection {...activeSections[3]} designSettings={designSettings} />
            </div>
          )}

          {/* Key Takeaways - Vertical Stack */}
          {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
            <KeyTakeawaysSection 
              keypoints={posterData.keypoints}
              keyDescriptions={posterData.keyDescriptions}
              keyVisibility={posterData.keyVisibility}
              designSettings={designSettings}
            />
          )}

          {/* References Section */}
          <ReferencesSection {...referencesSection} designSettings={designSettings} />
        </div>
      </div>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
