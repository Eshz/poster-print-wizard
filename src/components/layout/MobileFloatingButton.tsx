
import React from 'react';
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DesignPanel from '@/components/DesignPanel';

interface MobileFloatingButtonProps {
  designSettings: any;
  setDesignSettings: React.Dispatch<React.SetStateAction<any>>;
  qrColor: string;
  setQrColor: React.Dispatch<React.SetStateAction<string>>;
}

const MobileFloatingButton: React.FC<MobileFloatingButtonProps> = ({
  designSettings,
  setDesignSettings,
  qrColor,
  setQrColor
}) => {
  return (
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
  );
};

export default MobileFloatingButton;
