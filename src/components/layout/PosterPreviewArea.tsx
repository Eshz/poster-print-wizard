
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
  const [manualZoom, setManualZoom] = useState<number>(0.25); // Start at 25% since A0 is very large
  const [containerScale, setContainerScale] = useState<number>(1);

  // Set initial zoom to fit-to-window when container scale is calculated
  useEffect(() => {
    if (containerScale > 0 && manualZoom === 0.25) {
      setManualZoom(containerScale);
    }
  }, [containerScale, manualZoom]);

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-hidden relative">
      <div className="flex items-center justify-center relative overflow-auto mx-4 my-4 h-[calc(100vh-120px)] w-[calc(100%-2rem)]">
        <ZoomControls 
          currentZoom={manualZoom}
          onZoomChange={handleZoomChange}
          containerScale={containerScale}
        />
        
        <div 
          id="poster-preview" 
          className="w-full h-full flex items-center justify-center overflow-auto p-5"
        >
          <PosterPreview 
            posterData={{
              ...posterData, 
              qrCodeColor: qrColor,
              showKeypoints: posterData.showKeypoints,
              showQrCode: posterData.showQrCode
            }} 
            designSettings={designSettings}
            manualZoom={manualZoom}
            onContainerScaleChange={setContainerScale}
          />
        </div>
      </div>
    </div>
  );
});

PosterPreviewArea.displayName = 'PosterPreviewArea';

export default PosterPreviewArea;
