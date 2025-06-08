
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PosterStyle } from '@/data/posterStyles';

interface StyleThumbnailProps {
  style: PosterStyle;
  isSelected: boolean;
  onApplyStyle: (style: PosterStyle) => void;
}

const StyleThumbnail: React.FC<StyleThumbnailProps> = React.memo(({ 
  style, 
  isSelected, 
  onApplyStyle 
}) => {
  return (
    <Button
      variant="outline"
      className={`h-auto p-0 border-2 hover:border-blue-500 transition-all duration-200 overflow-hidden relative ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : ''
      }`}
      onClick={() => onApplyStyle(style)}
    >
      {isSelected && (
        <div className="absolute top-1 right-1 z-10 bg-blue-500 text-white rounded-full p-1">
          <Check className="h-3 w-3" />
        </div>
      )}
      
      <div className="w-full h-24 flex flex-col">
        {/* Header */}
        <div 
          className="h-6 w-full flex items-center justify-center text-xs font-bold"
          style={{ 
            backgroundColor: style.headerBgColor, 
            color: style.headerTextColor,
            fontFamily: style.titleFont === 'playfair' ? 'Playfair Display' : 
                       style.titleFont === 'merriweather' ? 'Merriweather' :
                       style.titleFont === 'montserrat' ? 'Montserrat' :
                       style.titleFont === 'raleway' ? 'Raleway' : 'sans-serif'
          }}
        >
          Title
        </div>
        
        {/* Content Area */}
        <div 
          className="flex-1 p-1 flex gap-1"
          style={{ backgroundColor: style.sectionBgColor }}
        >
          {style.layout === 'classic' && (
            <>
              <div className="w-1/2 h-full bg-gray-200 rounded-sm"></div>
              <div className="w-1/2 h-full bg-gray-200 rounded-sm"></div>
            </>
          )}
          {style.layout === 'modern' && (
            <>
              <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
              <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
              <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
            </>
          )}
          {style.layout === 'focus' && (
            <div className="w-2/3 h-full bg-gray-200 rounded-sm mx-auto"></div>
          )}
        </div>
        
        {/* Style Info */}
        <div className="p-1 text-xs text-center bg-white border-t">
          <div className="font-medium">{style.name}</div>
          <Badge variant="secondary" className="text-xs mt-1">
            {style.category}
          </Badge>
        </div>
      </div>
    </Button>
  );
});

StyleThumbnail.displayName = 'StyleThumbnail';

export default StyleThumbnail;
