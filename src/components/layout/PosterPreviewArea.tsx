
import React, { useState, useEffect } from 'react';
import PosterPreview from '@/components/PosterPreview';
import ZoomControls from '@/components/ZoomControls';
import { A0_WIDTH_PX, POSTER_UI_WIDTH, POSTER_UI_HEIGHT } from '@/utils/posterConstants';

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

  // Calculate the actual display dimensions based on zoom
  const uiToA0Scale = A0_WIDTH_PX / POSTER_UI_WIDTH;
  const actualDisplayWidth = POSTER_UI_WIDTH * manualZoom * uiToA0Scale;
  const actualDisplayHeight = POSTER_UI_HEIGHT * manualZoom * uiToA0Scale;

  // Add minimal padding around the poster
  const containerPadding = 20;
  const containerWidth = actualDisplayWidth + (containerPadding * 2);
  const containerHeight = actualDisplayHeight + (containerPadding * 2);

  return (
    <div className="flex-1 bg-gray-100 overflow-hidden relative">
      <div 
        className="bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center relative overflow-auto mx-4 my-4"
        style={{
          width: `calc(100% - 2rem)`,
          height: `calc(100% - 2rem)`,
          minWidth: `${containerWidth}px`,
          minHeight: `${containerHeight}px`
        }}
      >
        <ZoomControls 
          currentZoom={manualZoom}
          onZoomChange={handleZoomChange}
          containerScale={containerScale}
        />
        
        <div 
          id="poster-preview" 
          className="flex items-center justify-center overflow-auto"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            padding: `${containerPadding}px`
          }}
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
