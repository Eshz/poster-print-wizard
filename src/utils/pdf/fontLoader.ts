
import { FONT_FAMILIES } from '@/constants/fonts';

/**
 * Preloads all fonts used in the poster preview to ensure they're available for PDF generation
 */
export const preloadFonts = async () => {
  // Create comprehensive font URL with all weights needed
  const fontUrl = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&family=Karla:wght@300;400;500;600;700&family+Spectral:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Vollkorn:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=block';

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
 * Injects CSS with resolved font variables into the cloned element
 */
const injectResolvedFontCSS = (clonedElement: HTMLElement, designSettings?: any) => {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --font-playfair: 'Playfair Display', serif;
      --font-roboto: 'Roboto', sans-serif;
      --font-merriweather: 'Merriweather', serif;
      --font-montserrat: 'Montserrat', sans-serif;
      --font-opensans: 'Open Sans', sans-serif;
      --font-lora: 'Lora', serif;
      --font-raleway: 'Raleway', sans-serif;
      --font-crimsontext: 'Crimson Text', serif;
      --font-sourceserifpro: 'Source Serif Pro', serif;
      --font-ebgaramond: 'EB Garamond', serif;
      --font-inter: 'Inter', sans-serif;
      --font-librewilson: 'Libre Baskerville', serif;
      --font-nunito: 'Nunito', sans-serif;
      --font-cormorantgaramond: 'Cormorant Garamond', serif;
      --font-worksans: 'Work Sans', sans-serif;
      --font-oldstandardtt: 'Old Standard TT', serif;
      --font-karla: 'Karla', sans-serif;
      --font-spectral: 'Spectral', serif;
      --font-publicsans: 'Public Sans', sans-serif;
      --font-vollkorn: 'Vollkorn', serif;
      --font-firasans: 'Fira Sans', sans-serif;
    }
    
    .poster-title {
      font-family: var(--font-${designSettings?.titleFont || 'merriweather'}) !important;
      font-weight: 700 !important;
    }
    
    .poster-body {
      font-family: var(--font-${designSettings?.contentFont || 'roboto'}) !important;
      font-weight: 500 !important;
    }
  `;
  
  // Insert at the beginning of the cloned element
  clonedElement.insertBefore(style, clonedElement.firstChild);
  console.log('Injected resolved font CSS into cloned element');
};

/**
 * Aggressively replaces all CSS variable font references with actual font families
 */
const replaceAllCSSVariableFonts = (element: HTMLElement, designSettings?: any) => {
  // Replace inline style CSS variables
  if (element.style.fontFamily && element.style.fontFamily.includes('var(--font-')) {
    const match = element.style.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Replaced inline CSS variable --font-${fontKey} with ${fontFamily} on element:`, element.tagName);
    }
  }
  
  // Handle computed styles that might still have CSS variables
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.fontFamily && computedStyle.fontFamily.includes('var(--font-')) {
    const match = computedStyle.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Replaced computed CSS variable --font-${fontKey} with ${fontFamily} on element:`, element.tagName);
    }
  }
  
  // Handle poster-specific classes with design settings
  if (designSettings) {
    if (element.classList.contains('poster-title')) {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      element.style.fontFamily = titleFont + ' !important';
      element.style.fontWeight = '700';
      console.log(`Applied title font ${titleFont} to poster-title element`);
    }
    
    if (element.classList.contains('poster-body')) {
      const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
      element.style.fontFamily = contentFont + ' !important';
      element.style.fontWeight = '500';
      console.log(`Applied content font ${contentFont} to poster-body element`);
    }
  }
};

/**
 * Ensures fonts are properly loaded and applied for PDF export
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement, designSettings?: any) => {
  // First preload fonts
  await preloadFonts();
  
  console.log('Starting comprehensive font application for PDF export...');
  console.log('Design settings:', designSettings);
  
  // Inject CSS with resolved font variables
  injectResolvedFontCSS(clonedElement, designSettings);
  
  // Get all elements including the root element
  const allElements = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];
  
  // Replace CSS variables in all elements
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    replaceAllCSSVariableFonts(htmlElement, designSettings);
  });
  
  console.log(`Processed ${allElements.length} elements for font CSS variable replacement`);
  console.log('Font application completed');
  
  // Wait for font application to take effect
  await new Promise(resolve => setTimeout(resolve, 1000));
};
