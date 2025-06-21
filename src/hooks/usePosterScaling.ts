
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
      
      // Calculate what scale represents actual A0 size. This is the CSS scale for 100% zoom.
      const a0ScaleFactor = a0WidthPx / posterUIWidth;
      
      // Calculate fit-to-window scale - ensure poster fits entirely in viewport
      const availableWidth = containerRect.width - 80; // More padding for safety
      const availableHeight = containerRect.height - 80; // More padding for safety
      
      // Calculate CSS scale that fits both width and height
      const scaleX = availableWidth / posterUIWidth;
      const scaleY = availableHeight / posterUIHeight;
      const fitToWindowCssScale = Math.min(scaleX, scaleY);
      
      // The actual CSS scale applied is manualZoom (e.g. 1.0 for 100%) * a0ScaleFactor
      const actualScale = manualZoom * a0ScaleFactor;
      
      posterRef.current.style.transform = `scale(${actualScale})`;

      // Enable scrolling when zoomed beyond fit-to-window
      if (container && actualScale > fitToWindowCssScale) {
        container.style.overflow = 'auto';
        // Set container dimensions to allow proper scrolling
        const scaledWidth = posterUIWidth * actualScale;
        const scaledHeight = posterUIHeight * actualScale;
        containerRef.current.style.width = `${scaledWidth}px`;
        containerRef.current.style.height = `${scaledHeight}px`;
      } else {
        if (container) {
          container.style.overflow = 'hidden';
        }
        containerRef.current.style.width = 'auto';
        containerRef.current.style.height = 'auto';
      }

      // Notify parent of the ZOOM LEVEL that corresponds to fitting to window.
      if (onContainerScaleChange) {
        // We want: zoomLevel * a0ScaleFactor = fitToWindowCssScale
        // So: zoomLevel = fitToWindowCssScale / a0ScaleFactor
        const fitToWindowZoomLevel = fitToWindowCssScale / a0ScaleFactor;
        onContainerScaleChange(fitToWindowZoomLevel);
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
