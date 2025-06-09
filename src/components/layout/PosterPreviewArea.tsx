
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
  const [containerScale, setContainerScale] = useState<number>(0);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  // Set initial zoom to fit-to-window when container scale is calculated
  useEffect(() => {
    if (containerScale > 0 && !hasInitialized) {
      setManualZoom(containerScale); // Default to fit-to-window
      setHasInitialized(true);
    }
  }, [containerScale, hasInitialized]);

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  const handleContainerScaleChange = (scale: number) => {
    setContainerScale(scale);
  };

  return (
    <div className="flex-1 bg-gray-100 relative">
      <div className="flex items-center justify-center relative h-screen w-full">
        <ZoomControls 
          currentZoom={manualZoom}
          onZoomChange={handleZoomChange}
          containerScale={containerScale}
        />
        
        <div 
          id="poster-preview" 
          className="w-full h-full flex items-center justify-center p-5"
        >
          <PosterPreview 
            posterData={{
              ...posterData, 
              qrCodeColor: qrColor,
              showKeypoints: posterData.showKeypoints,
              showQrCode: posterData.showQrCode
            }} 
            designSettings={designSettings}
            manualZoom={manualZoom || containerScale} // Use containerScale as fallback
            onContainerScaleChange={handleContainerScaleChange}
          />
        </div>
      </div>
    </div>
  );
});

PosterPreviewArea.displayName = 'PosterPreviewArea';

export default PosterPreviewArea;
