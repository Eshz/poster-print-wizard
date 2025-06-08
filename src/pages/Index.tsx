
import React from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileFloatingButton from '@/components/layout/MobileFloatingButton';
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
  
  return (
    <div className="flex lg:flex-row min-h-[calc(100vh-73px)] bg-gray-50">
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
      
      {/* Desktop sidebar */}
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
      
      {/* Preview Area */}
      <PosterPreviewArea 
        posterData={posterData}
        qrColor={qrColor}
        designSettings={designSettings}
      />
      
      {/* Mobile-only Design Panel in Sheet (sidebar) */}
      <MobileFloatingButton 
        designSettings={designSettings}
        setDesignSettings={updateDesignSettings}
        qrColor={qrColor}
        setQrColor={updateQrColor}
      />
    </div>
  );
};

export default Index;
