
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
      
      // Calculate fit-to-window scale first
      const availableWidth = containerRect.width - 40;
      const availableHeight = containerRect.height - 40;
      
      const scaleX = availableWidth / posterUIWidth;
      const scaleY = availableHeight / posterUIHeight;
      const fitToWindowScale = Math.min(scaleX, scaleY, 1);

      // Apply the zoom scale relative to fit-to-window, not absolute A0 size
      const actualScale = manualZoom * fitToWindowScale;
      
      posterRef.current.style.transform = `scale(${actualScale})`;

      // Notify parent of fit-to-window scale
      if (onContainerScaleChange) {
        onContainerScaleChange(fitToWindowScale);
      }
    };

    // Initial calculation with a small delay to ensure DOM is ready
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
