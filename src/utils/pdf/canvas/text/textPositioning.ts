
/**
 * Text positioning utilities for canvas rendering
 */

/**
 * Calculates horizontal text position based on alignment
 */
export const calculateHorizontalPosition = (
  x: number,
  width: number,
  textAlign: string,
  resolvedStyles: any,
  scaleX: number
): number => {
  let textX = x;
  
  switch (textAlign) {
    case 'center':
      textX = x + width / 2;
      break;
    case 'right':
      textX = x + width - (resolvedStyles.padding?.right || 0) * scaleX;
      break;
    default:
      textX = x + (resolvedStyles.padding?.left || 0) * scaleX;
  }
  
  return textX;
};

/**
 * Calculates vertical text position based on display and alignment properties
 */
export const calculateVerticalPosition = (
  y: number,
  height: number,
  fontSize: number,
  resolvedStyles: any,
  scaleY: number
): number => {
  let textY = y;
  const paddingTop = (resolvedStyles.padding?.top || 0) * scaleY;
  const paddingBottom = (resolvedStyles.padding?.bottom || 0) * scaleY;
  const availableHeight = height - paddingTop - paddingBottom;
  
  // Improved baseline offset for better visual alignment
  // Reduce baseline offset to prevent text from being positioned too low
  const baselineOffset = fontSize * 0.1; // Reduced from 0.15 to 0.1
  
  // Check if this is flexbox centered content
  if (resolvedStyles.display === 'flex' && resolvedStyles.alignItems === 'center') {
    // For flexbox center alignment, position at the visual center with baseline compensation
    textY = y + paddingTop + (availableHeight - fontSize) / 2 + baselineOffset;
    
    console.log(`Flexbox center alignment positioning with reduced baseline offset:`, {
      containerY: y,
      containerHeight: height,
      paddingTop,
      paddingBottom,
      availableHeight,
      baselineOffset,
      finalTextY: textY,
      fontSize
    });
  } else if (resolvedStyles.display === 'flex') {
    // Other flex alignments
    if (resolvedStyles.alignItems === 'flex-end') {
      textY = y + height - paddingBottom - fontSize + baselineOffset;
    } else {
      // flex-start or default
      textY = y + paddingTop + baselineOffset;
    }
  } else {
    // Regular block element positioning with reduced baseline adjustment
    textY = y + paddingTop + baselineOffset;
  }
  
  return textY;
};

/**
 * Sets canvas text alignment based on resolved styles
 */
export const setCanvasTextAlignment = (
  ctx: CanvasRenderingContext2D,
  textAlign: string,
  resolvedStyles: any
): CanvasTextAlign => {
  let alignment: CanvasTextAlign;
  
  switch (textAlign) {
    case 'center':
      alignment = 'center';
      break;
    case 'right':
      alignment = 'right';
      break;
    default:
      alignment = 'left';
  }
  
  // Handle horizontal flexbox centering
  if (resolvedStyles.display === 'flex' && resolvedStyles.justifyContent === 'center' && textAlign !== 'center') {
    alignment = 'center';
  }
  
  ctx.textAlign = alignment;
  return alignment;
};
