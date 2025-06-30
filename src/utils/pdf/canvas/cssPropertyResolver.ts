
/**
 * CSS property resolver for canvas rendering
 */

import { getFontFamilyFromKey } from '../fonts/fontMappings';

export interface ResolvedStyles {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  textAlign: string;
  backgroundColor: string;
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
  
  // Resolve font family (handle CSS variables and design settings)
  const fontFamily = resolveFontFamily(element, computedStyle, designSettings);
  
  // Parse borders for each side
  const borders = {
    top: parseBorder(computedStyle.borderTopWidth, computedStyle.borderTopColor, computedStyle.borderTopStyle, scaleY),
    right: parseBorder(computedStyle.borderRightWidth, computedStyle.borderRightColor, computedStyle.borderRightStyle, scaleX),
    bottom: parseBorder(computedStyle.borderBottomWidth, computedStyle.borderBottomColor, computedStyle.borderBottomStyle, scaleY),
    left: parseBorder(computedStyle.borderLeftWidth, computedStyle.borderLeftColor, computedStyle.borderLeftStyle, scaleX)
  };
  
  // Parse spacing
  const padding = {
    top: parseFloat(computedStyle.paddingTop) || 0,
    right: parseFloat(computedStyle.paddingRight) || 0,
    bottom: parseFloat(computedStyle.paddingBottom) || 0,
    left: parseFloat(computedStyle.paddingLeft) || 0
  };
  
  const margin = {
    top: parseFloat(computedStyle.marginTop) || 0,
    right: parseFloat(computedStyle.marginRight) || 0,
    bottom: parseFloat(computedStyle.marginBottom) || 0,
    left: parseFloat(computedStyle.marginLeft) || 0
  };
  
  return {
    fontFamily,
    fontSize: parseFloat(computedStyle.fontSize) || 16,
    fontWeight: computedStyle.fontWeight || '400',
    color: computedStyle.color || '#000000',
    textAlign: computedStyle.textAlign || 'left',
    backgroundColor: computedStyle.backgroundColor || 'transparent',
    borders,
    padding,
    margin,
    display: computedStyle.display || 'block',
    justifyContent: computedStyle.justifyContent || 'flex-start',
    alignItems: computedStyle.alignItems || 'stretch',
    textBaseline: computedStyle.verticalAlign || 'baseline'
  };
};

/**
 * Resolves font family from various sources
 */
const resolveFontFamily = (
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration,
  designSettings: any
): string => {
  // Check inline style first
  if (element.style.fontFamily && !element.style.fontFamily.includes('var(')) {
    return element.style.fontFamily;
  }
  
  // Check for CSS custom properties
  if (computedStyle.fontFamily && computedStyle.fontFamily.includes('var(--font-')) {
    const match = computedStyle.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      return getFontFamilyFromKey(fontKey);
    }
  }
  
  // Check Tailwind classes
  const classList = Array.from(element.classList);
  const fontClass = classList.find(cls => cls.startsWith('font-') && 
    !['font-bold', 'font-medium', 'font-normal', 'font-light', 'font-thin', 'font-semibold', 'font-black'].includes(cls));
  
  if (fontClass) {
    const fontKey = fontClass.replace('font-', '');
    return getFontFamilyFromKey(fontKey);
  }
  
  // Use design settings based on element type
  if (designSettings) {
    if (element.classList.contains('poster-title') || element.tagName.match(/^H[1-6]$/)) {
      return getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    }
    
    if (element.classList.contains('poster-body') || ['P', 'DIV', 'SPAN'].includes(element.tagName)) {
      return getFontFamilyFromKey(designSettings.contentFont || 'roboto');
    }
  }
  
  // Fallback to computed style
  return computedStyle.fontFamily || 'Arial, sans-serif';
};

/**
 * Parses border properties
 */
const parseBorder = (width: string, color: string, style: string, scale: number) => ({
  width: (parseFloat(width) || 0) * scale,
  color: color || '#000000',
  style: style || 'solid'
});
