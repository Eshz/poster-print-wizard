
import React from 'react';
import PosterPreview from '@/components/PosterPreview';

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
  return (
    <div className="w-full lg:w-2/3 p-4 bg-gray-100 overflow-hidden">
      <div className="bg-white p-6 rounded-lg shadow h-full flex items-center justify-center">
        <div 
          id="poster-preview" 
          className="w-full h-full flex items-center justify-center"
          style={{
            // Create a container that scales based on available space
            transform: 'scale(var(--poster-scale, 1))',
            transformOrigin: 'center'
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
          />
        </div>
      </div>
    </div>
  );
};

export default PosterPreviewArea;
