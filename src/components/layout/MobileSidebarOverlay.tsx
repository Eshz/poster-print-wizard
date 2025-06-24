
import React from 'react';
import { X, Text, Palette } from "lucide-react";
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
      
      {/* Sidebar Overlay - Made wider (85% of screen width) */}
      <div className="fixed inset-y-0 left-0 w-[85%] bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header - Larger fonts and padding */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Edit Poster</h2>
          <Button 
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content - Larger padding and fonts */}
        <div className="p-6">
          <Tabs defaultValue={activePanel} className="w-full" onValueChange={(value) => setActivePanel(value as 'content' | 'design')}>
            <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
              <TabsTrigger value="content" className="text-base">
                <Text className="mr-2 h-5 w-5" />
                Content
              </TabsTrigger>
              <TabsTrigger value="design" className="text-base">
                <Palette className="mr-2 h-5 w-5" />
                Design
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-6">
              <PosterForm />
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
        </div>
      </div>
    </>
  );
};

export default MobileSidebarOverlay;
