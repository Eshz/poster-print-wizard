
import React, { useState, useEffect } from 'react';
import PosterPreview from '@/components/PosterPreview';
import ZoomControls from '@/components/ZoomControls';

interface PosterPreviewAreaProps {
  posterData: any;
  qrColor: string;
  designSettings: any;
}

const PosterPreviewArea: React.FC<PosterPreviewAreaProps> = ({ 
  posterData, 
  qrColor, 
  designSettings 
}) => {
  const [manualZoom, setManualZoom] = useState<number>(1);
  const [containerScale, setContainerScale] = useState<number>(1);

  // Default to fit-to-window when container scale is calculated
  useEffect(() => {
    if (containerScale > 0 && containerScale < 1) {
      setManualZoom(containerScale);
    }
  }, [containerScale]);

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-hidden relative">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center relative overflow-auto mx-4 my-4 h-[calc(100vh-120px)] w-[calc(100%-2rem)]">
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
};

export default PosterPreviewArea;
