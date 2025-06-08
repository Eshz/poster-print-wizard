
import React, { useMemo } from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import PosterHeader from './poster-preview/PosterHeader';
import ContentVisibilityWarning from './poster-preview/ContentVisibilityWarning';
import PosterLayoutRenderer from './poster-preview/PosterLayoutRenderer';
import { checkContentVisibility } from '@/utils/contentVisibilityChecker';
import { usePosterScaling } from '@/hooks/usePosterScaling';
import { A0_WIDTH_PX, A0_HEIGHT_PX, POSTER_UI_WIDTH, POSTER_UI_HEIGHT } from '@/utils/posterConstants';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PosterPreviewProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  manualZoom?: number;
  onContainerScaleChange?: (scale: number) => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = React.memo(({ 
  posterData, 
  designSettings, 
  manualZoom = 1,
  onContainerScaleChange 
}) => {
  const { containerRef, posterRef } = usePosterScaling({
    manualZoom,
    onContainerScaleChange,
    posterUIWidth: POSTER_UI_WIDTH,
    posterUIHeight: POSTER_UI_HEIGHT,
    a0WidthPx: A0_WIDTH_PX,
    a0HeightPx: A0_HEIGHT_PX
  });

  // QR Code generation - memoized for performance
  const qrCodeUrl = useMemo(() => {
    if (!posterData.qrCodeUrl || posterData.showQrCode === false) return '';
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}`;
  }, [posterData.qrCodeUrl, posterData.showQrCode, posterData.qrCodeColor]);

  // Check content visibility - memoized for performance
  const visibilityCheck = useMemo(() => 
    checkContentVisibility(posterData, designSettings),
    [posterData, designSettings]
  );

  // A0 aspect ratio calculation - memoized
  const aspectRatio = useMemo(() => POSTER_UI_HEIGHT / POSTER_UI_WIDTH, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full">
      {/* Content Visibility Warning */}
      <ContentVisibilityWarning 
        isVisible={visibilityCheck.isContentVisible}
        warnings={visibilityCheck.warnings}
      />

      <div style={{ width: `${POSTER_UI_WIDTH}px` }}>
        <AspectRatio ratio={1/aspectRatio}>
          <div
            id="poster-content"
            ref={posterRef}
            className="bg-white border border-gray-200 relative overflow-hidden flex flex-col shadow-lg w-full h-full"
            style={{ 
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
              <PosterLayoutRenderer
                layout={designSettings.layout}
                posterData={posterData}
                designSettings={designSettings}
                qrCodeUrl={qrCodeUrl}
                showKeypoints={posterData.showKeypoints !== false}
                showQrCode={posterData.showQrCode !== false}
              />
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
});

PosterPreview.displayName = 'PosterPreview';

export default PosterPreview;
