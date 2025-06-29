
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
  
  // Handle images with CORS support
  if (element.tagName === 'IMG') {
    await renderImageSafely(ctx, element as HTMLImageElement, x, y, width, height);
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
 * Safely renders images to canvas with CORS handling
 */
const renderImageSafely = async (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  if (!img.complete) {
    console.warn('Image not loaded, skipping render');
    return;
  }

  try {
    // For external images (like QR codes), create a CORS-enabled version
    if (img.src.startsWith('http') && !img.src.includes(window.location.hostname)) {
      await renderExternalImageSafely(ctx, img, x, y, width, height);
    } else {
      // Local images should be fine
      ctx.drawImage(img, x, y, width, height);
    }
  } catch (error) {
    console.warn('Could not draw image, rendering placeholder:', error);
    renderImagePlaceholder(ctx, x, y, width, height);
  }
};

/**
 * Renders external images safely by recreating them with CORS
 */
const renderExternalImageSafely = async (
  ctx: CanvasRenderingContext2D,
  originalImg: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return new Promise<void>((resolve) => {
    const corsImg = new Image();
    corsImg.crossOrigin = 'anonymous';
    
    corsImg.onload = () => {
      try {
        ctx.drawImage(corsImg, x, y, width, height);
        resolve();
      } catch (error) {
        console.warn('CORS image failed, rendering placeholder:', error);
        renderImagePlaceholder(ctx, x, y, width, height);
        resolve();
      }
    };
    
    corsImg.onerror = () => {
      console.warn('Failed to load CORS image, rendering placeholder');
      renderImagePlaceholder(ctx, x, y, width, height);
      resolve();
    };
    
    // Try to load with CORS
    corsImg.src = originalImg.src;
    
    // Fallback timeout
    setTimeout(() => {
      if (!corsImg.complete) {
        console.warn('Image loading timeout, rendering placeholder');
        renderImagePlaceholder(ctx, x, y, width, height);
        resolve();
      }
    }, 3000);
  });
};

/**
 * Renders a placeholder when images fail to load
 */
const renderImagePlaceholder = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  // Gray placeholder background
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(x, y, width, height);
  
  // Border
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);
  
  // Placeholder text
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Image', x + width / 2, y + height / 2);
};
