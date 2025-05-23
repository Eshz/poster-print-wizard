
import React from 'react';

interface ImagesDisplayProps {
  images: { url: string; visible: boolean; caption: string }[];
  designSettings: any;
  className?: string;
}

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({
  images,
  designSettings,
  className = ""
}) => {
  // Filter only visible images
  const visibleImages = images.filter(img => img.visible);
  
  if (visibleImages.length === 0) return null;
  
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {visibleImages.map((image, index) => (
        <div 
          key={index}
          className="flex flex-col items-center space-y-1 w-full"
          style={{ 
            backgroundColor: designSettings.sectionBgColor,
            borderRadius: '0.375rem',
            padding: '0.5rem'
          }}
        >
          {/* Caption above the image with title font */}
          {image.caption && (
            <p 
              className="text-sm font-semibold text-center px-2 py-1 w-full"
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              {image.caption}
            </p>
          )}
          
          <div className="rounded overflow-hidden w-full">
            <img 
              src={image.url} 
              alt={image.caption || `Image ${index + 1}`}
              className="w-full object-contain max-h-64" // Keeping original height constraint
            />
          </div>
          
          {/* Caption below the image with content font */}
          {image.caption && (
            <p 
              className="text-xs text-center px-2 py-1 w-full"
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagesDisplay;
