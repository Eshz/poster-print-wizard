
import React from 'react';
import { DesignSettings } from '@/types/design';
import { useDesignPanel } from '@/hooks/useDesignPanel';
import { useAnalytics } from '@/hooks/useAnalytics';
import DesignStyleList from '@/components/design/DesignStyleList';

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
  const { 
    applyStyle, 
    isStyleSelected, 
    stylesData,
    resetToDefaults
  } = useDesignPanel(designSettings, setDesignSettings);

  const handleApplyStyle = (style: any) => {
    console.log('Applying style:', style.name, 'with layout:', style.layout);
    applyStyle(style);
    trackDesignStyleSelected(style.name);
    trackLayoutSelected(style.layout);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50" style={{ width: '320px', minWidth: '320px', maxWidth: '320px' }}>
      <div className="p-4 border-b bg-white flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Design Styles</h2>
          <button
            onClick={resetToDefaults}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-gray-600">Choose from pre-designed poster styles</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <DesignStyleList
          styles={stylesData}
          onStyleSelect={handleApplyStyle}
          isStyleSelected={isStyleSelected}
        />
      </div>
    </div>
  );
});

DesignPanel.displayName = 'DesignPanel';

export default DesignPanel;
