
import { useCallback } from 'react';
import { DesignSettings } from '@/types/design';
import { useDesignStyles } from '@/hooks/useDesignStyles';

export const useDesignPanel = (
  designSettings: DesignSettings,
  setDesignSettings: (settings: DesignSettings) => void
) => {
  const { applyStyle, isStyleSelected, stylesData } = useDesignStyles(
    designSettings, 
    setDesignSettings
  );

  const updateDesignSetting = useCallback((
    key: keyof DesignSettings, 
    value: any
  ) => {
    setDesignSettings({
      ...designSettings,
      [key]: value
    });
  }, [designSettings, setDesignSettings]);

  const resetToDefaults = useCallback(() => {
    setDesignSettings({
      layout: 'academic-modern-landscape',
      titleFont: 'merriweather',
      contentFont: 'roboto',
      headerBgColor: '#FFFFFF',
      headerTextColor: '#1E3A8A',
      sectionBgColor: '#3B82F6',
      sectionTitleColor: '#FFFFFF',
      sectionTextColor: '#FFFFFF',
      keyPointsBgColor: '#EFF6FF',
      keyPointsTextColor: '#1E3A8A',
    });
  }, [setDesignSettings]);

  return {
    applyStyle,
    isStyleSelected,
    stylesData,
    updateDesignSetting,
    resetToDefaults
  };
};
