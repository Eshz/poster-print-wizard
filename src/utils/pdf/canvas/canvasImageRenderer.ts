
/**
 * Image rendering utilities for canvas export
 */

/**
 * Safely renders images to canvas with CORS handling
 */
export const renderImageSafely = async (
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
