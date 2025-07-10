import React from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import { PdfClassicLayout } from './layouts/PdfClassicLayout';
import { PdfModernLayout } from './layouts/PdfModernLayout';
import { PdfAcademicLayout } from './layouts/PdfAcademicLayout';

interface PdfLayoutRouterProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  styles: any;
}

export const PdfLayoutRouter: React.FC<PdfLayoutRouterProps> = ({ 
  posterData, 
  designSettings, 
  styles 
}) => {
  // Determine layout based on design settings
  const getLayoutComponent = () => {
    // Check if this is the Academic Modern style
    const isAcademicModern = designSettings.headerBgColor === "#FFFFFF" && 
                            designSettings.sectionBgColor === "#3B82F6" &&
                            designSettings.keyPointsBgColor === "#EFF6FF";

    if (isAcademicModern) {
      return PdfAcademicLayout;
    }

    // Map layout strings to PDF components
    switch(designSettings.layout) {
      case 'modern':
      case 'minimalist':
      case 'data-viz':
      case 'executive':
        return PdfModernLayout;
      case 'focus':
        return PdfAcademicLayout;
      case 'classic':
      default:
        return PdfClassicLayout;
    }
  };

  const LayoutComponent = getLayoutComponent();

  return (
    <LayoutComponent 
      posterData={posterData}
      designSettings={designSettings}
      styles={styles}
    />
  );
};