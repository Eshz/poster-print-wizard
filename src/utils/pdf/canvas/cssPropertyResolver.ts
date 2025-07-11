
/**
 * CSS property resolver for canvas rendering
 */

import { resolveFontFamily, resolveFontWeight } from './resolvers/fontResolver';
import { resolveWhiteSpace } from './resolvers/whiteSpaceResolver';
import { resolveBorders } from './resolvers/borderResolver';
import { resolvePadding, resolveMargin } from './resolvers/spacingResolver';

export interface ResolvedStyles {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  textAlign: string;
  textTransform: string;
  backgroundColor: string;
  whiteSpace: string;
  borders: {
    top: { width: number; color: string; style: string };
    right: { width: number; color: string; style: string };
    bottom: { width: number; color: string; style: string };
    left: { width: number; color: string; style: string };
  };
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  display: string;
  justifyContent: string;
  alignItems: string;
  textBaseline: string;
  listStyleType: string;
  listStylePosition: string;
}

/**
 * Resolves CSS custom properties and computed styles for canvas rendering
 */
export const resolveCSSProperties = (
  element: HTMLElement,
  designSettings: any,
  scaleX: number,
  scaleY: number
): ResolvedStyles => {
  const computedStyle = window.getComputedStyle(element);
  
  // Resolve font properties using dedicated resolvers
  const fontFamily = resolveFontFamily(element, computedStyle, designSettings);
  const fontWeight = resolveFontWeight(element, computedStyle);
  const whiteSpace = resolveWhiteSpace(element, computedStyle);
  
  // Resolve layout properties using dedicated resolvers
  const borders = resolveBorders(computedStyle, scaleX, scaleY);
  const padding = resolvePadding(computedStyle);
  const margin = resolveMargin(computedStyle);
  
  // Special handling for list items to reduce spacing
  let adjustedPadding = padding;
  if (element.tagName === 'LI') {
    adjustedPadding = {
      ...padding,
      top: Math.min(padding.top, 2), // Reduce top padding for list items
      bottom: Math.min(padding.bottom, 2) // Reduce bottom padding for list items
    };
  }
  
  const resolved = {
    fontFamily,
    fontSize: parseFloat(computedStyle.fontSize) || 16,
    fontWeight,
    color: computedStyle.color || '#000000',
    textAlign: computedStyle.textAlign || 'left',
    textTransform: computedStyle.textTransform || 'none',
    backgroundColor: computedStyle.backgroundColor || 'transparent',
    whiteSpace,
    borders,
    padding: adjustedPadding,
    margin,
    display: computedStyle.display || 'block',
    justifyContent: computedStyle.justifyContent || 'flex-start',
    alignItems: computedStyle.alignItems || 'stretch',
    textBaseline: computedStyle.verticalAlign || 'baseline',
    listStyleType: computedStyle.listStyleType || 'disc',
    listStylePosition: computedStyle.listStylePosition || 'outside'
  };
  
  console.log(`Resolved styles for ${element.tagName}.${element.className}:`, {
    fontFamily: resolved.fontFamily,
    fontWeight: resolved.fontWeight,
    fontSize: resolved.fontSize,
    textAlign: resolved.textAlign,
    listStyleType: resolved.listStyleType,
    adjustedPadding: element.tagName === 'LI' ? 'yes' : 'no'
  });
  
  return resolved;
};
