
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export
 * Updated to better match the preview layout
 */
export const calculateScaleFactor = () => {
  // More conservative scaling to match the preview exactly
  return 1.8; // Increased slightly to ensure good quality
};

/**
 * Applies scaling to a cloned element for PDF export
 */
export const scaleElementForPdf = (clonedElement: HTMLElement) => {
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  const scaleFactor = calculateScaleFactor();
  
  // Set dimensions for A0 PDF export - maintain exact aspect ratio
  clonedElement.style.width = `${PREVIEW_WIDTH}px`;
  clonedElement.style.height = `${PREVIEW_HEIGHT}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Apply consistent scaling that matches the preview system
  scaleTextElements(clonedElement, scaleFactor);
  scaleSpacing(clonedElement, scaleFactor);
  scaleImages(clonedElement, scaleFactor);
  scaleNumberCircles(clonedElement, scaleFactor);
  
  return scaleFactor;
};

/**
 * Scales text elements to match preview exactly
 */
const scaleTextElements = (element: HTMLElement, scaleFactor: number) => {
  const textElements = element.querySelectorAll('*');
  textElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Scale font size to match preview
    const fontSize = parseFloat(computedStyle.fontSize);
    if (fontSize > 0) {
      htmlElement.style.fontSize = `${fontSize * scaleFactor}px`;
    }
    
    // Scale line height proportionally
    const lineHeight = parseFloat(computedStyle.lineHeight);
    if (lineHeight > 0 && !isNaN(lineHeight)) {
      htmlElement.style.lineHeight = `${lineHeight * scaleFactor}px`;
    }
  });
};

/**
 * Scales spacing elements proportionally
 */
const scaleSpacing = (element: HTMLElement, scaleFactor: number) => {
  const allElements = element.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Scale padding and margins with full factor to maintain proportions
    ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
     'marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
      const value = parseFloat(computedStyle[prop as any]);
      if (value > 0) {
        (htmlElement.style as any)[prop] = `${value * scaleFactor}px`;
      }
    });
    
    // Scale border radius
    const borderRadius = parseFloat(computedStyle.borderRadius);
    if (borderRadius > 0) {
      htmlElement.style.borderRadius = `${borderRadius * scaleFactor}px`;
    }
    
    // Scale gaps for grid and flex layouts
    const gap = parseFloat(computedStyle.gap);
    if (gap > 0) {
      htmlElement.style.gap = `${gap * scaleFactor}px`;
    }
    
    // Ensure no overflow that could cause scrollbars
    htmlElement.style.overflow = 'hidden';
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
    
    if (currentWidth > 0) {
      imgElement.style.width = `${currentWidth * scaleFactor}px`;
    }
    if (currentHeight > 0) {
      imgElement.style.height = `${currentHeight * scaleFactor}px`;
    }
    
    // Ensure images don't cause overflow
    imgElement.style.maxWidth = '100%';
    imgElement.style.maxHeight = '100%';
    imgElement.style.objectFit = 'contain';
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
    
    circleElement.style.width = `${currentWidth * scaleFactor}px`;
    circleElement.style.height = `${currentHeight * scaleFactor}px`;
    circleElement.style.minWidth = `${currentWidth * scaleFactor}px`;
    circleElement.style.display = 'flex';
    circleElement.style.justifyContent = 'center';
    circleElement.style.alignItems = 'center';
    circleElement.style.flexShrink = '0';
  });
};
