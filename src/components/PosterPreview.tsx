
import React from 'react';
import ClassicLayout from './poster-preview/ClassicLayout';
import ModernLayout from './poster-preview/ModernLayout';
import FocusLayout from './poster-preview/FocusLayout';
import PosterHeader from './poster-preview/PosterHeader';

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
        return (
          <ModernLayout 
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
          />
        );
      case 'focus':
        return (
          <FocusLayout 
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
          />
        );
      case 'classic':
      default:
        return (
          <ClassicLayout 
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
          />
        );
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 relative overflow-hidden flex flex-col"
      style={{ 
        width: '100%',
        height: '1131px', // Fixed height based on A0 aspect ratio (1:1.414) scaled down
        maxWidth: '800px', // Fixed width
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        aspectRatio: '1/1.414' // A0 aspect ratio
      }}
    >
      {/* Header Section */}
      <PosterHeader
        title={posterData.title}
        authors={posterData.authors}
        school={posterData.school}
        contact={posterData.contact}
        designSettings={designSettings}
      />

      {/* Dynamic Content Layout - adding overflow control */}
      <div className="flex-grow overflow-hidden p-2">
        {renderLayout()}
      </div>
    </div>
  );
};

export default PosterPreview;
