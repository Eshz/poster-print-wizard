
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
  const [manualZoom, setManualZoom] = useState<number>(1); // Start at 100% (actual size)
  const [containerScale, setContainerScale] = useState<number>(1);

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  return (
    <div className="w-full lg:w-2/3 p-4 bg-gray-100 overflow-hidden relative">
      <div className="bg-white p-6 rounded-lg shadow h-full flex items-center justify-center relative overflow-auto">
        <ZoomControls 
          currentZoom={manualZoom}
          onZoomChange={handleZoomChange}
          containerScale={containerScale}
        />
        
        <div 
          id="poster-preview" 
          className="w-full h-full flex items-center justify-center overflow-auto"
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
