
/**
 * Border rendering utilities for canvas export
 */

/**
 * Renders element borders with individual side support
 */
export const renderBorders = (
  ctx: CanvasRenderingContext2D,
  resolvedStyles: any,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const { borders } = resolvedStyles;
  
  // Top border
  if (borders.top.width > 0) {
    ctx.strokeStyle = borders.top.color;
    ctx.lineWidth = borders.top.width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
  }
  
  // Right border
  if (borders.right.width > 0) {
    ctx.strokeStyle = borders.right.color;
    ctx.lineWidth = borders.right.width;
    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
  }
  
  // Bottom border
  if (borders.bottom.width > 0) {
    ctx.strokeStyle = borders.bottom.color;
    ctx.lineWidth = borders.bottom.width;
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
  }
  
  // Left border
  if (borders.left.width > 0) {
    ctx.strokeStyle = borders.left.color;
    ctx.lineWidth = borders.left.width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
  }
};
