
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
  // Apply font family classes to the container based on design settings
  const getFontClass = (fontType: 'title' | 'content') => {
    const font = fontType === 'title' ? designSettings.titleFont : designSettings.contentFont;
    
    switch(font) {
      case 'playfair': return 'font-playfair';
      case 'roboto': return 'font-roboto';
      case 'merriweather': return 'font-merriweather';
      case 'montserrat': return 'font-montserrat';
      case 'opensans': return 'font-opensans';
      case 'lora': return 'font-lora';
      case 'raleway': return 'font-raleway';
      default: return 'font-roboto';
    }
  };

  const containerClasses = `${getFontClass('content')} w-full h-full`;

  const enhancedDesignSettings = {
    ...designSettings,
    titleFontClass: getFontClass('title'),
    contentFontClass: getFontClass('content')
  };

  switch(layout) {
    case 'modern':
      return (
        <div className={containerClasses}>
          <ModernLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
    case 'focus':
      return (
        <div className={containerClasses}>
          <FocusLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
    case 'classic':
    default:
      return (
        <div className={containerClasses}>
          <ClassicLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
  }
};

export default PosterLayoutRenderer;
