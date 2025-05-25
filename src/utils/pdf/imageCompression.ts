
/**
 * Compresses images in the DOM element for better PDF optimization
 */
export const compressImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    
    // Create a canvas to compress the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx && imgElement.complete) {
      // Set canvas dimensions
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      
      // Draw and compress the image
      ctx.drawImage(imgElement, 0, 0);
      
      // Convert to compressed data URL (JPEG with 0.7 quality)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      imgElement.src = compressedDataUrl;
    }
  });
};
