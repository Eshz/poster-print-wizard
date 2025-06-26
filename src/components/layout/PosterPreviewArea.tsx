
import React, { useState, useEffect } from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import PosterPreview from '@/components/PosterPreview';
import ZoomControls from '@/components/ZoomControls';
import { useIsMobile } from '@/hooks/use-mobile';

interface PosterPreviewAreaProps {
  posterData: PosterData;
  qrColor: string;
  designSettings: DesignSettings;
  manualZoom?: number;
  onZoomChange?: (zoom: number) => void;
  onContainerScaleChange?: (scale: number) => void;
}

const PosterPreviewArea: React.FC<PosterPreviewAreaProps> = React.memo(({ 
  posterData, 
  qrColor, 
  designSettings,
  manualZoom: externalManualZoom,
  onZoomChange: externalOnZoomChange,
  onContainerScaleChange: externalOnContainerScaleChange
}) => {
  const [internalManualZoom, setInternalManualZoom] = useState<number>(0);
  const [internalFitZoomLevel, setInternalFitZoomLevel] = useState<number>(0);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Use external props if provided, otherwise use internal state
  const manualZoom = externalManualZoom !== undefined ? externalManualZoom : internalManualZoom;
  const fitZoomLevel = internalFitZoomLevel;

  // Set initial zoom to fit-to-window when container scale is calculated
  useEffect(() => {
    if (fitZoomLevel > 0 && !hasInitialized) {
      // On mobile, always start with fit-to-screen
      // On desktop, use fit-to-screen if no external manual zoom is provided
      if (isMobile || externalManualZoom === undefined) {
        if (externalOnZoomChange) {
          externalOnZoomChange(fitZoomLevel);
        } else {
          setInternalManualZoom(fitZoomLevel);
        }
      }
      setHasInitialized(true);
    }
  }, [fitZoomLevel, hasInitialized, externalManualZoom, isMobile, externalOnZoomChange]);

  // Re-fit to screen when orientation changes on mobile
  useEffect(() => {
    if (isMobile && fitZoomLevel > 0) {
      const handleOrientationChange = () => {
        setTimeout(() => {
          if (externalOnZoomChange) {
            externalOnZoomChange(fitZoomLevel);
          } else {
            setInternalManualZoom(fitZoomLevel);
          }
        }, 100);
      };

      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);

      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('resize', handleOrientationChange);
      };
    }
  }, [isMobile, fitZoomLevel, externalOnZoomChange]);

  const handleZoomChange = (zoom: number) => {
    if (externalOnZoomChange) {
      externalOnZoomChange(zoom);
    } else {
      setInternalManualZoom(zoom);
    }
  };

  const handleFitZoomLevelChange = (scale: number) => {
    setInternalFitZoomLevel(scale);
    if (externalOnContainerScaleChange) {
      externalOnContainerScaleChange(scale);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 relative">
      <div className="flex items-center justify-center relative h-full w-full overflow-hidden">
        {/* Desktop-only zoom controls */}
        <div className="hidden lg:block">
          <ZoomControls 
            currentZoom={manualZoom}
            onZoomChange={handleZoomChange}
            fitZoomLevel={fitZoomLevel}
          />
        </div>
        
        <div 
          id="poster-preview" 
          className="w-full h-full flex items-center justify-center p-2 lg:p-5 overflow-hidden"
        >
          <PosterPreview 
            posterData={{
              ...posterData, 
              qrCodeColor: qrColor,
              showKeypoints: posterData.showKeypoints,
              showQrCode: posterData.showQrCode
            }} 
            designSettings={designSettings}
            manualZoom={manualZoom || fitZoomLevel}
            onContainerScaleChange={handleFitZoomLevelChange}
          />
        </div>
      </div>
    </div>
  );
});

PosterPreviewArea.displayName = 'PosterPreviewArea';

export default PosterPreviewArea;
