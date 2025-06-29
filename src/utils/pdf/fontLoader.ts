
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
 * Aggressively replaces ALL CSS variable font references with actual font families
 */
const replaceAllCSSVariableFonts = (element: HTMLElement, designSettings?: any) => {
  // Replace inline style CSS variables
  if (element.style.fontFamily && element.style.fontFamily.includes('var(--font-')) {
    const match = element.style.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Replaced inline CSS variable --font-${fontKey} with ${fontFamily} on element:`, element.tagName, element.className);
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
      console.log(`Replaced computed CSS variable --font-${fontKey} with ${fontFamily} on element:`, element.tagName, element.className);
    }
  }
  
  // Handle Tailwind font classes by converting them to inline styles
  const classList = Array.from(element.classList);
  const fontClass = classList.find(cls => cls.startsWith('font-'));
  if (fontClass && fontClass !== 'font-bold' && fontClass !== 'font-medium' && fontClass !== 'font-normal') {
    const fontKey = fontClass.replace('font-', '');
    const fontFamily = getFontFamilyFromKey(fontKey);
    element.style.fontFamily = fontFamily;
    console.log(`Applied font from Tailwind class ${fontClass} -> ${fontFamily} on element:`, element.tagName);
  }
  
  // Handle poster-specific classes with design settings
  if (designSettings) {
    if (element.classList.contains('poster-title') || element.tagName === 'H1' || element.tagName === 'H2') {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      element.style.fontFamily = titleFont;
      element.style.fontWeight = '700';
      console.log(`Applied title font ${titleFont} to ${element.tagName} element with classes:`, element.className);
    }
    
    if (element.classList.contains('poster-body') || element.tagName === 'P' || element.tagName === 'DIV') {
      // Only apply content font to elements that don't already have a specific font
      if (!element.style.fontFamily || element.style.fontFamily.includes('var(--font-')) {
        const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
        element.style.fontFamily = contentFont;
        element.style.fontWeight = '400';
        console.log(`Applied content font ${contentFont} to ${element.tagName} element with classes:`, element.className);
      }
    }
  }
};

/**
 * Injects comprehensive CSS with all font families resolved
 */
const injectResolvedFontCSS = (clonedElement: HTMLElement, designSettings?: any) => {
  const style = document.createElement('style');
  const titleFont = getFontFamilyFromKey(designSettings?.titleFont || 'merriweather');
  const contentFont = getFontFamilyFromKey(designSettings?.contentFont || 'roboto');
  
  style.textContent = `
    /* Resolve all CSS font variables */
    :root {
      --font-playfair: 'Playfair Display', serif !important;
      --font-roboto: 'Roboto', sans-serif !important;
      --font-merriweather: 'Merriweather', serif !important;
      --font-montserrat: 'Montserrat', sans-serif !important;
      --font-opensans: 'Open Sans', sans-serif !important;
      --font-lora: 'Lora', serif !important;
      --font-raleway: 'Raleway', sans-serif !important;
      --font-crimsontext: 'Crimson Text', serif !important;
      --font-sourceserifpro: 'Source Serif Pro', serif !important;
      --font-ebgaramond: 'EB Garamond', serif !important;
      --font-inter: 'Inter', sans-serif !important;
      --font-librewilson: 'Libre Baskerville', serif !important;
      --font-nunito: 'Nunito', sans-serif !important;
      --font-cormorantgaramond: 'Cormorant Garamond', serif !important;
      --font-worksans: 'Work Sans', sans-serif !important;
      --font-oldstandardtt: 'Old Standard TT', serif !important;
      --font-karla: 'Karla', sans-serif !important;
      --font-spectral: 'Spectral', serif !important;
      --font-publicsans: 'Public Sans', sans-serif !important;
      --font-vollkorn: 'Vollkorn', serif !important;
      --font-firasans: 'Fira Sans', sans-serif !important;
    }
    
    /* Apply fonts to all common elements */
    .poster-title, h1, h2, h3 {
      font-family: ${titleFont} !important;
      font-weight: 700 !important;
    }
    
    .poster-body, p, div:not(.poster-title):not(h1):not(h2):not(h3) {
      font-family: ${contentFont} !important;
    }
    
    /* Tailwind font classes - force override */
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
  
  // Insert at the beginning of the cloned element
  clonedElement.insertBefore(style, clonedElement.firstChild);
  console.log('Injected comprehensive resolved font CSS into cloned element with settings:', designSettings);
};

/**
 * Ensures fonts are properly loaded and applied for PDF export across ALL layouts
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement, designSettings?: any) => {
  // First preload fonts
  await preloadFonts();
  
  console.log('Starting comprehensive font application for ALL poster layouts...');
  console.log('Design settings:', designSettings);
  
  // Inject comprehensive CSS with resolved font variables
  injectResolvedFontCSS(clonedElement, designSettings);
  
  // Get all elements including the root element
  const allElements = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];
  
  // Replace CSS variables in ALL elements
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    replaceAllCSSVariableFonts(htmlElement, designSettings);
  });
  
  console.log(`Processed ${allElements.length} elements for comprehensive font CSS variable replacement`);
  console.log('Comprehensive font application completed for all layouts');
  
  // Wait longer for font application to take effect
  await new Promise(resolve => setTimeout(resolve, 1500));
};
