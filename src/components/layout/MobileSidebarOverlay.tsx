
import React from 'react';
import { X, Text, Palette, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PosterForm from '@/components/PosterForm';
import DesignPanel from '@/components/DesignPanel';

interface MobileSidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
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

const MobileSidebarOverlay: React.FC<MobileSidebarOverlayProps> = ({
  isOpen,
  onClose,
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
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar Overlay */}
      <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Edit Poster</h2>
          <Button 
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <Tabs defaultValue={activePanel} className="w-full" onValueChange={(value) => setActivePanel(value as 'content' | 'design')}>
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
          
          {/* Export Button */}
          <div className="mt-6 pt-4 border-t">
            <Button 
              onClick={handleExportPDF} 
              className="w-full"
              variant="default"
            >
              <Download className="mr-2 h-4 w-4" /> 
              Export as PDF
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebarOverlay;
