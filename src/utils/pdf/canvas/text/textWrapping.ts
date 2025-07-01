
/**
 * Text wrapping utilities for canvas rendering
 */

/**
 * Determines if short text should not be wrapped based on context
 */
export const shouldPreventWrapping = (
  text: string,
  availableWidth: number,
  ctx: CanvasRenderingContext2D,
  whiteSpace: string
): boolean => {
  // Check whitespace property first
  if (whiteSpace === 'nowrap' || whiteSpace === 'pre') {
    return true;
  }
  
  // Don't wrap very short text (less than 20 characters)
  if (text.length <= 20) {
    return true;
  }
  
  // Don't wrap single words
  if (!text.includes(' ')) {
    return true;
  }
  
  // Check if the text actually fits in one line
  const textWidth = ctx.measureText(text).width;
  if (textWidth <= availableWidth) {
    return true;
  }
  
  // For very narrow containers (like max-w-24 = 96px), be more conservative about wrapping
  if (availableWidth < 100) {
    // Only wrap if it's significantly longer than the available width
    return textWidth < availableWidth * 1.5;
  }
  
  return false;
};

/**
 * Wraps text to fit within the specified width
 */
export const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  if (maxWidth <= 0) return [text];
  
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
 * Gets text lines based on wrapping rules
 */
export const getTextLines = (
  ctx: CanvasRenderingContext2D,
  text: string,
  availableWidth: number,
  whiteSpace: string
): string[] => {
  const preventWrapping = shouldPreventWrapping(text, availableWidth, ctx, whiteSpace);
  
  if (preventWrapping) {
    console.log(`Preventing text wrapping for "${text}" due to whitespace: ${whiteSpace}`);
    return [text];
  } else {
    return wrapText(ctx, text, availableWidth);
  }
};
