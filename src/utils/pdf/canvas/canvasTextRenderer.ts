
/**
 * Text rendering utilities for canvas export
 */

import { getFontFamilyFromKey } from '../fonts/fontMappings';

/**
 * Renders text content to canvas with proper font handling
 */
export const renderTextToCanvas = async (
  ctx: CanvasRenderingContext2D,
  element: HTMLElement,
  x: number,
  y: number,
  width: number,
  height: number,
  scaleX: number,
  scaleY: number,
  designSettings: any
) => {
  const computedStyle = window.getComputedStyle(element);
  const text = element.textContent?.trim();
  
  if (!text) return;
  
  // Get font properties
  const fontSize = parseFloat(computedStyle.fontSize) * scaleY;
  const fontWeight = computedStyle.fontWeight;
  const fontFamily = getFontFamilyForCanvas(element, designSettings);
  
  // Set font
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = computedStyle.color || '#000000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Handle text wrapping for long text
  const lines = wrapText(ctx, text, width);
  
  // Draw text lines
  const lineHeight = fontSize * 1.2;
  lines.forEach((line, index) => {
    ctx.fillText(line, x + 5, y + (index * lineHeight) + 5);
  });
};

/**
 * Wraps text to fit within the specified width
 */
const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
};

/**
 * Gets the correct font family for canvas rendering
 */
const getFontFamilyForCanvas = (element: HTMLElement, designSettings: any): string => {
  // Check if it's a title element
  if (element.classList.contains('poster-title') || element.tagName.match(/^H[1-6]$/)) {
    return getFontFamilyFromKey(designSettings?.titleFont || 'merriweather');
  }
  
  // Default to content font
  return getFontFamilyFromKey(designSettings?.contentFont || 'roboto');
};
