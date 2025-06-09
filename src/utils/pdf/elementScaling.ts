
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export at 300 DPI
 */
export const calculateScaleFactor = () => {
  // Calculate the scale factor needed to go from preview size to A0 300 DPI size
  const widthRatio = A0_WIDTH_POINTS / PREVIEW_WIDTH; // 9921 / 800 = ~12.4
  const heightRatio = A0_HEIGHT_POINTS / PREVIEW_HEIGHT; // 14043 / 1131 = ~12.4
  
  // Use the smaller ratio to maintain aspect ratio
  return Math.min(widthRatio, heightRatio);
};

/**
 * Applies scaling to a cloned element for high-DPI PDF export
 */
export const scaleElementForPdf = (clonedElement: HTMLElement) => {
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  const scaleFactor = calculateScaleFactor();
  
  // Set dimensions for A0 PDF export at 300 DPI
  clonedElement.style.width = `${PREVIEW_WIDTH}px`;
  clonedElement.style.height = `${PREVIEW_HEIGHT}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Apply more aggressive scaling for 300 DPI output
  scaleTextElements(clonedElement, scaleFactor);
  scaleSpacing(clonedElement, scaleFactor);
  scaleImages(clonedElement, scaleFactor);
  scaleNumberCircles(clonedElement, scaleFactor);
  
  return scaleFactor;
};

/**
 * Scales text elements appropriately for 300 DPI A0 format
 */
const scaleTextElements = (element: HTMLElement, scaleFactor: number) => {
  const textElements = element.querySelectorAll('*');
  textElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Get the current font size from the preview
    const currentFontSize = parseFloat(computedStyle.fontSize);
    if (currentFontSize > 0) {
      // Scale fonts appropriately for 300 DPI print quality
      const fontScaleFactor = Math.min(scaleFactor * 0.8, 10); // Cap at 10x for readability
      htmlElement.style.fontSize = `${currentFontSize * fontScaleFactor}px`;
    }
    
    // Scale line height proportionally
    const baseLineHeight = parseFloat(computedStyle.lineHeight);
    if (baseLineHeight > 0 && !isNaN(baseLineHeight)) {
      const lineHeightScaleFactor = Math.min(scaleFactor * 0.8, 10);
      htmlElement.style.lineHeight = `${baseLineHeight * lineHeightScaleFactor}px`;
    }
    
    // Handle relative line heights (unitless values)
    if (computedStyle.lineHeight && computedStyle.lineHeight !== 'normal' && !computedStyle.lineHeight.includes('px')) {
      htmlElement.style.lineHeight = computedStyle.lineHeight;
    }
  });
};

/**
 * Scales spacing elements proportionally for 300 DPI
 */
const scaleSpacing = (element: HTMLElement, scaleFactor: number) => {
  const allElements = element.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Scale padding and margins for 300 DPI
    const spacingScaleFactor = Math.min(scaleFactor * 0.9, 12);
    
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
    
    // Scale border width
    const borderWidth = parseFloat(computedStyle.borderWidth);
    if (borderWidth > 0) {
      htmlElement.style.borderWidth = `${borderWidth * spacingScaleFactor}px`;
    }
    
    // Ensure no overflow that could cause scrollbars
    htmlElement.style.overflow = 'hidden';
  });
};

/**
 * Scales images proportionally for 300 DPI
 */
const scaleImages = (element: HTMLElement, scaleFactor: number) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLElement;
    const currentWidth = parseFloat(window.getComputedStyle(imgElement).width);
    const currentHeight = parseFloat(window.getComputedStyle(imgElement).height);
    
    // Scale images for 300 DPI output
    const imageScaleFactor = Math.min(scaleFactor * 1.0, 12);
    
    if (currentWidth > 0) {
      imgElement.style.width = `${currentWidth * imageScaleFactor}px`;
    }
    if (currentHeight > 0) {
      imgElement.style.height = `${currentHeight * imageScaleFactor}px`;
    }
    
    // Ensure images don't cause overflow
    imgElement.style.maxWidth = '100%';
    imgElement.style.maxHeight = '100%';
    imgElement.style.objectFit = 'contain';
  });
};

/**
 * Scales number circles in key takeaways for 300 DPI
 */
const scaleNumberCircles = (element: HTMLElement, scaleFactor: number) => {
  const numberCircles = element.querySelectorAll('[data-circle-number]');
  numberCircles.forEach((circle) => {
    const circleElement = circle as HTMLElement;
    const currentWidth = parseFloat(window.getComputedStyle(circleElement).width) || 32;
    const currentHeight = parseFloat(window.getComputedStyle(circleElement).height) || 32;
    
    // Scale circles for 300 DPI
    const circleScaleFactor = Math.min(scaleFactor * 0.8, 10);
    
    circleElement.style.width = `${currentWidth * circleScaleFactor}px`;
    circleElement.style.height = `${currentHeight * circleScaleFactor}px`;
    circleElement.style.minWidth = `${currentWidth * circleScaleFactor}px`;
    circleElement.style.display = 'flex';
    circleElement.style.justifyContent = 'center';
    circleElement.style.alignItems = 'center';
    circleElement.style.flexShrink = '0';
  });
};
