
import React, { createContext, useContext } from 'react';
import { useLayoutManager } from '@/hooks/useLayoutManager';
import { PosterData } from '@/types/project';

interface LayoutContextType {
  contentDensity: 'low' | 'medium' | 'high';
  layoutConfig: {
    hasImages: boolean;
    visibleImages: any[];
    shouldUseThreeColumn: boolean;
    keyPointCols: string;
    contentDensity: 'low' | 'medium' | 'high';
  };
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

interface LayoutProviderProps {
  posterData: PosterData;
  children: React.ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  posterData,
  children
}) => {
  const visibleKeyPoints = posterData.keypoints?.filter((_, index) => 
    posterData.keyVisibility?.[index] !== false
  ) || [];
  
  const { contentDensity, layoutConfig } = useLayoutManager(posterData, visibleKeyPoints);

  const value: LayoutContextType = {
    contentDensity,
    layoutConfig
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};
