
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
      <div className="bg-white p-4 rounded-lg shadow h-full flex items-center justify-center">
        <div id="poster-preview" className="poster-container">
          <div className="w-[800px] min-w-[800px] max-w-[800px] mx-auto"> {/* Added mx-auto for centering */}
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
