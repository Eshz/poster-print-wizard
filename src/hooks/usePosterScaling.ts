
import { useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';

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
  const posterRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const calculateScale = () => {
      if (!posterRef.current) return;

      const container = posterRef.current.parentElement.parentElement.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      
      // Calculate what scale represents actual A0 size. This is the CSS scale for 100% zoom.
      const a0ScaleFactor = a0WidthPx / posterUIWidth;
      
      // Calculate fit-to-window scale - ensure poster fits entirely in viewport
      // Use different padding for mobile vs desktop
      const padding = isMobile ? 40 : 80;
      const availableWidth = containerRect.width - padding;
      const availableHeight = containerRect.height - padding;
      
      // Calculate CSS scale that fits both width and height
      const scaleX = availableWidth / posterUIWidth;
      const scaleY = availableHeight / posterUIHeight;
      const fitToWindowCssScale = Math.min(scaleX, scaleY);
      
      // The actual CSS scale applied is manualZoom (e.g. 1.0 for 100%) * a0ScaleFactor
      const actualScale = manualZoom * a0ScaleFactor;
      
      posterRef.current.style.transform = `scale(${actualScale})`;

      // Notify parent of the ZOOM LEVEL that corresponds to fitting to window.
      if (onContainerScaleChange) {
        // We want: zoomLevel * a0ScaleFactor = fitToWindowCssScale
        // So: zoomLevel = fitToWindowCssScale / a0ScaleFactor
        const fitToWindowZoomLevel = fitToWindowCssScale / a0ScaleFactor;
        onContainerScaleChange(fitToWindowZoomLevel);
      }
    };

    // Use shorter timeout for mobile for more responsive scaling
    const timeout = isMobile ? 50 : 100;
    const timer = setTimeout(calculateScale, timeout);
    
    calculateScale();
    window.addEventListener('resize', calculateScale);
    window.addEventListener('orientationchange', calculateScale);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateScale);
      window.removeEventListener('orientationchange', calculateScale);
    };
  }, [manualZoom, onContainerScaleChange, posterUIWidth, posterUIHeight, a0WidthPx, a0HeightPx, isMobile]);

  return { posterRef };
};
