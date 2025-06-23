
import React from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileTopNavbar from '@/components/layout/MobileTopNavbar';
import MobileSidebarOverlay from '@/components/layout/MobileSidebarOverlay';
import { useProjects } from '@/contexts/ProjectContext';
import { usePosterData } from '@/hooks/usePosterData';
import { PosterData, DesignSettings } from '@/types/project';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { 
    currentProject, 
    updateDesignSettings, 
    updateQrColor
  } = useProjects();
  
  const { posterData, updatePosterData } = usePosterData();
  
  const [activePanel, setActivePanel] = React.useState<'content' | 'design'>('content');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [mobileZoom, setMobileZoom] = React.useState<number>(0);
  const [mobileFitZoom, setMobileFitZoom] = React.useState<number>(0);
  const isMobile = useIsMobile();
  
  // Extract design settings with proper defaults
  const designSettings: DesignSettings = currentProject?.designSettings || {
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
  
  const qrColor: string = currentProject?.qrColor || "#000000";
  
  const handleExportPDF = () => {
    exportToPDF('poster-content');
  };
  
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 relative">
        <MobileTopNavbar
          onMenuToggle={() => setIsMobileSidebarOpen(true)}
          isMenuOpen={isMobileSidebarOpen}
          currentZoom={mobileZoom}
          onZoomChange={setMobileZoom}
          fitZoomLevel={mobileFitZoom}
          onExportPDF={handleExportPDF}
        />
        
        <div className="flex-1 pt-16 pb-4">
          <PosterPreviewArea 
            posterData={posterData}
            qrColor={qrColor}
            designSettings={designSettings}
            mobileZoom={mobileZoom}
            onMobileFitZoomChange={setMobileFitZoom}
          />
        </div>
        
        <MobileSidebarOverlay
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          posterData={posterData}
          setPosterData={updatePosterData}
          designSettings={designSettings}
          setDesignSettings={updateDesignSettings}
          qrColor={qrColor}
          setQrColor={updateQrColor}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          handleExportPDF={handleExportPDF}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] bg-gray-50 relative">
      <MobileTabs 
        posterData={posterData}
        setPosterData={updatePosterData}
        designSettings={designSettings}
        setDesignSettings={updateDesignSettings}
        qrColor={qrColor}
        setQrColor={updateQrColor}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        handleExportPDF={handleExportPDF}
      />
      
      <div className="hidden lg:block">
        <DesktopSidebar 
          posterData={posterData}
          setPosterData={updatePosterData}
          designSettings={designSettings}
          setDesignSettings={updateDesignSettings}
          qrColor={qrColor}
          setQrColor={updateQrColor}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          handleExportPDF={handleExportPDF}
        />
      </div>
      
      <div className="flex-1">
        <PosterPreviewArea 
          posterData={posterData}
          qrColor={qrColor}
          designSettings={designSettings}
        />
      </div>
    </div>
  );
};

export default Index;
