
/**
 * Spacing (padding and margin) resolution utilities
 */

/**
 * Resolves padding properties from computed styles
 */
export const resolvePadding = (computedStyle: CSSStyleDeclaration) => ({
  top: parseFloat(computedStyle.paddingTop) || 0,
  right: parseFloat(computedStyle.paddingRight) || 0,
  bottom: parseFloat(computedStyle.paddingBottom) || 0,
  left: parseFloat(computedStyle.paddingLeft) || 0
});

/**
 * Resolves margin properties from computed styles
 */
export const resolveMargin = (computedStyle: CSSStyleDeclaration) => ({
  top: parseFloat(computedStyle.marginTop) || 0,
  right: parseFloat(computedStyle.marginRight) || 0,
  bottom: parseFloat(computedStyle.marginBottom) || 0,
  left: parseFloat(computedStyle.marginLeft) || 0
});
