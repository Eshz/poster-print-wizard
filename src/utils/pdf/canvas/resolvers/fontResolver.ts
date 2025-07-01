
/**
 * Font resolution utilities for CSS properties
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
    // Handle template literal patterns like var(--font-${designSettings.titleFont})
    if (designSettings) {
      // Extract variable content between var(--font- and )
      const varMatch = element.style.fontFamily.match(/var\(--font-([^)]+)\)/);
      if (varMatch) {
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
      }
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
  
  // Enhanced context-based font detection
  if (designSettings) {
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
    
    // Check for key takeaway numbers (elements with data-circle-number attribute or in key takeaway context)
    const isKeyTakeawayNumber = element.hasAttribute('data-circle-number') || 
                               element.closest('[class*="key"]') ||
                               element.textContent?.match(/^\d+$/) && element.className.includes('font-bold');
    
    if (isKeyTakeawayNumber) {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      console.log(`Applied titleFont (${titleFont}) to key takeaway number element:`, element.className);
      return titleFont;
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
    
    // Check for section titles and key takeaway titles
    const isSectionTitle = element.tagName.match(/^H[2-6]$/) ||
                          element.className.includes('font-bold') ||
                          element.className.includes('font-black') ||
                          (element.closest('[class*="section"]') && element.className.includes('font'));
    
    if (isSectionTitle) {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      console.log(`Applied titleFont (${titleFont}) to section title element:`, element.className);
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
 * Enhanced font weight resolution with better bold detection
 */
export const resolveFontWeight = (
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): string => {
  // Check Tailwind font weight classes first
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
  
  // Check for specific element types that should be bold by default
  if (element.tagName === 'H1') {
    console.log(`Applied bold weight to H1 element`);
    return '700';
  }
  
  if (element.tagName === 'H2') {
    console.log(`Applied semibold weight to H2 element`);
    return '600';
  }
  
  // Check for inline font-weight style
  if (element.style.fontWeight) {
    const inlineWeight = element.style.fontWeight;
    // Convert named weights to numeric
    const namedWeights: { [key: string]: string } = {
      'normal': '400',
      'bold': '700',
      'lighter': '300',
      'bolder': '700'
    };
    const weight = namedWeights[inlineWeight] || inlineWeight;
    console.log(`Using inline font weight: ${weight}`);
    return weight;
  }
  
  // Use computed font weight with better conversion
  const computedWeight = computedStyle.fontWeight || '400';
  
  // Convert named weights to numeric values
  const namedToNumeric: { [key: string]: string } = {
    'normal': '400',
    'bold': '700',
    'lighter': '300',
    'bolder': '700'
  };
  
  const finalWeight = namedToNumeric[computedWeight] || computedWeight;
  console.log(`Resolved font weight from computed style: ${computedWeight} -> ${finalWeight}`);
  
  return finalWeight;
};
