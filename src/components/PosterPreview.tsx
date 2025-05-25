
import React from 'react';
import ClassicLayout from './poster-preview/ClassicLayout';
import ModernLayout from './poster-preview/ModernLayout';
import FocusLayout from './poster-preview/FocusLayout';
import PosterHeader from './poster-preview/PosterHeader';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { checkContentVisibility } from '@/utils/contentVisibilityChecker';

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
    qrCodeCaption?: string;
    showKeypoints?: boolean;
    showQrCode?: boolean;
    images?: { url: string; visible: boolean; caption: string }[];
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
  const qrCodeUrl = posterData.qrCodeUrl && posterData.showQrCode !== false ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}` : 
    '';

  // Check content visibility
  const visibilityCheck = checkContentVisibility(posterData, designSettings);

  // Apply the selected layout
  const renderLayout = () => {
    switch(designSettings.layout) {
      case 'modern':
        return (
          <ModernLayout 
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={posterData.showKeypoints !== false}
            showQrCode={posterData.showQrCode !== false}
          />
        );
      case 'focus':
        return (
          <FocusLayout 
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={posterData.showKeypoints !== false}
            showQrCode={posterData.showQrCode !== false}
          />
        );
      case 'classic':
      default:
        return (
          <ClassicLayout 
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={posterData.showKeypoints !== false}
            showQrCode={posterData.showQrCode !== false}
          />
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Content Visibility Warning */}
      {!visibilityCheck.isContentVisible && (
        <div className="mb-4 w-full max-w-2xl flex-shrink-0">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Content Visibility Warning:</strong>
              <ul className="mt-2 space-y-1">
                {visibilityCheck.warnings.map((warning, index) => (
                  <li key={index} className="text-sm">• {warning}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm">
                Consider reducing content length, hiding some images, or switching to a different layout.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div
        className="bg-white border border-gray-200 relative overflow-hidden flex flex-col shadow-lg flex-grow"
        style={{ 
          width: '100%',
          height: '100%',
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
          qrCodeUrl={qrCodeUrl}
          showQrCode={posterData.showQrCode !== false}
          qrCodeCaption={posterData.qrCodeCaption}
        />

        {/* Dynamic Content Layout - adding overflow control */}
        <div className="flex-grow overflow-hidden p-2">
          {renderLayout()}
        </div>
      </div>
    </div>
  );
};

export default PosterPreview;
