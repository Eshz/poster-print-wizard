import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export
 * Using a more conservative approach to avoid huge fonts
 */
export const calculateScaleFactor = () => {
  // For A0 export, we want to maintain readability
  // A0 is 841mm x 1189mm, which is about 2.3x larger than A4
  // We'll use a more conservative scale factor
  return 2.5; // This gives us good quality without enormous text
};

/**
 * Applies scaling to a cloned element for PDF export
 */
export const scaleElementForPdf = (clonedElement: HTMLElement) => {
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  const scaleFactor = calculateScaleFactor();
  
  // Set dimensions for A0 PDF export
  clonedElement.style.width = `${PREVIEW_WIDTH}px`;
  clonedElement.style.height = `${PREVIEW_HEIGHT}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Apply more conservative scaling
  scaleTextElements(clonedElement, scaleFactor);
  scaleSpacing(clonedElement, scaleFactor);
  scaleImages(clonedElement, scaleFactor);
  scaleNumberCircles(clonedElement, scaleFactor);
  
  return scaleFactor;
};

/**
 * Scales text elements with conservative font size increases
 */
const scaleTextElements = (element: HTMLElement, scaleFactor: number) => {
  const textElements = element.querySelectorAll('*');
  textElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Scale font size more conservatively
    const fontSize = parseFloat(computedStyle.fontSize);
    if (fontSize > 0) {
      // Use a reduced scale factor for fonts to keep them readable
      const fontScaleFactor = Math.min(scaleFactor, 2.0);
      htmlElement.style.fontSize = `${fontSize * fontScaleFactor}px`;
    }
    
    // Scale line height proportionally
    const lineHeight = parseFloat(computedStyle.lineHeight);
    if (lineHeight > 0 && !isNaN(lineHeight)) {
      htmlElement.style.lineHeight = `${lineHeight * 1.2}px`;
    }
  });
};

/**
 * Scales spacing elements moderately
 */
const scaleSpacing = (element: HTMLElement, scaleFactor: number) => {
  const allElements = element.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Use a moderate scale factor for spacing
    const spacingScaleFactor = Math.min(scaleFactor * 0.6, 1.8);
    
    // Scale padding and margins moderately
    ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
     'marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
      const value = parseFloat(computedStyle[prop as any]);
      if (value > 0) {
        (htmlElement.style as any)[prop] = `${value * spacingScaleFactor}px`;
      }
    });
    
    // Scale border radius
    const borderRadius = parseFloat(computedStyle.borderRadius);
    if (borderRadius > 0) {
      htmlElement.style.borderRadius = `${borderRadius * spacingScaleFactor}px`;
    }
    
    // Scale gaps for grid and flex layouts
    const gap = parseFloat(computedStyle.gap);
    if (gap > 0) {
      htmlElement.style.gap = `${gap * spacingScaleFactor}px`;
    }
  });
};

/**
 * Scales images proportionally
 */
const scaleImages = (element: HTMLElement, scaleFactor: number) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLElement;
    const currentWidth = parseFloat(window.getComputedStyle(imgElement).width);
    const currentHeight = parseFloat(window.getComputedStyle(imgElement).height);
    
    // Use moderate scaling for images
    const imageScaleFactor = Math.min(scaleFactor * 0.8, 2.0);
    
    if (currentWidth > 0) {
      imgElement.style.width = `${currentWidth * imageScaleFactor}px`;
    }
    if (currentHeight > 0) {
      imgElement.style.height = `${currentHeight * imageScaleFactor}px`;
    }
  });
};

/**
 * Scales number circles in key takeaways
 */
const scaleNumberCircles = (element: HTMLElement, scaleFactor: number) => {
  const numberCircles = element.querySelectorAll('[data-circle-number]');
  numberCircles.forEach((circle) => {
    const circleElement = circle as HTMLElement;
    const currentWidth = parseFloat(window.getComputedStyle(circleElement).width) || 32;
    const currentHeight = parseFloat(window.getComputedStyle(circleElement).height) || 32;
    
    // Moderate scaling for circles
    const circleScaleFactor = Math.min(scaleFactor * 0.7, 1.8);
    
    circleElement.style.width = `${currentWidth * circleScaleFactor}px`;
    circleElement.style.height = `${currentHeight * circleScaleFactor}px`;
    circleElement.style.minWidth = `${currentWidth * circleScaleFactor}px`;
    circleElement.style.display = 'flex';
    circleElement.style.justifyContent = 'center';
    circleElement.style.alignItems = 'center';
  });
};
