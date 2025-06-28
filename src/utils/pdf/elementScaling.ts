
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS, PREVIEW_WIDTH_PORTRAIT, PREVIEW_HEIGHT_PORTRAIT, PREVIEW_WIDTH_LANDSCAPE, PREVIEW_HEIGHT_LANDSCAPE } from './pdfConfig';

/**
 * Calculates the scale factor for A0 export at 300 DPI based on orientation
 */
export const calculateScaleFactor = (orientation: 'portrait' | 'landscape' = 'portrait') => {
  const isLandscape = orientation === 'landscape';
  
  // Use appropriate preview dimensions based on orientation
  const previewWidth = isLandscape ? PREVIEW_WIDTH_LANDSCAPE : PREVIEW_WIDTH_PORTRAIT;
  const previewHeight = isLandscape ? PREVIEW_HEIGHT_LANDSCAPE : PREVIEW_HEIGHT_PORTRAIT;
  
  // Use appropriate A0 dimensions based on orientation
  const a0Width = isLandscape ? A0_HEIGHT_POINTS : A0_WIDTH_POINTS;
  const a0Height = isLandscape ? A0_WIDTH_POINTS : A0_HEIGHT_POINTS;
  
  // Calculate the scale factor needed to go from preview size to A0 300 DPI size
  const widthRatio = a0Width / previewWidth;
  const heightRatio = a0Height / previewHeight;
  
  // Use the smaller ratio to maintain aspect ratio
  return Math.min(widthRatio, heightRatio);
};

/**
 * Ensures fonts are properly loaded and applied for PDF export
 */
const ensureFontsLoaded = (clonedElement: HTMLElement) => {
  // Force font loading by adding font-display: block to all font-related styles
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&family=Karla:wght@300;400;500;600;700&family=Spectral:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Vollkorn:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=block');
    
    .font-playfair { font-family: 'Playfair Display', serif !important; }
    .font-roboto { font-family: 'Roboto', sans-serif !important; }
    .font-merriweather { font-family: 'Merriweather', serif !important; }
    .font-montserrat { font-family: 'Montserrat', sans-serif !important; }
    .font-opensans { font-family: 'Open Sans', sans-serif !important; }
    .font-lora { font-family: 'Lora', serif !important; }
    .font-raleway { font-family: 'Raleway', sans-serif !important; }
    .font-crimsontext { font-family: 'Crimson Text', serif !important; }
    .font-sourceserifpro { font-family: 'Source Serif Pro', serif !important; }
    .font-ebgaramond { font-family: 'EB Garamond', serif !important; }
    .font-inter { font-family: 'Inter', sans-serif !important; }
    .font-librewilson { font-family: 'Libre Baskerville', serif !important; }
    .font-nunito { font-family: 'Nunito', sans-serif !important; }
    .font-cormorantgaramond { font-family: 'Cormorant Garamond', serif !important; }
    .font-worksans { font-family: 'Work Sans', sans-serif !important; }
    .font-oldstandardtt { font-family: 'Old Standard TT', serif !important; }
    .font-karla { font-family: 'Karla', sans-serif !important; }
    .font-spectral { font-family: 'Spectral', serif !important; }
    .font-publicsans { font-family: 'Public Sans', sans-serif !important; }
    .font-vollkorn { font-family: 'Vollkorn', serif !important; }
    .font-firasans { font-family: 'Fira Sans', sans-serif !important; }
  `;
  
  clonedElement.appendChild(style);
  
  // Also apply font styles directly to elements with font classes
  const fontElements = clonedElement.querySelectorAll('[class*="font-"]');
  fontElements.forEach((element) => {
    const el = element as HTMLElement;
    const classes = el.className.split(' ');
    
    classes.forEach(className => {
      if (className.startsWith('font-')) {
        // Apply the font family directly to the element's style
        const fontMap: { [key: string]: string } = {
          'font-playfair': 'Playfair Display, serif',
          'font-roboto': 'Roboto, sans-serif',
          'font-merriweather': 'Merriweather, serif',
          'font-montserrat': 'Montserrat, sans-serif',
          'font-opensans': 'Open Sans, sans-serif',
          'font-lora': 'Lora, serif',
          'font-raleway': 'Raleway, sans-serif',
          'font-crimsontext': 'Crimson Text, serif',
          'font-sourceserifpro': 'Source Serif Pro, serif',
          'font-ebgaramond': 'EB Garamond, serif',
          'font-inter': 'Inter, sans-serif',
          'font-librewilson': 'Libre Baskerville, serif',
          'font-nunito': 'Nunito, sans-serif',
          'font-cormorantgaramond': 'Cormorant Garamond, serif',
          'font-worksans': 'Work Sans, sans-serif',
          'font-oldstandardtt': 'Old Standard TT, serif',
          'font-karla': 'Karla, sans-serif',
          'font-spectral': 'Spectral, serif',
          'font-publicsans': 'Public Sans, sans-serif',
          'font-vollkorn': 'Vollkorn, serif',
          'font-firasans': 'Fira Sans, sans-serif'
        };
        
        if (fontMap[className]) {
          el.style.fontFamily = fontMap[className];
        }
      }
    });
  });
};

/**
 * Applies minimal scaling to maintain preview appearance in PDF based on orientation
 */
export const scaleElementForPdf = (clonedElement: HTMLElement, orientation: 'portrait' | 'landscape' = 'portrait') => {
  const isLandscape = orientation === 'landscape';
  
  // Use appropriate preview dimensions based on orientation
  const previewWidth = isLandscape ? PREVIEW_WIDTH_LANDSCAPE : PREVIEW_WIDTH_PORTRAIT;
  const previewHeight = isLandscape ? PREVIEW_HEIGHT_LANDSCAPE : PREVIEW_HEIGHT_PORTRAIT;
  
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  // Set dimensions to match preview exactly based on orientation
  clonedElement.style.width = `${previewWidth}px`;
  clonedElement.style.height = `${previewHeight}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Ensure fonts are properly loaded and applied
  ensureFontsLoaded(clonedElement);
  
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
