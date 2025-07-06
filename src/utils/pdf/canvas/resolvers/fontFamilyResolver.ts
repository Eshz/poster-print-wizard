
/**
 * Font family resolution utilities for CSS properties
 */

import { getFontFamilyFromKey } from '../../fonts/fontMappings';

/**
 * Enhanced font family resolution with better CSS variable handling
 */
export const resolveFontFamily = (
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
  
  // Handle dynamic CSS variables with design settings - Enhanced for template literals
  if (element.style.fontFamily && element.style.fontFamily.includes('var(--font-')) {
    const resolvedFont = resolveDynamicFontVariable(element, designSettings);
    if (resolvedFont) return resolvedFont;
  }
  
  // Check Tailwind classes
  const tailwindFont = resolveTailwindFontClass(element);
  if (tailwindFont) return tailwindFont;
  
  // Enhanced context-based font detection with design settings
  if (designSettings) {
    const contextFont = resolveContextBasedFont(element, designSettings);
    if (contextFont) return contextFont;
  }
  
  // Fallback to computed style
  const fallback = computedStyle.fontFamily || 'Arial, sans-serif';
  console.log(`Using fallback font: ${fallback}`);
  return fallback;
};

/**
 * Resolves dynamic CSS variables with design settings
 */
const resolveDynamicFontVariable = (element: HTMLElement, designSettings: any): string | null => {
  if (!designSettings) return null;
  
  // Extract variable content between var(--font- and )
  const varMatch = element.style.fontFamily.match(/var\(--font-([^)]+)\)/);
  if (!varMatch) return null;
  
  const varContent = varMatch[1];
  
  // Check if it contains template literal patterns
  if (varContent.includes('titleFont') || varContent === designSettings.titleFont) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    console.log(`Resolved dynamic titleFont variable to: ${titleFont} for element:`, element.className);
    return titleFont;
  }
  
  if (varContent.includes('contentFont') || varContent === designSettings.contentFont) {
    const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
    console.log(`Resolved dynamic contentFont variable to: ${contentFont} for element:`, element.className);
    return contentFont;
  }
  
  // Enhanced handling for direct design setting values
  if (designSettings.titleFont && varContent === designSettings.titleFont) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont);
    console.log(`Resolved direct titleFont setting "${varContent}" to: ${titleFont}`);
    return titleFont;
  }
  
  if (designSettings.contentFont && varContent === designSettings.contentFont) {
    const contentFont = getFontFamilyFromKey(designSettings.contentFont);
    console.log(`Resolved direct contentFont setting "${varContent}" to: ${contentFont}`);
    return contentFont;
  }
  
  // Try to resolve the variable content directly as a font key
  const directFont = getFontFamilyFromKey(varContent);
  if (directFont !== varContent) { // If it was successfully mapped
    console.log(`Resolved CSS variable --font-${varContent} to: ${directFont}`);
    return directFont;
  }
  
  return null;
};

/**
 * Resolves Tailwind font classes
 */
const resolveTailwindFontClass = (element: HTMLElement): string | null => {
  const classList = Array.from(element.classList);
  const fontClass = classList.find(cls => cls.startsWith('font-') && 
    !['font-bold', 'font-medium', 'font-normal', 'font-light', 'font-thin', 'font-semibold', 'font-black'].includes(cls));
  
  if (fontClass) {
    const fontKey = fontClass.replace('font-', '');
    const resolvedFont = getFontFamilyFromKey(fontKey);
    console.log(`Resolved Tailwind class ${fontClass} to: ${resolvedFont}`);
    return resolvedFont;
  }
  
  return null;
};

/**
 * Resolves fonts based on element context
 */
const resolveContextBasedFont = (element: HTMLElement, designSettings: any): string | null => {
  // Enhanced number detection for key takeaways (numbered items 1, 2, 3, 4)
  const isNumberedElement = element.textContent?.match(/^\d+$/) || 
                           element.hasAttribute('data-circle-number') ||
                           (element.textContent?.trim().length === 1 && /^\d$/.test(element.textContent.trim()));
  
  if (isNumberedElement) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    console.log(`Applied titleFont (${titleFont}) to numbered element:`, element.textContent, element.className);
    return titleFont;
  }
  
  // Enhanced institution/header detection
  const isInstitutionName = element.textContent?.toLowerCase().includes('institution') ||
                           element.textContent?.toLowerCase().includes('university') ||
                           element.textContent?.toLowerCase().includes('school') ||
                           element.textContent?.toLowerCase().includes('college') ||
                           element.textContent?.toLowerCase().includes('department') ||
                           element.closest('[style*="borderTop"]') ||
                           element.closest('[style*="borderBottom"]');
  
  if (isInstitutionName) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    console.log(`Applied titleFont (${titleFont}) to institution/header element:`, element.textContent?.substring(0, 50));
    return titleFont;
  }
  
  // Check for QR caption specifically - Enhanced detection
  const isQrCaption = (element.classList.contains('text-xs') || element.classList.contains('text-sm')) && 
                     (element.closest('[class*="qr"]') || 
                      element.textContent?.toLowerCase().includes('scan') ||
                      element.textContent?.toLowerCase().includes('qr') ||
                      element.closest('[class*="max-w-24"]') || // Common QR caption constraint
                      element.closest('[class*="max-w-20"]'));
  
  if (isQrCaption) {
    const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
    console.log(`Applied contentFont (${contentFont}) to QR caption element:`, element.className);
    return contentFont;
  }
  
  // Check if this is in the poster header (including institution/school/contact info)
  const isInHeader = element.closest('[style*="backgroundColor"]') !== null ||
                     element.closest('.poster-header') !== null;
  const hasHeaderText = element.textContent && (
    element.textContent.includes('@') || // likely contact info
    element.textContent.toLowerCase().includes('author') ||
    element.textContent.toLowerCase().includes('university') ||
    element.textContent.toLowerCase().includes('school') ||
    element.textContent.toLowerCase().includes('institution') ||
    element.textContent.toLowerCase().includes('college') ||
    element.textContent.toLowerCase().includes('department')
  );
  
  // Check if element is in the author info section (has border styling)
  const isInAuthorSection = element.closest('[style*="border"]') !== null && 
                            element.closest('[style*="backgroundColor"]') !== null;
  
  if (isInHeader || hasHeaderText || isInAuthorSection || element.classList.contains('poster-title') || element.tagName.match(/^H[1-6]$/)) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    console.log(`Applied titleFont (${titleFont}) to header/title element:`, element.className, element.textContent?.substring(0, 50));
    return titleFont;
  }
  
  // Enhanced section title detection including bold elements
  const isSectionTitle = element.tagName.match(/^H[2-6]$/) ||
                        element.className.includes('font-bold') ||
                        element.className.includes('font-black') ||
                        element.className.includes('font-semibold') ||
                        (element.closest('[class*="section"]') && element.className.includes('font')) ||
                        // Check if parent has strong/bold styling
                        (element.parentElement?.className.includes('font-bold')) ||
                        (element.parentElement?.className.includes('font-semibold'));
  
  if (isSectionTitle) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    console.log(`Applied titleFont (${titleFont}) to section title element:`, element.className);
    return titleFont;
  }
  
  // Enhanced key takeaway detection - look for elements that are part of key takeaway structures
  const isKeyTakeawayRelated = element.closest('[class*="key"]') ||
                              element.closest('[data-testid*="takeaway"]') ||
                              element.closest('[class*="takeaway"]') ||
                              // Check if it's a circle number or similar structure
                              (element.className.includes('bg-') && element.className.includes('text-white')) ||
                              // Check if parent is a key takeaway container
                              (element.parentElement?.className.includes('key') || 
                               element.parentElement?.closest('[class*="key"]'));
  
  if (isKeyTakeawayRelated && !element.classList.contains('poster-body')) {
    const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
    console.log(`Applied titleFont (${titleFont}) to key takeaway related element:`, element.className);
    return titleFont;
  }
  
  // Default to content font for body elements
  if (element.classList.contains('poster-body') || ['P', 'DIV', 'SPAN'].includes(element.tagName)) {
    const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
    console.log(`Applied contentFont (${contentFont}) to body element:`, element.className);
    return contentFont;
  }
  
  return null;
};
