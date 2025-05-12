
import React, { useState } from 'react';
import PosterForm from '@/components/PosterForm';
import PosterPreview from '@/components/PosterPreview';
import DesignPanel from '@/components/DesignPanel';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Palette, Text } from "lucide-react";
import html2pdf from 'html2pdf.js';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Create state for the QR code color
  const [qrColor, setQrColor] = useState(posterData.qrCodeColor);
  
  // Directly use posterData as the generated poster
  // No need for a separate state or generation function
  const [activePanel, setActivePanel] = useState<'content' | 'design'>('content');
  
  const handleExportPDF = () => {
    const element = document.getElementById('poster-preview');
    
    if (!element) {
      toast.error("Could not find poster to export");
      return;
    }
    
    // Create a clone of the element to modify for PDF export
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Add a hidden div to the document to contain our clone
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.appendChild(clonedElement);
    document.body.appendChild(tempDiv);
    
    // Fix the styling for PDF export
    clonedElement.style.width = '841px'; // A0 width in mm converted to pixels
    clonedElement.style.height = '1189px'; // A0 height in mm converted to pixels
    
    // Fix the number circles in the key takeaways
    const numberCircles = clonedElement.querySelectorAll('[data-circle-number]');
    numberCircles.forEach((circle) => {
      const circleElement = circle as HTMLElement;
      circleElement.style.width = '2rem';
      circleElement.style.height = '2rem';
      circleElement.style.minWidth = '2rem';
      circleElement.style.display = 'flex';
      circleElement.style.justifyContent = 'center';
      circleElement.style.alignItems = 'center';
    });
    
    toast.info("Preparing PDF export...");
    
    const opt = {
      margin: 0,
      filename: 'conference-poster.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        logging: false,
        width: 841,
        height: 1189
      },
      jsPDF: { 
        unit: 'px', 
        format: [841, 1189], 
        orientation: 'portrait',
        hotfixes: ["px_scaling"]
      }
    };
    
    setTimeout(() => {
      html2pdf().from(clonedElement).set(opt).save().then(() => {
        toast.success("PDF exported successfully!");
        // Clean up
        document.body.removeChild(tempDiv);
      }).catch(err => {
        console.error("PDF export failed:", err);
        toast.error("PDF export failed. Please try again.");
        // Clean up
        document.body.removeChild(tempDiv);
      });
    }, 1000); // Give a moment for fonts to load properly
  };
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Mobile view tabs */}
      <div className="lg:hidden w-full p-4">
        <Tabs defaultValue="content" className="w-full" onValueChange={(value) => setActivePanel(value as 'content' | 'design')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">
              <Text className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="design">
              <Palette className="mr-2 h-4 w-4" />
              Design
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <div className="bg-white rounded-lg shadow p-4">
              <h1 className="text-2xl font-bold mb-6 text-center">Conference Poster Generator</h1>
              
              <PosterForm 
                posterData={posterData}
                setPosterData={setPosterData}
              />
              
              <Button 
                onClick={handleExportPDF} 
                className="w-full mt-4"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" /> Export as PDF
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="design">
            <div className="bg-white rounded-lg shadow p-4">
              <DesignPanel 
                designSettings={designSettings}
                setDesignSettings={setDesignSettings}
                qrColor={qrColor}
                setQrColor={setQrColor}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:w-1/3 p-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Conference Poster Generator</h1>
          
          <Tabs defaultValue="content" className="w-full" onValueChange={(value) => setActivePanel(value as 'content' | 'design')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="content">
                <Text className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="design">
                <Palette className="mr-2 h-4 w-4" />
                Design
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-6">
              <PosterForm 
                posterData={posterData}
                setPosterData={setPosterData}
              />
            </TabsContent>
            
            <TabsContent value="design" className="space-y-6">
              <DesignPanel 
                designSettings={designSettings}
                setDesignSettings={setDesignSettings}
                qrColor={qrColor}
                setQrColor={setQrColor}
              />
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleExportPDF} 
            className="w-full mt-4"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" /> Export as PDF
          </Button>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className="w-full lg:w-2/3 p-4 bg-gray-100 overflow-auto">
        <div className="bg-white p-2 rounded-lg shadow">
          <PosterPreview 
            posterData={{...posterData, qrCodeColor: qrColor}} 
            designSettings={designSettings}
          />
        </div>
      </div>
      
      {/* Mobile-only Design Panel in Sheet (sidebar) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg lg:hidden"
          >
            <Palette className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85%] sm:w-[385px] overflow-y-auto">
          <div className="py-4">
            <DesignPanel 
              designSettings={designSettings}
              setDesignSettings={setDesignSettings}
              qrColor={qrColor}
              setQrColor={setQrColor}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
