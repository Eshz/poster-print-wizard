
import React, { useState } from 'react';
import { ImageItem } from './ImageItem';
import { UploadArea } from '@/components/ui/upload-area';

interface ImagesSectionProps {
  images: { url: string; visible: boolean; caption: string; upperCaption?: string }[];
  onImagesChange: (images: { url: string; visible: boolean; caption: string; upperCaption?: string }[]) => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ 
  images,
  onImagesChange 
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...images];
      
      Array.from(e.target.files).forEach(file => {
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`File ${file.name} exceeds 5MB size limit`);
          return;
        }
        
        // Check file type
        if (!file.type.includes('image/')) {
          setError(`File ${file.name} is not an image`);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push({
              url: event.target.result as string,
              visible: true,
              caption: '',
              upperCaption: ''
            });
            onImagesChange(newImages);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    
    // Reset the input
    e.target.value = '';
  };

  const handleImageUpdate = (index: number, updates: Partial<{ url: string; visible: boolean; caption: string; upperCaption: string }>) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], ...updates };
    onImagesChange(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      
      {images.length > 0 ? (
        <div className="space-y-3">
          {images.map((image, index) => (
            <ImageItem
              key={index}
              index={index}
              image={image}
              onUpperCaptionChange={(value) => handleImageUpdate(index, { upperCaption: value })}
              onCaptionChange={(value) => handleImageUpdate(index, { caption: value })}
              onVisibilityToggle={() => handleImageUpdate(index, { visible: !image.visible })}
              onRemove={() => handleRemoveImage(index)}
            />
          ))}
          
          <UploadArea 
            onFileUpload={handleFileUpload}
            hasImages={true}
          />
        </div>
      ) : (
        <UploadArea 
          onFileUpload={handleFileUpload}
          hasImages={false}
        />
      )}
    </div>
  );
};

export default ImagesSection;
