
/**
 * Core canvas rendering engine for poster elements
 */

import { renderTextToCanvas } from './canvasTextRenderer';
import { resolveCSSProperties } from './cssPropertyResolver';
import { renderBackground } from './canvasBackgroundRenderer';
import { renderBorders } from './canvasBorderRenderer';
import { renderImageSafely } from './canvasImageRenderer';
import { getListContext, renderBullet, getBulletPosition } from './canvasListRenderer';

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
  
  // Get list context for this element
  const listContext = getListContext(element);
  
  // Render background
  await renderBackground(ctx, resolvedStyles, x, y, width, height);
  
  // Render borders with individual side support
  renderBorders(ctx, resolvedStyles, x, y, width, height);
  
  // Handle images with CORS support
  if (element.tagName === 'IMG') {
    await renderImageSafely(ctx, element as HTMLImageElement, x, y, width, height);
  }
  
  // Handle list item bullets
  if (listContext.isListItem && element.textContent && element.children.length === 0) {
    const bulletX = getBulletPosition(x, listContext, scaleX);
    const bulletY = y + (resolvedStyles.padding?.top || 0) * scaleY;
    const fontSize = resolvedStyles.fontSize * scaleY;
    
    // Get the item index for numbered lists
    const parentList = element.closest('ul, ol');
    const siblings = parentList ? Array.from(parentList.children) : [];
    const itemIndex = siblings.indexOf(element);
    
    renderBullet(ctx, bulletX, bulletY, fontSize, resolvedStyles.color, listContext.listType, itemIndex);
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
      designSettings,
      listContext
    );
  }
  
  // Render children
  for (const child of Array.from(element.children)) {
    await renderElementToCanvas(ctx, child as HTMLElement, offsetX, offsetY, scaleX, scaleY, designSettings);
  }
};
