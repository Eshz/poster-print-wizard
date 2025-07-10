
/**
 * Background rendering utilities for canvas export
 */

/**
 * Renders element background
 */
export const renderBackground = async (
  ctx: CanvasRenderingContext2D,
  resolvedStyles: any,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const bgColor = resolvedStyles.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
  }
};
