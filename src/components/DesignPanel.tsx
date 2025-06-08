
import React from 'react';
import { DesignSettings } from '@/types/design';
import { useDesignStyles } from '@/hooks/useDesignStyles';
import StyleThumbnail from '@/components/design/StyleThumbnail';

interface DesignPanelProps {
  designSettings: DesignSettings;
  setDesignSettings: (designSettings: DesignSettings) => void;
  qrColor: string;
  setQrColor: (color: string) => void;
}

const DesignPanel: React.FC<DesignPanelProps> = React.memo(({ 
  designSettings, 
  setDesignSettings, 
  qrColor, 
  setQrColor 
}) => {
  const { applyStyle, isStyleSelected, stylesData } = useDesignStyles(
    designSettings, 
    setDesignSettings
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 border-b bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Design Styles</h2>
        <p className="text-sm text-gray-600">Choose from pre-designed poster styles</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 gap-4">
          {stylesData.map((style) => (
            <StyleThumbnail 
              key={style.id} 
              style={style}
              isSelected={isStyleSelected(style)}
              onApplyStyle={applyStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

DesignPanel.displayName = 'DesignPanel';

export default DesignPanel;
