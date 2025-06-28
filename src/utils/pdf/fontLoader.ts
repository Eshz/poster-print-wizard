
import { FONT_FAMILIES } from '@/constants/fonts';

/**
 * Preloads all fonts used in the poster preview to ensure they're available for PDF generation
 */
export const preloadFonts = async () => {
  // Create comprehensive font URL with all weights needed
  const fontUrl = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&family=Karla:wght@300;400;500;600;700&family=Spectral:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Vollkorn:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=block';

  // Check if fonts are already loaded
  const existingLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
  const alreadyLoaded = existingLinks.some(link => 
    (link as HTMLLinkElement).href.includes('fonts.googleapis.com') && 
    (link as HTMLLinkElement).href.includes('Merriweather')
  );

  if (alreadyLoaded) {
    // Fonts already loaded, just wait for them to be ready
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  // Load fonts
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    link.onload = () => {
      // Wait additional time for fonts to fully load and be applied
      setTimeout(resolve, 1000);
    };
    link.onerror = reject;
    document.head.appendChild(link);
  });
};

/**
 * Font class to font family mapping
 */
const getFontFamilyFromClass = (className: string): string => {
  switch(className) {
    case 'font-playfair': return 'Playfair Display, serif';
    case 'font-roboto': return 'Roboto, sans-serif';
    case 'font-merriweather': return 'Merriweather, serif';
    case 'font-montserrat': return 'Montserrat, sans-serif';
    case 'font-opensans': return 'Open Sans, sans-serif';
    case 'font-lora': return 'Lora, serif';
    case 'font-raleway': return 'Raleway, sans-serif';
    case 'font-crimsontext': return 'Crimson Text, serif';
    case 'font-sourceserifpro': return 'Source Serif Pro, serif';
    case 'font-ebgaramond': return 'EB Garamond, serif';
    case 'font-inter': return 'Inter, sans-serif';
    case 'font-librewilson': return 'Libre Baskerville, serif';
    case 'font-nunito': return 'Nunito, sans-serif';
    case 'font-cormorantgaramond': return 'Cormorant Garamond, serif';
    case 'font-worksans': return 'Work Sans, sans-serif';
    case 'font-oldstandardtt': return 'Old Standard TT, serif';
    case 'font-karla': return 'Karla, sans-serif';
    case 'font-spectral': return 'Spectral, serif';
    case 'font-publicsans': return 'Public Sans, sans-serif';
    case 'font-vollkorn': return 'Vollkorn, serif';
    case 'font-firasans': return 'Fira Sans, sans-serif';
    default: return 'Roboto, sans-serif';
  }
};

/**
 * Directly applies font families to elements based on their classes
 * This bypasses CSS variable issues with html2pdf.js
 */
const applyDirectFontStyles = (element: HTMLElement) => {
  // Get all font classes on this element
  const fontClasses = Array.from(element.classList).filter(cls => cls.startsWith('font-'));
  
  if (fontClasses.length > 0) {
    // Apply the first font class found
    const fontClass = fontClasses[0];
    const fontFamily = getFontFamilyFromClass(fontClass);
    element.style.fontFamily = fontFamily;
    console.log(`Applied font ${fontFamily} to element with class ${fontClass}`);
  }
  
  // Handle poster-specific classes
  if (element.classList.contains('poster-title')) {
    element.style.fontFamily = 'Merriweather, serif';
    element.style.fontWeight = '700';
    console.log('Applied Merriweather to poster-title');
  }
  
  if (element.classList.contains('poster-body')) {
    element.style.fontFamily = 'Roboto, sans-serif';
    element.style.fontWeight = '500';
    console.log('Applied Roboto to poster-body');
  }
};

/**
 * Ensures fonts are properly loaded and applied for PDF export
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement) => {
  // First preload fonts
  await preloadFonts();
  
  console.log('Starting font application for PDF export...');
  
  // Apply fonts directly to all elements with font classes
  const allElements = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];
  
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    applyDirectFontStyles(htmlElement);
  });
  
  console.log('Font application completed');
  
  // Wait for font application to take effect
  await new Promise(resolve => setTimeout(resolve, 500));
};
