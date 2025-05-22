
import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Image, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImagesSectionProps {
  images: { url: string; visible: boolean; caption: string }[];
  onImagesChange: (images: { url: string; visible: boolean; caption: string }[]) => void;
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
              caption: ''
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
  
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="upload-images" className="font-medium">Upload Images</Label>
        <div>
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
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Images
          </Button>
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="border rounded-md p-2 space-y-2"
            >
              <div className="aspect-video relative bg-gray-100 rounded overflow-hidden">
                <img 
                  src={image.url} 
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder="Image caption"
                  value={image.caption}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                  className="text-sm"
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`show-image-${index}`}
                      checked={image.visible}
                      onCheckedChange={() => handleToggleVisibility(index)}
                    />
                    <Label htmlFor={`show-image-${index}`} className="text-sm">
                      {image.visible ? 'Visible' : 'Hidden'}
                    </Label>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-md p-8 text-center text-gray-500">
          <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No images uploaded yet</p>
          <p className="text-sm">Upload images to include in your poster</p>
        </div>
      )}
    </div>
  );
};

export default ImagesSection;
