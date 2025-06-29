
/**
 * Core canvas rendering engine for poster elements
 */

import { renderTextToCanvas } from './canvasTextRenderer';

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
  const computedStyle = window.getComputedStyle(element);
  
  const x = offsetX + (rect.left * scaleX);
  const y = offsetY + (rect.top * scaleY);
  const width = rect.width * scaleX;
  const height = rect.height * scaleY;
  
  // Render background
  await renderBackground(ctx, computedStyle, x, y, width, height);
  
  // Render borders
  renderBorders(ctx, computedStyle, x, y, width, height, scaleX);
  
  // Handle images
  if (element.tagName === 'IMG') {
    await renderImage(ctx, element as HTMLImageElement, x, y, width, height);
  }
  
  // Handle text content
  if (element.textContent && element.children.length === 0) {
    await renderTextToCanvas(ctx, element, x, y, width, height, scaleX, scaleY, designSettings);
  }
  
  // Render children
  for (const child of Array.from(element.children)) {
    await renderElementToCanvas(ctx, child as HTMLElement, offsetX, offsetY, scaleX, scaleY, designSettings);
  }
};

/**
 * Renders element background
 */
const renderBackground = async (
  ctx: CanvasRenderingContext2D,
  computedStyle: CSSStyleDeclaration,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const bgColor = computedStyle.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
  }
};

/**
 * Renders element borders
 */
const renderBorders = (
  ctx: CanvasRenderingContext2D,
  computedStyle: CSSStyleDeclaration,
  x: number,
  y: number,
  width: number,
  height: number,
  scaleX: number
) => {
  const borderWidth = parseFloat(computedStyle.borderWidth) || 0;
  if (borderWidth > 0) {
    ctx.strokeStyle = computedStyle.borderColor || '#000000';
    ctx.lineWidth = borderWidth * scaleX;
    ctx.strokeRect(x, y, width, height);
  }
};

/**
 * Renders images to canvas
 */
const renderImage = async (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  if (img.complete) {
    try {
      ctx.drawImage(img, x, y, width, height);
    } catch (error) {
      console.warn('Could not draw image:', error);
    }
  }
};
