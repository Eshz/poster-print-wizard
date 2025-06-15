
import React, { useState, useEffect } from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import PosterPreview from '@/components/PosterPreview';
import ZoomControls from '@/components/ZoomControls';

interface PosterPreviewAreaProps {
  posterData: PosterData;
  qrColor: string;
  designSettings: DesignSettings;
}

const PosterPreviewArea: React.FC<PosterPreviewAreaProps> = React.memo(({ 
  posterData, 
  qrColor, 
  designSettings 
}) => {
  const [manualZoom, setManualZoom] = useState<number>(0); // Start at 0 to trigger fit-to-window
  const [fitZoomLevel, setFitZoomLevel] = useState<number>(0);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  // Set initial zoom to fit-to-window when container scale is calculated
  useEffect(() => {
    if (fitZoomLevel > 0 && !hasInitialized) {
      setManualZoom(fitZoomLevel); // Default to fit-to-window
      setHasInitialized(true);
    }
  }, [fitZoomLevel, hasInitialized]);

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  const handleFitZoomLevelChange = (scale: number) => {
    setFitZoomLevel(scale);
  };

  return (
    <div className="flex-1 bg-gray-100 relative fixed right-0 top-0 bottom-0 lg:static">
      <div className="flex items-center justify-center relative h-screen w-full overflow-hidden">
        <ZoomControls 
          currentZoom={manualZoom}
          onZoomChange={handleZoomChange}
          fitZoomLevel={fitZoomLevel}
        />
        
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
            manualZoom={manualZoom || fitZoomLevel} // Use fitZoomLevel as fallback
            onContainerScaleChange={handleFitZoomLevelChange}
          />
        </div>
      </div>
    </div>
  );
});

PosterPreviewArea.displayName = 'PosterPreviewArea';

export default PosterPreviewArea;
