
import { toast } from "sonner";
import { extractDesignSettings, getOriginalPosterElement } from './domUtils';
import { preloadFonts } from './fontLoader';
import { calculateCanvasDimensions, createHighResCanvas, calculateScaleFactors } from './canvas/canvasUtils';
import { renderElementToCanvas } from './canvas/canvasRenderer';
import { canvasToPDF } from './canvas/canvasPdfConverter';

/**
 * Canvas-based PDF export that renders the poster directly to canvas
 * This bypasses html2canvas font rendering issues
 */
export const exportToCanvasPDF = async (elementId: string, orientation: 'portrait' | 'landscape' = 'portrait') => {
  toast.info(`Preparing high-quality canvas export in ${orientation} mode...`);
  
  // Preload fonts first
  await preloadFonts();
  
  // Get the original poster element
  const element = getOriginalPosterElement();
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  const designSettings = extractDesignSettings();
  console.log('Canvas export using design settings:', designSettings);
  
  try {
    // Create high-resolution canvas
    const canvas = await renderPosterToCanvas(element, orientation, designSettings);
    
    // Convert canvas to PDF
    await canvasToPDF(canvas, orientation);
    
  } catch (error) {
    console.error("Canvas PDF export failed:", error);
    toast.error("Canvas PDF export failed. Please try again.");
  }
};

/**
 * Renders the poster DOM element to a high-resolution canvas
 */
const renderPosterToCanvas = async (element: HTMLElement, orientation: 'portrait' | 'landscape', designSettings: any): Promise<HTMLCanvasElement> => {
  // Calculate dimensions for 300 DPI A0
  const canvasDimensions = calculateCanvasDimensions(orientation);
  
  console.log(`Creating canvas: ${canvasDimensions.width}x${canvasDimensions.height} pixels for ${orientation} A0 at 300 DPI`);
  
  // Create high-resolution canvas
  const canvas = createHighResCanvas(canvasDimensions);
  const ctx = canvas.getContext('2d')!;
  
  toast.info('Rendering poster content to high-resolution canvas...');
  
  // Calculate scale factor from DOM to canvas
  const { scaleX, scaleY, domRect } = calculateScaleFactors(element, canvasDimensions);
  
  console.log(`Scale factors: ${scaleX}x${scaleY}, DOM size: ${domRect.width}x${domRect.height}`);
  
  // Render all elements recursively
  await renderElementToCanvas(ctx, element, 0, 0, scaleX, scaleY, designSettings);
  
  return canvas;
};
