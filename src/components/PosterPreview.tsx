
import React, { useEffect, useRef } from 'react';
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
  manualZoom?: number;
  onContainerScaleChange?: (scale: number) => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = ({ 
  posterData, 
  designSettings, 
  manualZoom = 1,
  onContainerScaleChange 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  // QR Code generation
  const qrCodeUrl = posterData.qrCodeUrl && posterData.showQrCode !== false ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}` : 
    '';

  // Check content visibility
  const visibilityCheck = checkContentVisibility(posterData, designSettings);

  // Calculate container scale and apply manual zoom
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !posterRef.current) return;

      const container = containerRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const posterWidth = 800; // A0 poster width
      const posterHeight = 1131; // A0 poster height

      // Calculate scale to fit in container (this is just for reference, not applied)
      const scaleX = (containerRect.width - 48) / posterWidth;
      const scaleY = (containerRect.height - 48) / posterHeight;
      const containerScale = Math.min(scaleX, scaleY, 1);

      // Apply manual zoom (1.0 = actual A0 size)
      posterRef.current.style.transform = `scale(${manualZoom})`;

      // Notify parent of container scale for reference
      if (onContainerScaleChange) {
        onContainerScaleChange(containerScale);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [manualZoom, onContainerScaleChange]);

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
    <div ref={containerRef} className="flex flex-col items-center justify-center">
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
        ref={posterRef}
        className="bg-white border border-gray-200 relative overflow-hidden flex flex-col shadow-lg"
        style={{ 
          width: '800px', // A0 width
          height: '1131px', // A0 height
          transformOrigin: 'center'
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
