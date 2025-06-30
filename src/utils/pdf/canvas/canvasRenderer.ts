
/**
 * Core canvas rendering engine for poster elements
 */

import { renderTextToCanvas } from './canvasTextRenderer';
import { resolveCSSProperties } from './cssPropertyResolver';

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

/**
 * Renders element background
 */
const renderBackground = async (
  ctx: CanvasRenderingContext2D,
  resolvedStyles: any,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const bgColor = resolvedStyles.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
  }
};

/**
 * Renders element borders with individual side support
 */
const renderBorders = (
  ctx: CanvasRenderingContext2D,
  resolvedStyles: any,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const { borders } = resolvedStyles;
  
  // Top border
  if (borders.top.width > 0) {
    ctx.strokeStyle = borders.top.color;
    ctx.lineWidth = borders.top.width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
  }
  
  // Right border
  if (borders.right.width > 0) {
    ctx.strokeStyle = borders.right.color;
    ctx.lineWidth = borders.right.width;
    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
  }
  
  // Bottom border
  if (borders.bottom.width > 0) {
    ctx.strokeStyle = borders.bottom.color;
    ctx.lineWidth = borders.bottom.width;
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
  }
  
  // Left border
  if (borders.left.width > 0) {
    ctx.strokeStyle = borders.left.color;
    ctx.lineWidth = borders.left.width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
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
