
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
      
      // Calculate the scale factor from UI representation to actual A0 size
      const uiToA0Scale = a0WidthPx / posterUIWidth;
      
      // At 100% zoom, we want to show actual A0 size
      // So we need to scale up our UI representation by the uiToA0Scale factor
      const actualA0Scale = manualZoom * uiToA0Scale;
      
      // Apply the zoom scale
      posterRef.current.style.transform = `scale(${actualA0Scale})`;

      // Calculate what scale would fit the ACTUAL POSTER SIZE (at 100% zoom) in the container
      const posterAtFullSize = {
        width: posterUIWidth * uiToA0Scale,
        height: posterUIHeight * uiToA0Scale
      };
      
      const scaleX = (containerRect.width - 32) / posterAtFullSize.width; // 32px padding
      const scaleY = (containerRect.height - 32) / posterAtFullSize.height; // 32px padding
      const fitToWindowScale = Math.min(scaleX, scaleY, 1);

      // Notify parent of fit-to-window scale
      if (onContainerScaleChange) {
        onContainerScaleChange(fitToWindowScale);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [manualZoom, onContainerScaleChange, posterUIWidth, posterUIHeight, a0WidthPx, a0HeightPx]);

  return { containerRef, posterRef };
};
