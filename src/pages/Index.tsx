
import React from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTopNav from '@/components/layout/MobileTopNav';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import { useProjects } from '@/contexts/ProjectContext';
import { PosterData, DesignSettings } from '@/types/project';

const Index = () => {
  const { 
    currentProject, 
    updatePosterData, 
    updateDesignSettings, 
    updateQrColor
  } = useProjects();
  
  const [activePanel, setActivePanel] = React.useState<'content' | 'design'>('content');
  const [manualZoom, setManualZoom] = React.useState<number>(0);
  const [fitZoomLevel, setFitZoomLevel] = React.useState<number>(0);
  
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
    layout: 'classic',
    orientation: 'portrait',
    titleFont: 'playfair',
    contentFont: 'roboto',
    headerBgColor: '#4052b6',
    headerTextColor: '#FFFFFF',
    sectionBgColor: '#e6ebff',
    sectionTitleColor: '#4052b6',
    sectionTextColor: '#000000',
    keyPointsBgColor: '#f5f7ff',
    keyPointsTextColor: '#4052b6',
  };
  
  const qrColor: string = currentProject?.qrColor || "#000000";
  
  const handleExportPDF = () => {
    exportToPDF('poster-content');
  };

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  const handleFitZoomLevelChange = (scale: number) => {
    setFitZoomLevel(scale);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Top Navigation */}
      <MobileTopNav 
        posterData={posterData}
        setPosterData={updatePosterData}
        designSettings={designSettings}
        setDesignSettings={updateDesignSettings}
        qrColor={qrColor}
        setQrColor={updateQrColor}
        handleExportPDF={handleExportPDF}
        currentZoom={manualZoom || fitZoomLevel}
        onZoomChange={handleZoomChange}
        fitZoomLevel={fitZoomLevel}
      />

      {/* Main content area */}
      <div className="flex min-h-[calc(100vh-73px)] lg:min-h-[calc(100vh-73px)] pt-16 lg:pt-0">
        {/* Desktop sidebar - fixed width */}
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
        
        {/* Preview Area - takes remaining space */}
        <div className="flex-1">
          <PosterPreviewArea 
            posterData={posterData}
            qrColor={qrColor}
            designSettings={designSettings}
            manualZoom={manualZoom}
            onZoomChange={handleZoomChange}
            onContainerScaleChange={handleFitZoomLevelChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
