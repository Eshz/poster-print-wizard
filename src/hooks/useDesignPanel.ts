
import { useCallback } from 'react';
import { DesignSettings } from '@/types/design';
import { useDesignStyles } from '@/hooks/useDesignStyles';

export const useDesignPanel = (
  designSettings: DesignSettings,
  setDesignSettings: (settings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)) => void
) => {
  const { applyStyle, isStyleSelected, stylesData } = useDesignStyles(
    designSettings, 
    setDesignSettings
  );

  const updateDesignSetting = useCallback((
    key: keyof DesignSettings, 
    value: any
  ) => {
    console.log('useDesignPanel - Updating design setting:', key, value);
    setDesignSettings((prev: DesignSettings) => ({
      ...prev,
      [key]: value
    }));
  }, [setDesignSettings]);

  const resetToDefaults = useCallback(() => {
    console.log('useDesignPanel - Resetting to defaults');
    const defaultSettings: DesignSettings = {
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
    };
    setDesignSettings(defaultSettings);
  }, [setDesignSettings]);

  return {
    applyStyle,
    isStyleSelected,
    stylesData,
    updateDesignSetting,
    resetToDefaults
  };
};
