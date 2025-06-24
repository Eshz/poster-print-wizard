
import React from 'react';
import { ExportService } from '@/services/ExportService';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileTopNavbar from '@/components/layout/MobileTopNavbar';
import MobileSidebarOverlay from '@/components/layout/MobileSidebarOverlay';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { useProjectState } from '@/hooks/useProjectState';
import { PosterData, DesignSettings } from '@/types/project';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { 
    state,
    updatePosterData, 
    updateDesignSettings, 
    updateQrColor
  } = useProjectState();
  
  const [activePanel, setActivePanel] = React.useState<'content' | 'design'>('content');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [mobileZoom, setMobileZoom] = React.useState<number>(0);
  const [mobileFitZoom, setMobileFitZoom] = React.useState<number>(0);
  const isMobile = useIsMobile();
  
  // Extract current project data with proper defaults
  const posterData: PosterData = state.currentProject?.posterData || {
    title: "Your Conference Poster Title",
    authors: "Author Name(s)",
    school: "Institution Name",
    contact: "email@example.com",
    introduction: "Introduction text...",
    methods: "Methods text...",
    findings: "Findings text...",
    conclusions: "Conclusions text...",
    references: "References...",
    keypoints: ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"],
    keyDescriptions: ["Description 1", "Description 2", "Description 3", "Description 4"],
    keyVisibility: [true, true, true, true],
    sectionTitles: [
      "1. Introduction",
      "2. Methods",
      "3. Findings",
      "4. Conclusions",
      "5. References"
    ],
    qrCodeUrl: "https://example.com/poster",
    qrCodeColor: "#000000",
    qrCodeCaption: "",
    showKeypoints: true,
    showQrCode: true,
    images: []
  };
  
  const designSettings: DesignSettings = state.currentProject?.designSettings || {
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
  
  const qrColor: string = state.currentProject?.qrColor || "#000000";
  
  const handleExportPDF = async () => {
    await ExportService.exportPoster('poster-content');
  };
  
  if (isMobile) {
    return (
      <LayoutProvider posterData={posterData}>
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
      </LayoutProvider>
    );
  }

  return (
    <LayoutProvider posterData={posterData}>
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
    </LayoutProvider>
  );
};

export default Index;
