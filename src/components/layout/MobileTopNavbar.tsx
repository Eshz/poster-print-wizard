
import React from 'react';
import { Menu, Download, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileTopNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  fitZoomLevel?: number;
  onExportPDF: () => void;
  minZoom?: number;
  maxZoom?: number;
}

const MobileTopNavbar: React.FC<MobileTopNavbarProps> = ({
  onMenuToggle,
  isMenuOpen,
  currentZoom,
  onZoomChange,
  fitZoomLevel,
  onExportPDF,
  minZoom = 0.05,
  maxZoom = 2
}) => {
  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 0.05, maxZoom);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 0.05, minZoom);
    onZoomChange(newZoom);
  };

  const handleFitToWindow = () => {
    if (fitZoomLevel) {
      onZoomChange(fitZoomLevel);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Hamburger menu (hide when panel is open) */}
        <div className="flex items-center">
          {!isMenuOpen && (
            <Button 
              onClick={onMenuToggle}
              variant="ghost" 
              size="icon"
              className="h-10 w-10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Center - App title */}
        <h1 className="text-lg font-semibold text-gray-900">PosterMaker</h1>

        {/* Right side - Zoom controls and Export - Reordered */}
        <div className="flex items-center gap-2">
          {/* Zoom controls - reordered to match desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={currentZoom <= minZoom}
            className="h-10 w-10"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={currentZoom >= maxZoom}
            className="h-10 w-10"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFitToWindow}
            disabled={!fitZoomLevel}
            className="h-10 w-10"
          >
            <Maximize className="h-5 w-5" />
          </Button>

          {/* Export button */}
          <Button 
            onClick={onExportPDF}
            variant="default"
            size="icon"
            className="h-10 w-10 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileTopNavbar;
