
import React from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileFloatingButton from '@/components/layout/MobileFloatingButton';
import { useProjects } from '@/contexts/ProjectContext';

const Index = () => {
  const { 
    currentProject, 
    updatePosterData, 
    updateDesignSettings, 
    updateQrColor
  } = useProjects();
  
  const [activePanel, setActivePanel] = React.useState<'content' | 'design'>('content');
  
  // Extract values from the current project
  const posterData = currentProject?.posterData || {};
  const designSettings = currentProject?.designSettings || {};
  const qrColor = currentProject?.qrColor || "#000000";
  
  // Create state setters that also update the project context
  const setPosterData = (newPosterData: any) => {
    updatePosterData(typeof newPosterData === 'function' 
      ? newPosterData(posterData) 
      : newPosterData);
  };
  
  const setDesignSettings = (newSettings: any) => {
    updateDesignSettings(typeof newSettings === 'function' 
      ? newSettings(designSettings) 
      : newSettings);
  };
  
  const setQrColor = (newColor: string) => {
    updateQrColor(newColor);
  };
  
  const handleExportPDF = () => {
    exportToPDF('poster-content');
  };
  
  return (
    <div className="flex lg:flex-row min-h-[calc(100vh-73px)] bg-gray-50">
      {/* Mobile view tabs */}
      <MobileTabs 
        posterData={posterData}
        setPosterData={setPosterData}
        designSettings={designSettings}
        setDesignSettings={setDesignSettings}
        qrColor={qrColor}
        setQrColor={setQrColor}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        handleExportPDF={handleExportPDF}
      />
      
      {/* Desktop sidebar */}
      <DesktopSidebar 
        posterData={posterData}
        setPosterData={setPosterData}
        designSettings={designSettings}
        setDesignSettings={setDesignSettings}
        qrColor={qrColor}
        setQrColor={setQrColor}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        handleExportPDF={handleExportPDF}
      />
      
      {/* Preview Area */}
      <PosterPreviewArea 
        posterData={posterData}
        qrColor={qrColor}
        designSettings={designSettings}
      />
      
      {/* Mobile-only Design Panel in Sheet (sidebar) */}
      <MobileFloatingButton 
        designSettings={designSettings}
        setDesignSettings={setDesignSettings}
        qrColor={qrColor}
        setQrColor={setQrColor}
      />
    </div>
  );
};

export default Index;
