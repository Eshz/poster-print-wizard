
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
  
  // Resolve font weight with enhanced detection
  const fontWeight = resolveFontWeight(element, computedStyle);
  
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
  
  const resolved = {
    fontFamily,
    fontSize: parseFloat(computedStyle.fontSize) || 16,
    fontWeight,
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
  
  console.log(`Resolved styles for ${element.tagName}.${element.className}:`, {
    fontFamily: resolved.fontFamily,
    fontWeight: resolved.fontWeight,
    fontSize: resolved.fontSize,
    textAlign: resolved.textAlign,
    display: resolved.display,
    alignItems: resolved.alignItems,
    justifyContent: resolved.justifyContent
  });
  
  return resolved;
};

/**
 * Enhanced font family resolution with better CSS variable handling
 */
const resolveFontFamily = (
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration,
  designSettings: any
): string => {
  // Check inline style first
  if (element.style.fontFamily && !element.style.fontFamily.includes('var(')) {
    console.log(`Using inline font family: ${element.style.fontFamily}`);
    return element.style.fontFamily;
  }
  
  // Enhanced CSS custom property resolution
  if (computedStyle.fontFamily && computedStyle.fontFamily.includes('var(--font-')) {
    const match = computedStyle.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const resolvedFont = getFontFamilyFromKey(fontKey);
      console.log(`Resolved CSS variable --font-${fontKey} to: ${resolvedFont}`);
      return resolvedFont;
    }
  }
  
  // Handle dynamic CSS variables with design settings
  if (element.style.fontFamily && element.style.fontFamily.includes('var(--font-')) {
    // Extract the variable pattern like var(--font-${designSettings.titleFont})
    if (designSettings && element.style.fontFamily.includes('titleFont')) {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      console.log(`Resolved dynamic titleFont variable to: ${titleFont} for element:`, element.className);
      return titleFont;
    }
    
    if (designSettings && element.style.fontFamily.includes('contentFont')) {
      const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
      console.log(`Resolved dynamic contentFont variable to: ${contentFont} for element:`, element.className);
      return contentFont;
    }
  }
  
  // Check Tailwind classes
  const classList = Array.from(element.classList);
  const fontClass = classList.find(cls => cls.startsWith('font-') && 
    !['font-bold', 'font-medium', 'font-normal', 'font-light', 'font-thin', 'font-semibold', 'font-black'].includes(cls));
  
  if (fontClass) {
    const fontKey = fontClass.replace('font-', '');
    const resolvedFont = getFontFamilyFromKey(fontKey);
    console.log(`Resolved Tailwind class ${fontClass} to: ${resolvedFont}`);
    return resolvedFont;
  }
  
  // Use design settings based on element type and context
  if (designSettings) {
    // Check if this is in the poster header (authors line)
    const isInHeader = element.closest('[style*="backgroundColor"]') !== null;
    const hasHeaderText = element.textContent && (
      element.textContent.includes('@') || // likely contact info
      element.textContent.toLowerCase().includes('author') ||
      element.textContent.toLowerCase().includes('university') ||
      element.textContent.toLowerCase().includes('school')
    );
    
    if (isInHeader || hasHeaderText || element.classList.contains('poster-title') || element.tagName.match(/^H[1-6]$/)) {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      console.log(`Applied titleFont (${titleFont}) to header/title element:`, element.className);
      return titleFont;
    }
    
    if (element.classList.contains('poster-body') || ['P', 'DIV', 'SPAN'].includes(element.tagName)) {
      const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
      console.log(`Applied contentFont (${contentFont}) to body element:`, element.className);
      return contentFont;
    }
  }
  
  // Fallback to computed style
  const fallback = computedStyle.fontFamily || 'Arial, sans-serif';
  console.log(`Using fallback font: ${fallback}`);
  return fallback;
};

/**
 * Enhanced font weight resolution
 */
const resolveFontWeight = (
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): string => {
  // Check Tailwind font weight classes
  const classList = Array.from(element.classList);
  const weightClass = classList.find(cls => 
    ['font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-black'].includes(cls)
  );
  
  if (weightClass) {
    const weightMap: { [key: string]: string } = {
      'font-thin': '100',
      'font-light': '300',
      'font-normal': '400',
      'font-medium': '500',
      'font-semibold': '600',
      'font-bold': '700',
      'font-black': '900'
    };
    const weight = weightMap[weightClass] || '400';
    console.log(`Resolved Tailwind weight class ${weightClass} to: ${weight}`);
    return weight;
  }
  
  return computedStyle.fontWeight || '400';
};

/**
 * Parses border properties
 */
const parseBorder = (width: string, color: string, style: string, scale: number) => ({
  width: (parseFloat(width) || 0) * scale,
  color: color || '#000000',
  style: style || 'solid'
});
