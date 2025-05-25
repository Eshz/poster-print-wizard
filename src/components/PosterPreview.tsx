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
  manualZoom?: number | null;
  onAutoZoomChange?: (zoom: number) => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = ({ 
  posterData, 
  designSettings, 
  manualZoom = null, 
  onAutoZoomChange 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  // QR Code generation
  const qrCodeUrl = posterData.qrCodeUrl && posterData.showQrCode !== false ? 
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}` : 
    '';

  // Check content visibility
  const visibilityCheck = checkContentVisibility(posterData, designSettings);

  // Calculate scale to fit poster in container
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !posterRef.current) return;

      const container = containerRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const posterWidth = 800; // Fixed poster width
      const posterHeight = 1131; // Fixed poster height (A0 ratio)

      // Calculate scale to fit both width and height
      const scaleX = (containerRect.width - 48) / posterWidth; // Account for padding
      const scaleY = (containerRect.height - 48) / posterHeight; // Account for padding
      const autoScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%

      // Use manual zoom if provided, otherwise use auto-calculated scale
      const finalScale = manualZoom || autoScale;

      // Apply scale to the poster
      posterRef.current.style.transform = `scale(${finalScale})`;

      // Notify parent of auto zoom change
      if (onAutoZoomChange && !manualZoom) {
        onAutoZoomChange(autoScale);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [manualZoom, onAutoZoomChange]);

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
          width: '800px', // Fixed width
          height: '1131px', // Fixed height (A0 aspect ratio)
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
