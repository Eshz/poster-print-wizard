
import React, { useState, useEffect } from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import PosterPreview from '@/components/PosterPreview';
import ZoomControls from '@/components/ZoomControls';

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

  // Use external props if provided, otherwise use internal state
  const manualZoom = externalManualZoom !== undefined ? externalManualZoom : internalManualZoom;
  const fitZoomLevel = internalFitZoomLevel;

  // Set initial zoom to fit-to-window when container scale is calculated
  useEffect(() => {
    if (fitZoomLevel > 0 && !hasInitialized && externalManualZoom === undefined) {
      setInternalManualZoom(fitZoomLevel);
      setHasInitialized(true);
    }
  }, [fitZoomLevel, hasInitialized, externalManualZoom]);

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
          className="w-full h-full flex items-center justify-center p-5 overflow-hidden"
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
