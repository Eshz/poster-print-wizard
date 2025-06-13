
import { useEffect, useRef } from 'react';

interface UsePosterScalingProps {
  manualZoom: number;
  onContainerScaleChange?: (scale: number) => void;
  posterUIWidth: number;
  posterUIHeight: number;
  a0WidthPx: number;
  a0HeightPx: number;
}

export const usePosterScaling = ({
  manualZoom,
  onContainerScaleChange,
  posterUIWidth,
  posterUIHeight,
  a0WidthPx,
  a0HeightPx
}: UsePosterScalingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !posterRef.current) return;

      const container = containerRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      
      // Calculate what scale represents actual A0 size
      const a0ScaleFactor = a0WidthPx / posterUIWidth;
      
      // Calculate fit-to-window scale - ensure poster fits entirely in viewport
      const availableWidth = containerRect.width - 80; // More padding for safety
      const availableHeight = containerRect.height - 80; // More padding for safety
      
      // Calculate scale that fits both width and height
      const scaleX = availableWidth / posterUIWidth;
      const scaleY = availableHeight / posterUIHeight;
      const fitToWindowScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
      
      // The actual scale applied is manualZoom * a0ScaleFactor
      const actualScale = manualZoom * a0ScaleFactor;
      
      posterRef.current.style.transform = `scale(${actualScale})`;

      // Notify parent of fit-to-window scale for the "Fit" button
      if (onContainerScaleChange) {
        onContainerScaleChange(fitToWindowScale);
      }
    };

    const timer = setTimeout(calculateScale, 100);
    
    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateScale);
    };
  }, [manualZoom, onContainerScaleChange, posterUIWidth, posterUIHeight, a0WidthPx, a0HeightPx]);

  return { containerRef, posterRef };
};
