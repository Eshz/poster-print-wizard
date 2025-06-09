
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH, PREVIEW_HEIGHT } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export at 300 DPI
 */
export const calculateScaleFactor = () => {
  // Calculate the scale factor needed to go from preview size to A0 300 DPI size
  const widthRatio = A0_WIDTH_POINTS / PREVIEW_WIDTH; // 2384 / 800 = ~2.98
  const heightRatio = A0_HEIGHT_POINTS / PREVIEW_HEIGHT; // 3370 / 1131 = ~2.98
  
  // Use the smaller ratio to maintain aspect ratio
  return Math.min(widthRatio, heightRatio);
};

/**
 * Applies minimal scaling to maintain preview appearance in PDF
 */
export const scaleElementForPdf = (clonedElement: HTMLElement) => {
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  // Set dimensions to match preview exactly
  clonedElement.style.width = `${PREVIEW_WIDTH}px`;
  clonedElement.style.height = `${PREVIEW_HEIGHT}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Ensure QR images and other images are properly handled
  prepareImagesForPdf(clonedElement);
  
  // Only apply minimal cleanup without aggressive scaling
  removeScrollbars(clonedElement);
  
  return 1; // Return scale factor of 1 to maintain original sizing
};

/**
 * Prepares images for PDF export, ensuring QR codes and other images are properly handled
 */
const prepareImagesForPdf = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    
    // Ensure images are displayed and not hidden
    imgElement.style.display = 'block';
    imgElement.style.visibility = 'visible';
    imgElement.style.opacity = '1';
    
    // Force load images that might not be loaded yet
    if (!imgElement.complete) {
      imgElement.loading = 'eager';
    }
    
    // For QR codes and external images, ensure proper crossOrigin handling
    if (imgElement.src.includes('qrserver.com') || imgElement.src.startsWith('http')) {
      imgElement.crossOrigin = 'anonymous';
      // Force reload to ensure image is available
      const originalSrc = imgElement.src;
      imgElement.src = '';
      imgElement.src = originalSrc;
    }
    
    // Ensure images maintain their aspect ratio
    imgElement.style.objectFit = 'contain';
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
  });
};

/**
 * Removes scrollbars and ensures proper visibility
 */
const removeScrollbars = (element: HTMLElement) => {
  const allElements = element.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.visibility = 'visible';
    htmlElement.style.opacity = '1';
    htmlElement.style.overflow = 'hidden';
    htmlElement.style.overflowX = 'hidden';
    htmlElement.style.overflowY = 'hidden';
    htmlElement.style.scrollBehavior = 'auto';
  });
};
