
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ 
  currentZoom, 
  onZoomChange, 
  minZoom = 0.1, 
  maxZoom = 2 
}) => {
  const zoomPercentage = Math.round(currentZoom * 100);

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 0.1, maxZoom);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 0.1, minZoom);
    onZoomChange(newZoom);
  };

  const handleZoomReset = () => {
    onZoomChange(1);
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
        title="Reset to 100%"
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
    </div>
  );
};

export default ZoomControls;
