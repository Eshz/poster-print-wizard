import React from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import { getFontClass } from '@/utils/fontUtils';
import ClassicLayout from './ClassicLayout';
import ModernLayout from './ModernLayout';
import FocusLayout from './FocusLayout';
import AcademicModernLayout from './AcademicModernLayout';
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

  // Check if this is the Academic Modern style specifically
  const isAcademicModern = designSettings.headerBgColor === "#FFFFFF" && 
                          designSettings.sectionBgColor === "#3B82F6" &&
                          designSettings.keyPointsBgColor === "#EFF6FF";

  if (isAcademicModern) {
    return (
      <div className={containerClasses}>
        <AcademicModernLayout 
          posterData={posterData}
          designSettings={enhancedDesignSettings}
          qrCodeUrl={qrCodeUrl}
          showKeypoints={showKeypoints}
          showQrCode={showQrCode}
        />
      </div>
    );
  }

  switch(layout) {
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
