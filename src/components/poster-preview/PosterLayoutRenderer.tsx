
import React from 'react';
import ClassicLayout from './ClassicLayout';
import ModernLayout from './ModernLayout';
import FocusLayout from './FocusLayout';

interface PosterLayoutRendererProps {
  layout: string;
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const PosterLayoutRenderer: React.FC<PosterLayoutRendererProps> = ({
  layout,
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  switch(layout) {
    case 'modern':
      return (
        <ModernLayout 
          posterData={posterData}
          designSettings={designSettings}
          qrCodeUrl={qrCodeUrl}
          showKeypoints={showKeypoints}
          showQrCode={showQrCode}
        />
      );
    case 'focus':
      return (
        <FocusLayout 
          posterData={posterData}
          designSettings={designSettings}
          qrCodeUrl={qrCodeUrl}
          showKeypoints={showKeypoints}
          showQrCode={showQrCode}
        />
      );
    case 'classic':
    default:
      return (
        <ClassicLayout 
          posterData={posterData}
          designSettings={designSettings}
          qrCodeUrl={qrCodeUrl}
          showKeypoints={showKeypoints}
          showQrCode={showQrCode}
        />
      );
  }
};

export default PosterLayoutRenderer;
