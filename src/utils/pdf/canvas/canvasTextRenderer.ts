
/**
 * Text rendering utilities for canvas export
 */

import { applyTextTransform, setCanvasFont } from './text/textTransformation';
import { calculateHorizontalPosition, calculateVerticalPosition, setCanvasTextAlignment } from './text/textPositioning';
import { getTextLines } from './text/textWrapping';
import { renderTextLines } from './text/lineRenderer';
import { calculateListTextPosition, type ListRenderingContext } from './canvasListRenderer';

/**
 * Renders text content to canvas with proper font handling and alignment
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
  resolvedStyles: any,
  designSettings?: any,
  listContext?: ListRenderingContext
) => {
  let text = element.textContent?.trim();
  
  if (!text) return;
  
  // Apply text transformation
  text = applyTextTransform(text, resolvedStyles.textTransform);
  
  // Apply resolved font properties with better scaling
  // Reduce font scaling to prevent oversized text in PDF
  const baseFontSize = resolvedStyles.fontSize;
  const scaledFontSize = baseFontSize * Math.min(scaleY, 1.2); // Cap scaling to prevent huge text
  
  setCanvasFont(ctx, scaledFontSize, resolvedStyles.fontWeight, resolvedStyles.fontFamily, resolvedStyles.color);
  
  // Calculate horizontal positioning with list adjustments
  const textAlign = resolvedStyles.textAlign;
  let textX = calculateHorizontalPosition(x, width, textAlign, resolvedStyles, scaleX);
  
  // Adjust text position for list items
  if (listContext?.isListItem) {
    textX = calculateListTextPosition(textX, listContext, scaleX);
  }
  
  setCanvasTextAlignment(ctx, textAlign, resolvedStyles);
  
  // Calculate vertical positioning with improved spacing
  const textY = calculateVerticalPosition(y, height, scaledFontSize, resolvedStyles, scaleY);
  
  // Handle text wrapping with list adjustments
  const paddingLeft = (resolvedStyles.padding?.left || 0) * scaleX;
  const paddingRight = (resolvedStyles.padding?.right || 0) * scaleX;
  let availableWidth = width - paddingLeft - paddingRight;
  
  // Reduce available width for list items to account for bullets
  if (listContext?.isListItem) {
    availableWidth -= (listContext.bulletWidth + 16) * scaleX; // bullet width + spacing
  }
  
  const lines = getTextLines(ctx, text, availableWidth, resolvedStyles.whiteSpace);
  
  // Render text lines with improved scaling
  renderTextLines(ctx, lines, textX, textY, scaledFontSize, resolvedStyles, y, height, scaleY);
  
  console.log(`Rendered ${listContext?.isListItem ? 'list item' : 'text'} "${text}" with font ${resolvedStyles.fontFamily} ${resolvedStyles.fontWeight} at ${textX}, ${textY}, scaled font size: ${scaledFontSize}`);
};
