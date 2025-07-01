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
  
  // Calculate vertical positioning with improved flexbox alignment
  let textY = y;
  const paddingTop = (resolvedStyles.padding?.top || 0) * scaleY;
  const paddingBottom = (resolvedStyles.padding?.bottom || 0) * scaleY;
  const availableHeight = height - paddingTop - paddingBottom;
  
  // Check if this is flexbox centered content
  if (resolvedStyles.display === 'flex' && resolvedStyles.alignItems === 'center') {
    // For flexbox center alignment, use middle baseline and calculate true center
    ctx.textBaseline = 'middle';
    
    // Calculate the true visual center accounting for font metrics
    const textMetrics = ctx.measureText(text.charAt(0)); // Sample character for height estimation
    const approximateTextHeight = fontSize; // Use font size as approximate text height
    
    // Position at the visual center of the available space
    textY = y + paddingTop + (availableHeight / 2);
    
    console.log(`Flexbox center alignment for "${text}":`, {
      containerY: y,
      containerHeight: height,
      paddingTop,
      paddingBottom,
      availableHeight,
      finalTextY: textY,
      fontSize,
      baseline: 'middle'
    });
  } else if (resolvedStyles.display === 'flex') {
    // Other flex alignments
    ctx.textBaseline = 'top';
    if (resolvedStyles.alignItems === 'flex-end') {
      textY = y + height - paddingBottom - fontSize;
    } else {
      // flex-start or default
      textY = y + paddingTop;
    }
  } else {
    // Regular block element positioning
    ctx.textBaseline = 'top';
    textY = y + paddingTop;
  }
  
  // Handle horizontal flexbox centering
  if (resolvedStyles.display === 'flex' && resolvedStyles.justifyContent === 'center' && textAlign !== 'center') {
    ctx.textAlign = 'center';
    textX = x + width / 2;
  }
  
  // Handle text wrapping for long text
  const paddingLeft = (resolvedStyles.padding?.left || 0) * scaleX;
  const paddingRight = (resolvedStyles.padding?.right || 0) * scaleX;
  const availableWidth = width - paddingLeft - paddingRight;
  const lines = wrapText(ctx, text, availableWidth);
  
  // For multi-line text in flexbox center, adjust starting position
  if (lines.length > 1 && resolvedStyles.display === 'flex' && resolvedStyles.alignItems === 'center') {
    const lineHeight = fontSize * 1.2;
    const totalTextHeight = lines.length * lineHeight;
    const startY = y + paddingTop + (availableHeight - totalTextHeight) / 2;
    
    lines.forEach((line, index) => {
      const lineY = startY + (index * lineHeight) + (lineHeight / 2); // Add half line height for middle baseline
      ctx.fillText(line, textX, lineY);
    });
  } else {
    // Draw text lines with proper line height
    const lineHeight = fontSize * 1.2;
    lines.forEach((line, index) => {
      const lineY = textY + (index * lineHeight);
      ctx.fillText(line, textX, lineY);
    });
  }
  
  console.log(`Rendered text "${text}" with font ${fontFamily} ${fontWeight} at ${textX}, ${textY}, align: ${textAlign}, baseline: ${ctx.textBaseline}`);
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
