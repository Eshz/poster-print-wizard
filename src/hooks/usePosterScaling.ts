
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
      
      // Calculate fit-to-window scale
      const availableWidth = containerRect.width - 40;
      const availableHeight = containerRect.height - 40;
      
      const scaleX = availableWidth / posterUIWidth;
      const scaleY = availableHeight / posterUIHeight;
      const fitToWindowScale = Math.min(scaleX, scaleY, 1);

      // Now 100% zoom (manualZoom = 1) represents actual A0 size
      // The actual scale applied is manualZoom (where 1 = 100% = A0 size)
      const actualScale = manualZoom;
      
      posterRef.current.style.transform = `scale(${actualScale})`;

      // Notify parent of fit-to-window scale for the "Fit" button
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
