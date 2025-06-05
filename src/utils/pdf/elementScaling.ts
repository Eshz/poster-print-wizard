
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export based on the ratio between A0 and preview dimensions
 */
export const calculateScaleFactor = () => {
  // Calculate the scale factor needed to go from preview size to A0 size
  const widthRatio = A0_WIDTH_POINTS / PREVIEW_WIDTH; // 2384 / 800 = ~2.98
  const heightRatio = A0_HEIGHT_POINTS / PREVIEW_HEIGHT; // 3370 / 1131 = ~2.98
  
  // Use the smaller ratio to maintain aspect ratio
  return Math.min(widthRatio, heightRatio);
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
  
  // Apply more conservative scaling that produces appropriate A0 font sizes
  scaleTextElements(clonedElement, scaleFactor);
  scaleSpacing(clonedElement, scaleFactor);
  scaleImages(clonedElement, scaleFactor);
  scaleNumberCircles(clonedElement, scaleFactor);
  
  return scaleFactor;
};

/**
 * Scales text elements with more conservative font sizing for A0 format
 */
const scaleTextElements = (element: HTMLElement, scaleFactor: number) => {
  const textElements = element.querySelectorAll('*');
  textElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Get the current font size from the preview
    const currentFontSize = parseFloat(computedStyle.fontSize);
    if (currentFontSize > 0) {
      // Use a much more conservative scaling factor for fonts
      // Instead of the full scale factor (~3x), use a reduced factor
      const fontScaleFactor = Math.min(scaleFactor * 0.6, 2.5); // Cap at 2.5x and reduce by 40%
      htmlElement.style.fontSize = `${currentFontSize * fontScaleFactor}px`;
    }
    
    // Scale line height proportionally but conservatively
    const baseLineHeight = parseFloat(computedStyle.lineHeight);
    if (baseLineHeight > 0 && !isNaN(baseLineHeight)) {
      const lineHeightScaleFactor = Math.min(scaleFactor * 0.6, 2.5);
      htmlElement.style.lineHeight = `${baseLineHeight * lineHeightScaleFactor}px`;
    }
    
    // Handle relative line heights (unitless values)
    if (computedStyle.lineHeight && computedStyle.lineHeight !== 'normal' && !computedStyle.lineHeight.includes('px')) {
      htmlElement.style.lineHeight = computedStyle.lineHeight;
    }
  });
};

/**
 * Scales spacing elements proportionally to A0 size
 */
const scaleSpacing = (element: HTMLElement, scaleFactor: number) => {
  const allElements = element.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Scale padding and margins with the A0 scale factor
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
    
    // Scale border width
    const borderWidth = parseFloat(computedStyle.borderWidth);
    if (borderWidth > 0) {
      htmlElement.style.borderWidth = `${borderWidth * scaleFactor}px`;
    }
    
    // Ensure no overflow that could cause scrollbars
    htmlElement.style.overflow = 'hidden';
  });
};

/**
 * Scales images proportionally to A0 size
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
 * Scales number circles in key takeaways to A0 size
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
