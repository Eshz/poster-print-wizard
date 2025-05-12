
import React, { useState } from 'react';
import { exportToPDF } from '@/utils/pdfExport';
import MobileTabs from '@/components/layout/MobileTabs';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import MobileFloatingButton from '@/components/layout/MobileFloatingButton';

const Index = () => {
  const [posterData, setPosterData] = useState({
    title: "COMMUNITY RESILIENCE IN UNDERPRIVILEGED NEIGHBORHOOD: DIFFERENCES BETWEEN COMMUNITY ACTIVISTS AND NON-ACTIVIST RESIDENTS",
    authors: "Prof. Ester Zychlinski, Mrs. Ora Davidoff",
    school: "Ariel University, Department of Social Work",
    contact: "esterz@ariel.ac.il",
    introduction: "Community resilience is essential for the proper functioning and well-being of communities, enabling them to handle sudden and unpredictable situations, including the ability to withstand and cope with financial and social losses, and to recover, to adapt, and even to grow toward a better state after a crisis.",
    methods: "Data from 241 citizens, including 144 activists and 97 non-activists, through convenience and snowball sampling, were collected via questionnaires in a large underprivileged urban neighborhood.",
    findings: "Community activists consistently demonstrated higher levels of community resilience across all measures compared to non-activists.",
    conclusions: "The poverty-aware social work paradigm underlying this study views poverty as a human rights violation due to unfulfilled basic rights and lack of social opportunities which harm residents' dignity.",
    references: "• Boehm, A. (2002). Participation strategies of activist-volunteers in the life cycle of community crisis.\n• Krumer-Nevo, M. (2020). Radical hope: Poverty-aware practice for social work.",
    keypoints: [
      "Activists Have Higher Community Resilience",
      "Activism as a Tool for Change",
      "Social Work & Community Engagement",
      "Policy Implications"
    ],
    keyDescriptions: [
      "Community activists scored higher than non-activists in social trust, collective efficacy, attachment to place, leadership, and preparedness.",
      "Community resilience empowers residents to voice their needs and drive local social change.",
      "Community social work is essential for long-term change, but many social workers lack these teachable skills.",
      "Investing in community activism can improve long-term social and economic opportunities for underprivileged communities."
    ],
    sectionTitles: [
      "1. Introduction",
      "2. Methods",
      "3. Findings",
      "4. Conclusions and implications",
      "5. References"
    ],
    qrCodeUrl: "https://example.com/poster",
    qrCodeColor: "#000000"
  });
  
  const [designSettings, setDesignSettings] = useState({
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
  });

  const [qrColor, setQrColor] = useState(posterData.qrCodeColor);
  const [activePanel, setActivePanel] = useState<'content' | 'design'>('content');
  
  const handleExportPDF = () => {
    exportToPDF('poster-preview');
  };
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
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
