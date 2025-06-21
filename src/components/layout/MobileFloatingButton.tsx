
import React from 'react';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFloatingButtonProps {
  onClick: () => void;
  designSettings: any;
  setDesignSettings: React.Dispatch<React.SetStateAction<any>>;
  qrColor: string;
  setQrColor: React.Dispatch<React.SetStateAction<string>>;
}

const MobileFloatingButton: React.FC<MobileFloatingButtonProps> = ({
  onClick
}) => {
  return (
    <Button 
      onClick={onClick}
      variant="default" 
      size="icon"
      className="fixed top-4 left-4 rounded-full h-12 w-12 shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
    >
      <Menu className="h-6 w-6 text-white" />
    </Button>
  );
};

export default MobileFloatingButton;
