
import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Image, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImagesSectionProps {
  images: { url: string; visible: boolean; caption: string; upperCaption?: string }[];
  onImagesChange: (images: { url: string; visible: boolean; caption: string; upperCaption?: string }[]) => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ 
  images,
  onImagesChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleToggleVisibility = (index: number) => {
    const newImages = [...images];
    newImages[index].visible = !newImages[index].visible;
    onImagesChange(newImages);
  };
  
  const handleCaptionChange = (index: number, caption: string) => {
    const newImages = [...images];
    newImages[index].caption = caption;
    onImagesChange(newImages);
  };
  
  const handleUpperCaptionChange = (index: number, upperCaption: string) => {
    const newImages = [...images];
    newImages[index].upperCaption = upperCaption;
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
            <div 
              key={index} 
              className="border rounded-md p-3 flex gap-3 items-start"
            >
              <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={image.url} 
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Upper caption"
                  value={image.upperCaption || ''}
                  onChange={(e) => handleUpperCaptionChange(index, e.target.value)}
                  className="text-xs h-8"
                  aria-label={`Upper caption for image ${index + 1}`}
                />
                
                <Input
                  placeholder="Lower caption"
                  value={image.caption}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                  className="text-xs h-8"
                  aria-label={`Lower caption for image ${index + 1}`}
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`show-image-${index}`}
                      checked={image.visible}
                      onCheckedChange={() => handleToggleVisibility(index)}
                      aria-describedby={`show-image-${index}-label`}
                    />
                    <Label htmlFor={`show-image-${index}`} id={`show-image-${index}-label`} className="text-xs">
                      {image.visible ? 'Visible' : 'Hidden'}
                    </Label>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                    className="h-6 w-6 p-0"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="border border-dashed rounded-md p-8 text-center text-gray-500 relative">
            <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Drop more images here or</p>
            <input 
              ref={fileInputRef}
              id="upload-more-images" 
              type="file"
              accept="image/*"
              multiple
              className="hidden" 
              onChange={handleFileUpload}
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              type="button"
              size="sm"
              className="bg-black text-white hover:bg-gray-800 mt-2"
              aria-label="Upload more images"
            >
              <Upload className="h-4 w-4 mr-2" /> Upload Images
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-dashed rounded-md p-8 text-center text-gray-500 relative">
          <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No images uploaded yet</p>
          <p className="text-sm mb-4">Upload images to include in your poster</p>
          <input 
            ref={fileInputRef}
            id="upload-images" 
            type="file"
            accept="image/*"
            multiple
            className="hidden" 
            onChange={handleFileUpload}
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            type="button"
            size="sm"
            className="bg-black text-white hover:bg-gray-800"
            aria-label="Upload images"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Images
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImagesSection;
