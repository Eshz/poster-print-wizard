
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface ZoomControlsProps {
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  containerScale?: number;
  minZoom?: number;
  maxZoom?: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ 
  currentZoom, 
  onZoomChange, 
  containerScale = 1,
  minZoom = 0.05, // Lower minimum since A0 is very large
  maxZoom = 2 // Lower maximum since 100% is now very large
}) => {
  // Now zoom percentage represents actual A0 size percentage
  const zoomPercentage = Math.round(currentZoom * 100);

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 0.05, maxZoom); // Smaller increments
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 0.05, minZoom); // Smaller increments
    onZoomChange(newZoom);
  };

  const handleZoomReset = () => {
    // Reset to 100% (actual A0 size - 84.1 x 118.8 cm)
    onZoomChange(1);
  };

  const handleFitToWindow = () => {
    // Set zoom to fit the window (will be much smaller than 100%)
    onZoomChange(containerScale);
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2 z-10">
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomOut}
        disabled={currentZoom <= minZoom}
        className="h-8 w-8 p-0"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <button
        onClick={handleZoomReset}
        className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
        title="Reset to 100% (A0 size: 84.1 x 118.8 cm)"
      >
        {zoomPercentage}%
      </button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomIn}
        disabled={currentZoom >= maxZoom}
        className="h-8 w-8 p-0"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleFitToWindow}
        className="h-8 px-2"
        title="Fit to Window"
      >
        <Maximize className="h-4 w-4 mr-1" />
        Fit
      </Button>
    </div>
  );
};

export default ZoomControls;
