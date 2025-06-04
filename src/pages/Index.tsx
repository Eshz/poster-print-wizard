
import React, { useEffect } from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileFloatingButton from '@/components/layout/MobileFloatingButton';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectSwitcher from '@/components/ProjectSwitcher';

const Index = () => {
  const { 
    currentProject, 
    updatePosterData, 
    updateDesignSettings, 
    updateQrColor, 
    saveCurrentProject 
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
  
  // Auto-save when poster data or design settings change
  useEffect(() => {
    // Use a debounce to avoid too many saves
    const timeout = setTimeout(() => {
      if (currentProject) {
        saveCurrentProject();
      }
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [posterData, designSettings, qrColor]);
  
  const handleExportPDF = () => {
    exportToPDF('poster-preview');
  };
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
