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
  let text = element.textContent?.trim();
  
  if (!text) return;
  
  // Apply text transformation based on CSS text-transform property
  switch (resolvedStyles.textTransform) {
    case 'uppercase':
      text = text.toUpperCase();
      break;
    case 'lowercase':
      text = text.toLowerCase();
      break;
    case 'capitalize':
      text = text.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
      break;
    // 'none' or default - keep original text
  }
  
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
  
  // Calculate vertical positioning with improved baseline handling
  let textY = y;
  const paddingTop = (resolvedStyles.padding?.top || 0) * scaleY;
  const paddingBottom = (resolvedStyles.padding?.bottom || 0) * scaleY;
  const availableHeight = height - paddingTop - paddingBottom;
  
  // Check if this is flexbox centered content
  if (resolvedStyles.display === 'flex' && resolvedStyles.alignItems === 'center') {
    // For flexbox center alignment, use alphabetic baseline for consistent positioning
    ctx.textBaseline = 'alphabetic';
    
    // Calculate the center position accounting for font descenders
    const fontMetrics = ctx.measureText('Mg'); // Use characters with ascenders and descenders
    const approximateDescender = fontSize * 0.2; // Estimate descender height
    const textCenterOffset = fontSize * 0.3; // Offset to visually center text
    
    // Position text so it appears visually centered in the container
    textY = y + paddingTop + (availableHeight / 2) + textCenterOffset;
    
    console.log(`Flexbox center alignment for "${text}":`, {
      containerY: y,
      containerHeight: height,
      paddingTop,
      paddingBottom,
      availableHeight,
      finalTextY: textY,
      fontSize,
      baseline: 'alphabetic',
      textCenterOffset
    });
  } else if (resolvedStyles.display === 'flex') {
    // Other flex alignments
    ctx.textBaseline = 'alphabetic';
    if (resolvedStyles.alignItems === 'flex-end') {
      textY = y + height - paddingBottom - (fontSize * 0.2); // Account for descenders
    } else {
      // flex-start or default
      textY = y + paddingTop + (fontSize * 0.8); // Position for alphabetic baseline
    }
  } else {
    // Regular block element positioning with improved baseline
    ctx.textBaseline = 'alphabetic';
    textY = y + paddingTop + (fontSize * 0.8); // Better positioning for alphabetic baseline
  }
  
  // Handle horizontal flexbox centering
  if (resolvedStyles.display === 'flex' && resolvedStyles.justifyContent === 'center' && textAlign !== 'center') {
    ctx.textAlign = 'center';
    textX = x + width / 2;
  }
  
  // Enhanced text wrapping logic with whitespace handling
  const paddingLeft = (resolvedStyles.padding?.left || 0) * scaleX;
  const paddingRight = (resolvedStyles.padding?.right || 0) * scaleX;
  const availableWidth = width - paddingLeft - paddingRight;
  
  // Check if text wrapping should be prevented
  const shouldPreventWrapping = resolvedStyles.whiteSpace === 'nowrap' || 
                               resolvedStyles.whiteSpace === 'pre' ||
                               isShortTextThatShouldntWrap(text, availableWidth, ctx);
  
  let lines: string[];
  if (shouldPreventWrapping) {
    lines = [text]; // Keep as single line
    console.log(`Preventing text wrapping for "${text}" due to whitespace: ${resolvedStyles.whiteSpace}`);
  } else {
    lines = wrapText(ctx, text, availableWidth);
  }
  
  // For multi-line text in flexbox center, adjust starting position
  if (lines.length > 1 && resolvedStyles.display === 'flex' && resolvedStyles.alignItems === 'center') {
    const lineHeight = fontSize * 1.2;
    const totalTextHeight = lines.length * lineHeight;
    const startY = y + paddingTop + (availableHeight - totalTextHeight) / 2 + (fontSize * 0.8);
    
    lines.forEach((line, index) => {
      const lineY = startY + (index * lineHeight);
      ctx.fillText(line, textX, lineY);
    });
  } else {
    // Draw text lines with proper line height and baseline
    const lineHeight = fontSize * 1.2;
    lines.forEach((line, index) => {
      const lineY = textY + (index * lineHeight);
      ctx.fillText(line, textX, lineY);
    });
  }
  
  console.log(`Rendered text "${text}" with font ${fontFamily} ${fontWeight} at ${textX}, ${textY}, align: ${textAlign}, baseline: ${ctx.textBaseline}, transform: ${resolvedStyles.textTransform}, whitespace: ${resolvedStyles.whiteSpace}`);
};

/**
 * Determines if short text should not be wrapped based on context
 */
const isShortTextThatShouldntWrap = (text: string, availableWidth: number, ctx: CanvasRenderingContext2D): boolean => {
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
