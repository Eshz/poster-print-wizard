
/**
 * Text rendering utilities for canvas export
 */

import { applyTextTransform, setCanvasFont } from './text/textTransformation';
import { calculateHorizontalPosition, calculateVerticalPosition, setCanvasTextAlignment } from './text/textPositioning';
import { getTextLines } from './text/textWrapping';
import { renderTextLines } from './text/lineRenderer';

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
  designSettings?: any
) => {
  let text = element.textContent?.trim();
  
  if (!text) return;
  
  // Apply text transformation
  text = applyTextTransform(text, resolvedStyles.textTransform);
  
  // Apply resolved font properties
  const fontSize = resolvedStyles.fontSize * scaleY;
  setCanvasFont(ctx, fontSize, resolvedStyles.fontWeight, resolvedStyles.fontFamily, resolvedStyles.color);
  
  // Calculate horizontal positioning
  const textAlign = resolvedStyles.textAlign;
  const textX = calculateHorizontalPosition(x, width, textAlign, resolvedStyles, scaleX);
  setCanvasTextAlignment(ctx, textAlign, resolvedStyles);
  
  // Calculate vertical positioning
  const textY = calculateVerticalPosition(y, height, fontSize, resolvedStyles, scaleY);
  
  // Handle text wrapping
  const paddingLeft = (resolvedStyles.padding?.left || 0) * scaleX;
  const paddingRight = (resolvedStyles.padding?.right || 0) * scaleX;
  const availableWidth = width - paddingLeft - paddingRight;
  
  const lines = getTextLines(ctx, text, availableWidth, resolvedStyles.whiteSpace);
  
  // Render text lines
  renderTextLines(ctx, lines, textX, textY, fontSize, resolvedStyles, y, height, scaleY);
  
  console.log(`Rendered text "${text}" with font ${resolvedStyles.fontFamily} ${resolvedStyles.fontWeight} at ${textX}, ${textY}, align: ${textAlign}, baseline: ${ctx.textBaseline}, transform: ${resolvedStyles.textTransform}, whitespace: ${resolvedStyles.whiteSpace}`);
};
