/**
 * Text transformation utilities for canvas rendering
 */

/**
 * Applies CSS text-transform property to text
 */
export const applyTextTransform = (text: string, textTransform: string): string => {
  switch (textTransform) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    default:
      // 'none' or default - keep original text
      return text;
  }
};

/**
 * Sets canvas font properties
 */
export const setCanvasFont = (
  ctx: CanvasRenderingContext2D,
  fontSize: number,
  fontWeight: string,
  fontFamily: string,
  color: string
): void => {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
};
