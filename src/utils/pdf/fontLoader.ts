
import { FONT_FAMILIES } from '@/constants/fonts';

/**
 * Preloads all fonts used in the poster preview to ensure they're available for PDF generation
 * This process is now completely invisible and won't affect the preview
 */
export const preloadFonts = async () => {
  // Create font URLs based on the actual fonts used in the preview - matching FONT_FAMILIES exactly
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=block',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=block',
    'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=block',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=block',
    'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=block',
    'https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;500;600;700&display=block',
    'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&display=block'
  ];

  // Check if fonts are already loaded to avoid duplicate loading
  const existingLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
  const alreadyLoadedUrls = existingLinks.map(link => (link as HTMLLinkElement).href);

  // Only load fonts that aren't already loaded
  const urlsToLoad = fontUrls.filter(url => !alreadyLoadedUrls.some(loaded => loaded.includes(url.split('?')[0])));

  if (urlsToLoad.length === 0) {
    // All fonts already loaded, just wait a bit for them to be ready
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  // Load fonts that aren't already loaded
  const loadPromises = urlsToLoad.map(url => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = resolve;
      link.onerror = reject;
      // Append to head but make it invisible
      link.style.display = 'none';
      document.head.appendChild(link);
    });
  });

  try {
    await Promise.all(loadPromises);
    // Wait additional time for fonts to fully load
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.warn('Some fonts failed to load:', error);
  }
};

/**
 * Ensures fonts are properly loaded and applied for PDF export using the same fonts as the preview
 * This function now works completely in the background without affecting the visible preview
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement) => {
  // First preload all fonts silently
  await preloadFonts();
  
  // Create a comprehensive style sheet with all font definitions matching the preview exactly
  // This will only be applied to the cloned element, not the preview
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&family=Karla:wght@300;400;500;600;700&family=Spectral:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Vollkorn:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=block');
    
    * {
      font-display: block !important;
    }
    
    /* Use the exact same font class mappings as in the preview - matching FONT_FAMILIES constants */
    .font-playfair, .font-playfair * { font-family: 'Playfair Display', serif !important; }
    .font-roboto, .font-roboto * { font-family: 'Roboto', sans-serif !important; }
    .font-merriweather, .font-merriweather * { font-family: 'Merriweather', serif !important; }
    .font-montserrat, .font-montserrat * { font-family: 'Montserrat', sans-serif !important; }
    .font-opensans, .font-opensans * { font-family: 'Open Sans', sans-serif !important; }
    .font-lora, .font-lora * { font-family: 'Lora', serif !important; }
    .font-raleway, .font-raleway * { font-family: 'Raleway', sans-serif !important; }
    .font-crimsontext, .font-crimsontext * { font-family: 'Crimson Text', serif !important; }
    .font-sourceserifpro, .font-sourceserifpro * { font-family: 'Source Serif Pro', serif !important; }
    .font-ebgaramond, .font-ebgaramond * { font-family: 'EB Garamond', serif !important; }
    .font-inter, .font-inter * { font-family: 'Inter', sans-serif !important; }
    .font-librewilson, .font-librewilson * { font-family: 'Libre Baskerville', serif !important; }
    .font-nunito, .font-nunito * { font-family: 'Nunito', sans-serif !important; }
    .font-cormorantgaramond, .font-cormorantgaramond * { font-family: 'Cormorant Garamond', serif !important; }
    .font-worksans, .font-worksans * { font-family: 'Work Sans', sans-serif !important; }
    .font-oldstandardtt, .font-oldstandardtt * { font-family: 'Old Standard TT', serif !important; }
    .font-karla, .font-karla * { font-family: 'Karla', sans-serif !important; }
    .font-spectral, .font-spectral * { font-family: 'Spectral', serif !important; }
    .font-publicsans, .font-publicsans * { font-family: 'Public Sans', sans-serif !important; }
    .font-vollkorn, .font-vollkorn * { font-family: 'Vollkorn', serif !important; }
    .font-firasans, .font-firasans * { font-family: 'Fira Sans', sans-serif !important; }
  `;
  
  // Only apply styles to the cloned element (not the preview)
  clonedElement.appendChild(style);
  
  // Force apply font styles directly to all elements using the exact same mapping as preview
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((element) => {
    const el = element as HTMLElement;
    const classes = el.className.split(' ');
    
    classes.forEach(className => {
      if (className.startsWith('font-')) {
        // Use the exact same font mapping as the preview - matching FONT_FAMILIES constants
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
          el.style.fontDisplay = 'block';
        }
      }
    });
  });

  // Wait for fonts to be applied
  await new Promise(resolve => setTimeout(resolve, 500));
};
