
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
  
  // Get the poster element's bounding rect
  const posterRect = element.getBoundingClientRect();
  
  // Calculate scale factor from DOM to canvas
  const scaleX = canvasDimensions.width / posterRect.width;
  const scaleY = canvasDimensions.height / posterRect.height;
  
  console.log(`Scale factors: ${scaleX}x${scaleY}, Poster size: ${posterRect.width}x${posterRect.height}`);
  console.log(`Poster position: ${posterRect.left}, ${posterRect.top}`);
  
  // Calculate offset to center content and remove the poster's viewport offset
  const offsetX = -posterRect.left * scaleX;
  const offsetY = -posterRect.top * scaleY;
  
  console.log(`Canvas offsets: ${offsetX}, ${offsetY}`);
  
  // Render all elements recursively with proper centering
  await renderElementToCanvas(ctx, element, offsetX, offsetY, scaleX, scaleY, designSettings);
  
  return canvas;
};
