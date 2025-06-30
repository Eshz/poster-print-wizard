
/**
 * Core canvas rendering engine for poster elements
 */

import { renderTextToCanvas } from './canvasTextRenderer';
import { resolveCSSProperties } from './cssPropertyResolver';
import { renderBackground } from './canvasBackgroundRenderer';
import { renderBorders } from './canvasBorderRenderer';
import { renderImageSafely } from './canvasImageRenderer';

/**
 * Recursively renders DOM elements to canvas
 */
export const renderElementToCanvas = async (
  ctx: CanvasRenderingContext2D, 
  element: HTMLElement, 
  offsetX: number, 
  offsetY: number, 
  scaleX: number, 
  scaleY: number,
  designSettings: any
) => {
  const rect = element.getBoundingClientRect();
  const resolvedStyles = resolveCSSProperties(element, designSettings, scaleX, scaleY);
  
  // Calculate position relative to the poster content, not the viewport
  const x = offsetX + (rect.left * scaleX);
  const y = offsetY + (rect.top * scaleY);
  const width = rect.width * scaleX;
  const height = rect.height * scaleY;
  
  // Render background
  await renderBackground(ctx, resolvedStyles, x, y, width, height);
  
  // Render borders with individual side support
  renderBorders(ctx, resolvedStyles, x, y, width, height);
  
  // Handle images with CORS support
  if (element.tagName === 'IMG') {
    await renderImageSafely(ctx, element as HTMLImageElement, x, y, width, height);
  }
  
  // Handle text content with enhanced positioning
  if (element.textContent && element.children.length === 0) {
    await renderTextToCanvas(
      ctx, 
      element, 
      x, 
      y, 
      width, 
      height, 
      scaleX, 
      scaleY, 
      resolvedStyles,
      designSettings
    );
  }
  
  // Render children
  for (const child of Array.from(element.children)) {
    await renderElementToCanvas(ctx, child as HTMLElement, offsetX, offsetY, scaleX, scaleY, designSettings);
  }
};
