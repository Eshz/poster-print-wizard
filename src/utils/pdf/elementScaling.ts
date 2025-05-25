
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Calculates the uniform scale factor for A0 export
 */
export const calculateScaleFactor = () => {
  const scaleX = A0_WIDTH_POINTS / PREVIEW_WIDTH;
  const scaleY = A0_HEIGHT_POINTS / PREVIEW_HEIGHT;
  return Math.min(scaleX, scaleY);
};

/**
 * Applies scaling to a cloned element for PDF export
 */
export const scaleElementForPdf = (clonedElement: HTMLElement) => {
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  const scaleFactor = calculateScaleFactor();
  
  // Set exact dimensions for PDF maintaining aspect ratio
  clonedElement.style.width = `${PREVIEW_WIDTH * scaleFactor}px`;
  clonedElement.style.height = `${PREVIEW_HEIGHT * scaleFactor}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Scale all elements proportionally
  scaleAllElements(clonedElement, scaleFactor);
  scaleImages(clonedElement, scaleFactor);
  scaleNumberCircles(clonedElement, scaleFactor);
  
  return scaleFactor;
};

/**
 * Scales all text elements and spacing proportionally
 */
const scaleAllElements = (element: HTMLElement, scaleFactor: number) => {
  const allTextElements = element.querySelectorAll('*');
  allTextElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    
    // Scale font size
    const fontSize = parseFloat(computedStyle.fontSize);
    if (fontSize > 0) {
      htmlElement.style.fontSize = `${fontSize * scaleFactor}px`;
    }
    
    // Scale padding and margins
    const padding = parseFloat(computedStyle.padding);
    if (padding > 0) {
      htmlElement.style.padding = `${padding * scaleFactor}px`;
    }
    
    const margin = parseFloat(computedStyle.margin);
    if (margin > 0) {
      htmlElement.style.margin = `${margin * scaleFactor}px`;
    }
    
    // Scale specific spacing properties
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
  });
};
