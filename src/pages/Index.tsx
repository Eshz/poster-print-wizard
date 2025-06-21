
import React from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileFloatingButton from '@/components/layout/MobileFloatingButton';
import MobileSidebarOverlay from '@/components/layout/MobileSidebarOverlay';
import { useProjects } from '@/contexts/ProjectContext';
import { PosterData, DesignSettings } from '@/types/project';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { 
    currentProject, 
    updatePosterData, 
    updateDesignSettings, 
    updateQrColor
  } = useProjects();
  
  const [activePanel, setActivePanel] = React.useState<'content' | 'design'>('content');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  // Extract values from the current project with proper defaults
  const posterData: PosterData = currentProject?.posterData || {
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
    sectionTitles: [
      "1. Introduction",
      "2. Methods",
      "3. Findings",
      "4. Conclusions",
      "5. References"
    ],
    qrCodeUrl: "https://example.com/poster",
    qrCodeColor: "#000000",
    showKeypoints: true,
    showQrCode: true,
    images: []
  };
  
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
        {/* Mobile Poster Preview as Main Content */}
        <div className="flex-1">
          <PosterPreviewArea 
            posterData={posterData}
            qrColor={qrColor}
            designSettings={designSettings}
          />
        </div>
        
        {/* Mobile Sidebar Overlay */}
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
        
        {/* Mobile Floating Hamburger Button */}
        <MobileFloatingButton 
          onClick={() => setIsMobileSidebarOpen(true)}
          designSettings={designSettings}
          setDesignSettings={updateDesignSettings}
          qrColor={qrColor}
          setQrColor={updateQrColor}
        />
      </div>
    );
  }

  // Desktop view
  return (
    <div className="flex lg:flex-row min-h-[calc(100vh-73px)] bg-gray-50 relative">
      {/* Mobile view tabs */}
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
      
      {/* Desktop sidebar - scrollable */}
      <div className="hidden lg:block lg:w-1/3 overflow-y-auto">
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
      
      {/* Preview Area - fixed position */}
      <PosterPreviewArea 
        posterData={posterData}
        qrColor={qrColor}
        designSettings={designSettings}
      />
    </div>
  );
};

export default Index;
