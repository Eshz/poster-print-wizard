
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
      // A0 is 84.1cm x 118.8cm. At 96 DPI, that's 3179 x 4494 pixels
      // Our UI is 800 x 1131 pixels
      // So to show actual A0 size, we need to scale up by the ratio
      const a0ScaleFactor = a0WidthPx / posterUIWidth; // 3179 / 800 = ~3.97
      
      // Calculate fit-to-window scale based on the actual scaled dimensions
      const availableWidth = containerRect.width - 40;
      const availableHeight = containerRect.height - 40;
      
      // The actual dimensions when at 100% zoom (manualZoom = 1)
      const actualA0Width = posterUIWidth * a0ScaleFactor;
      const actualA0Height = posterUIHeight * a0ScaleFactor;
      
      const scaleX = availableWidth / actualA0Width;
      const scaleY = availableHeight / actualA0Height;
      const fitToWindowScale = Math.min(scaleX, scaleY, 1);
      
      // Now 100% zoom (manualZoom = 1) represents actual A0 size
      // The actual scale applied is manualZoom * a0ScaleFactor
      const actualScale = manualZoom * a0ScaleFactor;
      
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
