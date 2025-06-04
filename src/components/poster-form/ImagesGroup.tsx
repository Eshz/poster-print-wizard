
import React from 'react';
import ImagesSection from './ImagesSection';
import { Image } from "lucide-react";

interface ImagesGroupProps {
  posterData: any;
  handleImagesChange: (images: { url: string; visible: boolean; caption: string }[]) => void;
}

const ImagesGroup: React.FC<ImagesGroupProps> = ({
  posterData,
  handleImagesChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
            <Image className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Images</h3>
        </div>
      </div>
      
      <div className="p-6">
        <ImagesSection 
          images={posterData.images || []}
          onImagesChange={handleImagesChange}
        />
      </div>
    </div>
  );
};

export default ImagesGroup;
