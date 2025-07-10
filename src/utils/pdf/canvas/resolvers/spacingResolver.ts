
/**
 * Spacing (padding and margin) resolution utilities
 */

/**
 * Resolves padding properties from computed styles with list-aware adjustments
 */
export const resolvePadding = (computedStyle: CSSStyleDeclaration) => {
  const basePadding = {
    top: parseFloat(computedStyle.paddingTop) || 0,
    right: parseFloat(computedStyle.paddingRight) || 0,
    bottom: parseFloat(computedStyle.paddingBottom) || 0,
    left: parseFloat(computedStyle.paddingLeft) || 0
  };
  
  // For list items, we want to minimize vertical spacing to match browser rendering
  const element = (computedStyle as any).element;
  if (element && element.tagName === 'LI') {
    return {
      ...basePadding,
      top: Math.min(basePadding.top, 1),
      bottom: Math.min(basePadding.bottom, 1)
    };
  }
  
  return basePadding;
};

/**
 * Resolves margin properties from computed styles with list-aware adjustments
 */
export const resolveMargin = (computedStyle: CSSStyleDeclaration) => {
  const baseMargin = {
    top: parseFloat(computedStyle.marginTop) || 0,
    right: parseFloat(computedStyle.marginRight) || 0,
    bottom: parseFloat(computedStyle.marginBottom) || 0,
    left: parseFloat(computedStyle.marginLeft) || 0
  };
  
  // For list items, reduce margins to match browser list rendering
  const element = (computedStyle as any).element;
  if (element && element.tagName === 'LI') {
    return {
      ...baseMargin,
      top: Math.min(baseMargin.top, 2),
      bottom: Math.min(baseMargin.bottom, 2)
    };
  }
  
  return baseMargin;
};
