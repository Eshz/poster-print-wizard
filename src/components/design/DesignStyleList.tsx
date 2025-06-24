
import React from 'react';
import StyleThumbnail from '@/components/design/StyleThumbnail';
import { PosterStyle } from '@/data/posterStyles';

interface DesignStyleListProps {
  styles: PosterStyle[];
  selectedStyle?: PosterStyle;
  onStyleSelect: (style: PosterStyle) => void;
  isStyleSelected: (style: PosterStyle) => boolean;
}

const DesignStyleList: React.FC<DesignStyleListProps> = ({
  styles,
  onStyleSelect,
  isStyleSelected
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {styles.map((style) => (
        <StyleThumbnail 
          key={style.id} 
          style={style}
          isSelected={isStyleSelected(style)}
          onApplyStyle={onStyleSelect}
        />
      ))}
    </div>
  );
};

export default DesignStyleList;
