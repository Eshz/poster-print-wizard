
import React from 'react';
import { Text, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PosterForm from '@/components/PosterForm';
import DesignPanel from '@/components/DesignPanel';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface MobileTabsProps {
  posterData: any;
  setPosterData: React.Dispatch<React.SetStateAction<any>>;
  designSettings: any;
  setDesignSettings: React.Dispatch<React.SetStateAction<any>>;
  qrColor: string;
  setQrColor: React.Dispatch<React.SetStateAction<string>>;
  activePanel: 'content' | 'design';
  setActivePanel: React.Dispatch<React.SetStateAction<'content' | 'design'>>;
  handleExportPDF: () => void;
}

const MobileTabs: React.FC<MobileTabsProps> = ({
  posterData,
  setPosterData,
  designSettings,
  setDesignSettings,
  qrColor,
  setQrColor,
  activePanel,
  setActivePanel,
  handleExportPDF
}) => {
  return (
    <div className="lg:hidden w-full p-4">
      <Tabs defaultValue={activePanel} className="w-full" onValueChange={(value) => setActivePanel(value as 'content' | 'design')}>
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
  );
};

export default MobileTabs;
