
/**
 * Line rendering utilities for multi-line text
 */

/**
 * Renders multiple text lines with proper spacing
 */
export const renderTextLines = (
  ctx: CanvasRenderingContext2D,
  lines: string[],
  textX: number,
  textY: number,
  fontSize: number,
  resolvedStyles: any,
  y: number,
  height: number,
  scaleY: number
): void => {
  // Improved line height calculation to prevent overlap
  // Use a more conservative line height multiplier
  const lineHeight = fontSize * 1.15; // Reduced from 1.2 to 1.15 to reduce spacing
  
  // For multi-line text in flexbox center, adjust starting position
  if (lines.length > 1 && resolvedStyles.display === 'flex' && resolvedStyles.alignItems === 'center') {
    const paddingTop = (resolvedStyles.padding?.top || 0) * scaleY;
    const paddingBottom = (resolvedStyles.padding?.bottom || 0) * scaleY;
    const availableHeight = height - paddingTop - paddingBottom;
    const totalTextHeight = lines.length * lineHeight;
    const startY = y + paddingTop + (availableHeight - totalTextHeight) / 2;
    
    lines.forEach((line, index) => {
      const lineY = startY + (index * lineHeight);
      ctx.fillText(line, textX, lineY);
    });
  } else {
    // Draw text lines with consistent line height
    lines.forEach((line, index) => {
      const lineY = textY + (index * lineHeight);
      ctx.fillText(line, textX, lineY);
    });
  }
  
  console.log(`Rendered ${lines.length} lines with line height: ${lineHeight}, fontSize: ${fontSize}`);
};
