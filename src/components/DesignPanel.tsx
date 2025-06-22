
import React from 'react';
import { DesignSettings } from '@/types/design';
import { useDesignStyles } from '@/hooks/useDesignStyles';
import { useAnalytics } from '@/hooks/useAnalytics';
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
  const { trackDesignStyleSelected, trackLayoutSelected } = useAnalytics();
  const { applyStyle, isStyleSelected, stylesData } = useDesignStyles(
    designSettings, 
    setDesignSettings
  );

  const handleApplyStyle = (style: any) => {
    console.log('Applying style:', style.name, 'with layout:', style.layout);
    applyStyle(style);
    trackDesignStyleSelected(style.name);
    trackLayoutSelected(style.layout);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 min-w-0">
      <div className="p-4 border-b bg-white flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Design Styles</h2>
        <p className="text-sm text-gray-600">Choose from pre-designed poster styles</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stylesData.map((style) => (
            <StyleThumbnail 
              key={style.id} 
              style={style}
              isSelected={isStyleSelected(style)}
              onApplyStyle={handleApplyStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

DesignPanel.displayName = 'DesignPanel';

export default DesignPanel;
