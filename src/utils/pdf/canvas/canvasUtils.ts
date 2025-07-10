
/**
 * Canvas utility functions for PDF export
 */

import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS } from '../pdfConfig';

export interface CanvasDimensions {
  width: number;
  height: number;
}

/**
 * Calculates canvas dimensions for high-resolution A0 export
 */
export const calculateCanvasDimensions = (orientation: 'portrait' | 'landscape'): CanvasDimensions => {
  const isLandscape = orientation === 'landscape';
  
  // Calculate dimensions for 300 DPI A0
  const canvasWidth = isLandscape ? Math.floor(A0_HEIGHT_POINTS * 4.17) : Math.floor(A0_WIDTH_POINTS * 4.17);
  const canvasHeight = isLandscape ? Math.floor(A0_WIDTH_POINTS * 4.17) : Math.floor(A0_HEIGHT_POINTS * 4.17);
  
  return { width: canvasWidth, height: canvasHeight };
};

/**
 * Creates and configures a high-resolution canvas
 */
export const createHighResCanvas = (dimensions: CanvasDimensions): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Set high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.textBaseline = 'top';
  
  // Fill background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, dimensions.width, dimensions.height);
  
  return canvas;
};

/**
 * Calculates scale factors from DOM to canvas
 */
export const calculateScaleFactors = (element: HTMLElement, canvasDimensions: CanvasDimensions) => {
  const domRect = element.getBoundingClientRect();
  const scaleX = canvasDimensions.width / domRect.width;
  const scaleY = canvasDimensions.height / domRect.height;
  
  return { scaleX, scaleY, domRect };
};
