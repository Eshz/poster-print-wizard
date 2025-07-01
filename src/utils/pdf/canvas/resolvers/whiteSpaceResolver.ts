
/**
 * White space and text formatting resolution utilities
 */

/**
 * Resolves whitespace handling properties with enhanced Tailwind class detection
 */
export const resolveWhiteSpace = (
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): string => {
  // Check for Tailwind whitespace classes
  const classList = Array.from(element.classList);
  if (classList.includes('whitespace-nowrap')) {
    console.log(`Found whitespace-nowrap class on element:`, element.className);
    return 'nowrap';
  }
  
  if (classList.includes('whitespace-pre')) {
    return 'pre';
  }
  
  if (classList.includes('whitespace-pre-wrap')) {
    return 'pre-wrap';
  }
  
  if (classList.includes('whitespace-pre-line')) {
    return 'pre-line';
  }

  // Enhanced detection for max-width constraints that should prevent wrapping
  const hasMaxWidthConstraint = classList.some(cls => 
    cls.startsWith('max-w-') && (
      cls.includes('max-w-24') || 
      cls.includes('max-w-20') || 
      cls.includes('max-w-16') ||
      cls.includes('max-w-xs') ||
      cls.includes('max-w-sm')
    )
  );
  
  if (hasMaxWidthConstraint) {
    console.log(`Found max-width constraint class, treating as nowrap:`, element.className);
    return 'nowrap';
  }
  
  // Check computed style
  const whiteSpace = computedStyle.whiteSpace || 'normal';
  console.log(`Resolved whitespace: ${whiteSpace} for element:`, element.className);
  return whiteSpace;
};
