
import React from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import { getFontClass } from '@/utils/fontUtils';
import ClassicLayout from './ClassicLayout';
import ModernLayout from './ModernLayout';
import FocusLayout from './FocusLayout';
import AcademicModernLayout from './AcademicModernLayout';
import AcademicModernLandscapeLayout from './AcademicModernLandscapeLayout';
import AcademicBlueGridLayout from './AcademicBlueGridLayout';
import MinimalistCleanLayout from './MinimalistCleanLayout';
import DataVisualizationLayout from './DataVisualizationLayout';
import ExecutiveSummaryLayout from './ExecutiveSummaryLayout';

interface EnhancedDesignSettings extends DesignSettings {
  titleFontClass: string;
  contentFontClass: string;
}

interface PosterLayoutRendererProps {
  layout: string;
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const PosterLayoutRenderer: React.FC<PosterLayoutRendererProps> = React.memo(({
  layout,
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const containerClasses = `${getFontClass('content', designSettings.titleFont, designSettings.contentFont)} w-full h-full`;

  const enhancedDesignSettings: EnhancedDesignSettings = {
    ...designSettings,
    titleFontClass: getFontClass('title', designSettings.titleFont, designSettings.contentFont),
    contentFontClass: getFontClass('content', designSettings.titleFont, designSettings.contentFont)
  };

  console.log('PosterLayoutRenderer - Current layout:', layout, 'Design settings layout:', designSettings.layout);

  // Use the layout from designSettings, not the layout prop
  const currentLayout = designSettings.layout;

  switch(currentLayout) {
    case 'academic-modern-landscape':
      return (
        <div className={containerClasses}>
          <AcademicModernLandscapeLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
    case 'blue-grid':
      return (
        <div className={containerClasses}>
          <AcademicBlueGridLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
    case 'minimalist':
      return (
        <div className={containerClasses}>
          <MinimalistCleanLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
    case 'data-viz':
      return (
        <div className={containerClasses}>
          <DataVisualizationLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
    case 'executive':
      return (
        <div className={containerClasses}>
          <ExecutiveSummaryLayout 
            posterData={posterData}
            designSettings={enhancedDesignSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={showKeypoints}
            showQrCode={showQrCode}
          />
        </div>
      );
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
});

PosterLayoutRenderer.displayName = 'PosterLayoutRenderer';

export default PosterLayoutRenderer;
