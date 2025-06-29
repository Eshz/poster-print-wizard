
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
 * Get font family from font key used in design settings
 */
const getFontFamilyFromKey = (fontKey: string): string => {
  switch(fontKey) {
    case 'playfair': return 'Playfair Display, serif';
    case 'roboto': return 'Roboto, sans-serif';
    case 'merriweather': return 'Merriweather, serif';
    case 'montserrat': return 'Montserrat, sans-serif';
    case 'opensans': return 'Open Sans, sans-serif';
    case 'lora': return 'Lora, serif';
    case 'raleway': return 'Raleway, sans-serif';
    case 'crimsontext': return 'Crimson Text, serif';
    case 'sourceserifpro': return 'Source Serif Pro, serif';
    case 'ebgaramond': return 'EB Garamond, serif';
    case 'inter': return 'Inter, sans-serif';
    case 'librewilson': return 'Libre Baskerville, serif';
    case 'nunito': return 'Nunito, sans-serif';
    case 'cormorantgaramond': return 'Cormorant Garamond, serif';
    case 'worksans': return 'Work Sans, sans-serif';
    case 'oldstandardtt': return 'Old Standard TT, serif';
    case 'karla': return 'Karla, sans-serif';
    case 'spectral': return 'Spectral, serif';
    case 'publicsans': return 'Public Sans, sans-serif';
    case 'vollkorn': return 'Vollkorn, serif';
    case 'firasans': return 'Fira Sans, sans-serif';
    default: return 'Roboto, sans-serif';
  }
};

/**
 * Directly applies font families to elements based on their classes and inline styles
 */
const applyDirectFontStyles = (element: HTMLElement, designSettings?: any) => {
  // Get all font classes on this element
  const fontClasses = Array.from(element.classList).filter(cls => cls.startsWith('font-'));
  
  if (fontClasses.length > 0) {
    // Apply the first font class found
    const fontClass = fontClasses[0];
    const fontFamily = getFontFamilyFromClass(fontClass);
    element.style.fontFamily = fontFamily;
    console.log(`Applied font ${fontFamily} to element with class ${fontClass}`);
  }
  
  // Handle Academic Modern layout specific font variables
  if (designSettings && element.style.fontFamily && element.style.fontFamily.includes('var(--font-')) {
    const match = element.style.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Applied font ${fontFamily} from CSS variable --font-${fontKey}`);
    }
  }
  
  // Handle elements with computed styles that use CSS variables
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.fontFamily && computedStyle.fontFamily.includes('var(--font-')) {
    // Extract the font key from the CSS variable
    const match = computedStyle.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Applied font ${fontFamily} from computed CSS variable --font-${fontKey}`);
    }
  }
  
  // Handle poster-specific classes
  if (element.classList.contains('poster-title')) {
    const titleFont = designSettings?.titleFont || 'merriweather';
    element.style.fontFamily = getFontFamilyFromKey(titleFont);
    element.style.fontWeight = '700';
    console.log(`Applied ${titleFont} to poster-title`);
  }
  
  if (element.classList.contains('poster-body')) {
    const contentFont = designSettings?.contentFont || 'roboto';
    element.style.fontFamily = getFontFamilyFromKey(contentFont);
    element.style.fontWeight = '500';
    console.log(`Applied ${contentFont} to poster-body`);
  }
};

/**
 * Ensures fonts are properly loaded and applied for PDF export
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement, designSettings?: any) => {
  // First preload fonts
  await preloadFonts();
  
  console.log('Starting font application for PDF export...');
  
  // Apply fonts directly to all elements with font classes
  const allElements = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];
  
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    applyDirectFontStyles(htmlElement, designSettings);
  });
  
  console.log('Font application completed');
  
  // Wait for font application to take effect
  await new Promise(resolve => setTimeout(resolve, 500));
};
