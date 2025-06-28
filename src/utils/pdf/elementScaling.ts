
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH_PORTRAIT, PREVIEW_HEIGHT_PORTRAIT } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export at 300 DPI
 */
export const calculateScaleFactor = () => {
  // Calculate the scale factor needed to go from preview size to A0 300 DPI size
  const widthRatio = A0_WIDTH_POINTS / PREVIEW_WIDTH_PORTRAIT; // 2384 / 800 = ~2.98
  const heightRatio = A0_HEIGHT_POINTS / PREVIEW_HEIGHT_PORTRAIT; // 3370 / 1131 = ~2.98
  
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
  clonedElement.style.width = `${PREVIEW_WIDTH_PORTRAIT}px`;
  clonedElement.style.height = `${PREVIEW_HEIGHT_PORTRAIT}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'visible';
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
    imgElement.style.position = 'relative';
    imgElement.style.zIndex = '1';
    
    // Remove any transforms or filters that might hide the image
    imgElement.style.transform = 'none';
    imgElement.style.filter = 'none';
    
    // Force load images that might not be loaded yet
    if (!imgElement.complete) {
      imgElement.loading = 'eager';
    }
    
    // For QR codes, convert to data URL to avoid CORS issues
    if (imgElement.src.includes('qrserver.com')) {
      // Create a canvas to convert the QR image to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx && imgElement.complete) {
        canvas.width = imgElement.naturalWidth || 150;
        canvas.height = imgElement.naturalHeight || 150;
        
        try {
          ctx.drawImage(imgElement, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          imgElement.src = dataUrl;
        } catch (error) {
          console.log('Could not convert QR image, keeping original:', error);
        }
      }
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
    htmlElement.style.overflow = 'visible';
    htmlElement.style.overflowX = 'visible';
    htmlElement.style.overflowY = 'visible';
    htmlElement.style.scrollBehavior = 'auto';
  });
};
