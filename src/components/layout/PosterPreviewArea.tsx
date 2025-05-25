
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
    <div className="w-full lg:w-2/3 p-4 bg-gray-100 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow h-full flex items-center justify-center min-h-0">
        <div id="poster-preview" className="poster-container w-full h-full flex items-center justify-center">
          <div className="max-w-full max-h-full flex items-center justify-center">
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
    </div>
  );
};

export default PosterPreviewArea;
