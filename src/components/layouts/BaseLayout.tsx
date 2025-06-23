
import React from 'react';
import { PosterData, DesignSettings } from '@/types/project';

export interface BaseLayoutProps {
  posterData: PosterData;
  designSettings: DesignSettings & {
    titleFontClass: string;
    contentFontClass: string;
  };
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

export interface LayoutConfig {
  hasImages: boolean;
  visibleImages: any[];
  shouldUseThreeColumn: boolean;
  keyPointCols: string;
  contentDensity: 'low' | 'medium' | 'high';
}

export const useLayoutConfig = (posterData: PosterData): LayoutConfig => {
  const hasImages = posterData.images && posterData.images.filter(img => img.visible).length > 0;
  const visibleImages = posterData.images?.filter(img => img.visible) || [];
  
  const sections = [
    posterData?.introduction || "",
    posterData?.methods || "",
    posterData?.findings || "",
    posterData?.conclusions || "",
    posterData?.references || ""
  ];
  
  const totalContent = sections.reduce((acc, section) => acc + section.length, 0);
  const contentDensity = totalContent > 2000 ? 'high' : totalContent > 1000 ? 'medium' : 'low';
  
  return {
    hasImages,
    visibleImages,
    shouldUseThreeColumn: hasImages && visibleImages.length > 2,
    keyPointCols: contentDensity === 'high' ? 'grid-cols-4' : 
                 contentDensity === 'medium' ? 'grid-cols-3' : 'grid-cols-2',
    contentDensity
  };
};

export const BaseLayout: React.FC<React.PropsWithChildren<BaseLayoutProps>> = ({ children }) => {
  return <>{children}</>;
};
