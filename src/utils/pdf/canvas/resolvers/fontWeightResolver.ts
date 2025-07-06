
/**
 * Font weight resolution utilities for CSS properties
 */

/**
 * Enhanced font weight resolution with better bold detection
 */
export const resolveFontWeight = (
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): string => {
  // Check Tailwind font weight classes first
  const tailwindWeight = resolveTailwindWeightClass(element);
  if (tailwindWeight) return tailwindWeight;
  
  // Check for specific element types that should be bold by default
  const elementTypeWeight = resolveElementTypeWeight(element);
  if (elementTypeWeight) return elementTypeWeight;
  
  // Check for inline font-weight style
  const inlineWeight = resolveInlineWeight(element);
  if (inlineWeight) return inlineWeight;
  
  // Use computed font weight with better conversion
  return resolveComputedWeight(computedStyle);
};

/**
 * Resolves Tailwind font weight classes
 */
const resolveTailwindWeightClass = (element: HTMLElement): string | null => {
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
  
  return null;
};

/**
 * Resolves font weight based on element type
 */
const resolveElementTypeWeight = (element: HTMLElement): string | null => {
  if (element.tagName === 'H1') {
    console.log(`Applied bold weight to H1 element`);
    return '700';
  }
  
  if (element.tagName === 'H2') {
    console.log(`Applied semibold weight to H2 element`);
    return '600';
  }
  
  return null;
};

/**
 * Resolves inline font-weight style
 */
const resolveInlineWeight = (element: HTMLElement): string | null => {
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
  
  return null;
};

/**
 * Resolves computed font weight with conversion
 */
const resolveComputedWeight = (computedStyle: CSSStyleDeclaration): string => {
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
