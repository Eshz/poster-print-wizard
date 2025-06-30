
/**
 * Text rendering utilities for canvas export
 */

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
  const text = element.textContent?.trim();
  
  if (!text) return;
  
  // Apply resolved font properties
  const fontSize = resolvedStyles.fontSize * scaleY;
  const fontWeight = resolvedStyles.fontWeight;
  const fontFamily = resolvedStyles.fontFamily;
  
  // Set font with proper formatting
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = resolvedStyles.color;
  
  // Handle text alignment
  const textAlign = resolvedStyles.textAlign;
  let textX = x;
  
  switch (textAlign) {
    case 'center':
      ctx.textAlign = 'center';
      textX = x + width / 2;
      break;
    case 'right':
      ctx.textAlign = 'right';
      textX = x + width - (resolvedStyles.padding?.right || 0) * scaleX;
      break;
    default:
      ctx.textAlign = 'left';
      textX = x + (resolvedStyles.padding?.left || 0) * scaleX;
  }
  
  // Handle vertical alignment
  ctx.textBaseline = 'top';
  let textY = y + (resolvedStyles.padding?.top || 0) * scaleY;
  
  // Check if this is flexbox centered content
  if (resolvedStyles.display === 'flex') {
    if (resolvedStyles.alignItems === 'center') {
      ctx.textBaseline = 'middle';
      textY = y + height / 2;
    }
    
    if (resolvedStyles.justifyContent === 'center' && textAlign !== 'center') {
      ctx.textAlign = 'center';
      textX = x + width / 2;
    }
  }
  
  // Handle text wrapping for long text
  const availableWidth = width - (resolvedStyles.padding?.left || 0) * scaleX - (resolvedStyles.padding?.right || 0) * scaleX;
  const lines = wrapText(ctx, text, availableWidth);
  
  // Draw text lines with proper line height
  const lineHeight = fontSize * 1.2;
  lines.forEach((line, index) => {
    const lineY = textY + (index * lineHeight);
    ctx.fillText(line, textX, lineY);
  });
  
  console.log(`Rendered text "${text}" with font ${fontFamily} at ${textX}, ${textY}, align: ${textAlign}`);
};

/**
 * Wraps text to fit within the specified width
 */
const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
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
