
import { FONT_FAMILIES } from '@/constants/fonts';

/**
 * Preloads all fonts used in the poster preview to ensure they're available for PDF generation
 */
export const preloadFonts = async () => {
  // Create font URLs based on the actual fonts used in the preview
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

  // Load all fonts simultaneously
  const loadPromises = fontUrls.map(url => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = resolve;
      link.onerror = reject;
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
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement) => {
  // First preload all fonts
  await preloadFonts();
  
  // Create a comprehensive style sheet with all font definitions matching the preview
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&family=Karla:wght@300;400;500;600;700&family=Spectral:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Vollkorn:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=block');
    
    * {
      font-display: block !important;
    }
    
    /* Use the exact same font class mappings as in the preview */
    .font-playfair, .font-playfair * { font-family: '${FONT_FAMILIES.playfair}', serif !important; }
    .font-roboto, .font-roboto * { font-family: '${FONT_FAMILIES.roboto}', sans-serif !important; }
    .font-merriweather, .font-merriweather * { font-family: '${FONT_FAMILIES.merriweather}', serif !important; }
    .font-montserrat, .font-montserrat * { font-family: '${FONT_FAMILIES.montserrat}', sans-serif !important; }
    .font-opensans, .font-opensans * { font-family: '${FONT_FAMILIES.opensans}', sans-serif !important; }
    .font-lora, .font-lora * { font-family: '${FONT_FAMILIES.lora}', serif !important; }
    .font-raleway, .font-raleway * { font-family: '${FONT_FAMILIES.raleway}', sans-serif !important; }
    .font-crimsontext, .font-crimsontext * { font-family: '${FONT_FAMILIES.crimsontext}', serif !important; }
    .font-sourceserifpro, .font-sourceserifpro * { font-family: '${FONT_FAMILIES.sourceserifpro}', serif !important; }
    .font-ebgaramond, .font-ebgaramond * { font-family: '${FONT_FAMILIES.ebgaramond}', serif !important; }
    .font-inter, .font-inter * { font-family: '${FONT_FAMILIES.inter}', sans-serif !important; }
    .font-librewilson, .font-librewilson * { font-family: '${FONT_FAMILIES.librewilson}', serif !important; }
    .font-nunito, .font-nunito * { font-family: '${FONT_FAMILIES.nunito}', sans-serif !important; }
    .font-cormorantgaramond, .font-cormorantgaramond * { font-family: '${FONT_FAMILIES.cormorantgaramond}', serif !important; }
    .font-worksans, .font-worksans * { font-family: '${FONT_FAMILIES.worksans}', sans-serif !important; }
    .font-oldstandardtt, .font-oldstandardtt * { font-family: '${FONT_FAMILIES.oldstandardtt}', serif !important; }
    .font-karla, .font-karla * { font-family: '${FONT_FAMILIES.karla}', sans-serif !important; }
    .font-spectral, .font-spectral * { font-family: '${FONT_FAMILIES.spectral}', serif !important; }
    .font-publicsans, .font-publicsans * { font-family: '${FONT_FAMILIES.publicsans}', sans-serif !important; }
    .font-vollkorn, .font-vollkorn * { font-family: '${FONT_FAMILIES.vollkorn}', serif !important; }
    .font-firasans, .font-firasans * { font-family: '${FONT_FAMILIES.firasans}', sans-serif !important; }
  `;
  
  clonedElement.appendChild(style);
  
  // Force apply font styles directly to all elements using the same mapping as preview
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((element) => {
    const el = element as HTMLElement;
    const classes = el.className.split(' ');
    
    classes.forEach(className => {
      if (className.startsWith('font-')) {
        // Use the same font mapping as the preview (from fontUtils.ts logic)
        const fontMap: { [key: string]: string } = {
          'font-playfair': `${FONT_FAMILIES.playfair}, serif`,
          'font-roboto': `${FONT_FAMILIES.roboto}, sans-serif`,
          'font-merriweather': `${FONT_FAMILIES.merriweather}, serif`,
          'font-montserrat': `${FONT_FAMILIES.montserrat}, sans-serif`,
          'font-opensans': `${FONT_FAMILIES.opensans}, sans-serif`,
          'font-lora': `${FONT_FAMILIES.lora}, serif`,
          'font-raleway': `${FONT_FAMILIES.raleway}, sans-serif`,
          'font-crimsontext': `${FONT_FAMILIES.crimsontext}, serif`,
          'font-sourceserifpro': `${FONT_FAMILIES.sourceserifpro}, serif`,
          'font-ebgaramond': `${FONT_FAMILIES.ebgaramond}, serif`,
          'font-inter': `${FONT_FAMILIES.inter}, sans-serif`,
          'font-librewilson': `${FONT_FAMILIES.librewilson}, serif`,
          'font-nunito': `${FONT_FAMILIES.nunito}, sans-serif`,
          'font-cormorantgaramond': `${FONT_FAMILIES.cormorantgaramond}, serif`,
          'font-worksans': `${FONT_FAMILIES.worksans}, sans-serif`,
          'font-oldstandardtt': `${FONT_FAMILIES.oldstandardtt}, serif`,
          'font-karla': `${FONT_FAMILIES.karla}, sans-serif`,
          'font-spectral': `${FONT_FAMILIES.spectral}, serif`,
          'font-publicsans': `${FONT_FAMILIES.publicsans}, sans-serif`,
          'font-vollkorn': `${FONT_FAMILIES.vollkorn}, serif`,
          'font-firasans': `${FONT_FAMILIES.firasans}, sans-serif`
        };
        
        if (fontMap[className]) {
          el.style.fontFamily = fontMap[className];
        }
      }
    });
  });

  // Wait for fonts to be applied
  await new Promise(resolve => setTimeout(resolve, 500));
};
