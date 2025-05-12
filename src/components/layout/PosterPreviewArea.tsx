
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
      <div className="bg-white p-2 rounded-lg shadow">
        <div id="poster-preview" style={{ width: '100%', height: 'auto' }}>
          <PosterPreview 
            posterData={{...posterData, qrCodeColor: qrColor}} 
            designSettings={designSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default PosterPreviewArea;
