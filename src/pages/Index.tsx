
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
    ]
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
  
  const [generatedPoster, setGeneratedPoster] = useState(posterData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePanel, setActivePanel] = useState<'content' | 'design'>('content');
  
  const handleGeneratePoster = () => {
    setIsGenerating(true);
    
    // Simulate a processing delay
    setTimeout(() => {
      setGeneratedPoster({...posterData});
      setIsGenerating(false);
      toast.success("Poster updated successfully!");
    }, 500);
  };
  
  const handleExportPDF = () => {
    const element = document.getElementById('poster-preview');
    
    if (!element) {
      toast.error("Could not find poster to export");
      return;
    }
    
    const opt = {
      margin: 0,
      filename: 'conference-poster.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a0', orientation: 'portrait' }
    };
    
    toast.info("Preparing PDF export...");
    
    html2pdf().from(element).set(opt).save().then(() => {
      toast.success("PDF exported successfully!");
    }).catch(err => {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. Please try again.");
    });
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
                onGenerate={handleGeneratePoster}
                isGenerating={isGenerating}
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
                onGenerate={handleGeneratePoster}
                isGenerating={isGenerating}
              />
            </TabsContent>
            
            <TabsContent value="design" className="space-y-6">
              <DesignPanel 
                designSettings={designSettings}
                setDesignSettings={setDesignSettings}
              />
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleGeneratePoster} 
            disabled={isGenerating}
            className="w-full mt-4"
          >
            Update Poster
          </Button>
          
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
            posterData={generatedPoster} 
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
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
