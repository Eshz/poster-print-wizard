
/**
 * Border resolution utilities for CSS properties
 */

/**
 * Parses border properties for a single side
 */
export const parseBorder = (width: string, color: string, style: string, scale: number) => ({
  width: (parseFloat(width) || 0) * scale,
  color: color || '#000000',
  style: style || 'solid'
});

/**
 * Resolves all border properties for an element
 */
export const resolveBorders = (computedStyle: CSSStyleDeclaration, scaleX: number, scaleY: number) => ({
  top: parseBorder(computedStyle.borderTopWidth, computedStyle.borderTopColor, computedStyle.borderTopStyle, scaleY),
  right: parseBorder(computedStyle.borderRightWidth, computedStyle.borderRightColor, computedStyle.borderRightStyle, scaleX),
  bottom: parseBorder(computedStyle.borderBottomWidth, computedStyle.borderBottomColor, computedStyle.borderBottomStyle, scaleY),
  left: parseBorder(computedStyle.borderLeftWidth, computedStyle.borderLeftColor, computedStyle.borderLeftStyle, scaleX)
});
