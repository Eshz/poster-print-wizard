
import React from 'react';
import ImagesSection from './ImagesSection';
import { Image } from "lucide-react";
import { PosterImage } from '@/types/poster';

interface ImagesGroupProps {
  posterData: any;
  handleImagesChange: (images: PosterImage[]) => void;
}

const ImagesGroup: React.FC<ImagesGroupProps> = ({
  posterData,
  handleImagesChange
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
          <Image className="h-3 w-3 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Images</h3>
      </div>
      
      <div className="pl-9">
        <ImagesSection 
          images={posterData.images || []}
          onImagesChange={handleImagesChange}
        />
      </div>
    </div>
  );
};

export default ImagesGroup;
