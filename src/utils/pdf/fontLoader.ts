
/**
 * Preloads all Google Fonts to ensure they're available for PDF generation
 */
export const preloadFonts = async () => {
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
 * Ensures fonts are properly loaded and applied for PDF export
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement) => {
  // First preload all fonts
  await preloadFonts();
  
  // Create a comprehensive style sheet with all font definitions
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Old+Standard+TT:wght@400;700&family=Karla:wght@300;400;500;600;700&family=Spectral:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Vollkorn:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=block');
    
    * {
      font-display: block !important;
    }
    
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
  
  clonedElement.appendChild(style);
  
  // Force apply font styles directly to all elements
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((element) => {
    const el = element as HTMLElement;
    const classes = el.className.split(' ');
    
    classes.forEach(className => {
      if (className.startsWith('font-')) {
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

  // Wait for fonts to be applied
  await new Promise(resolve => setTimeout(resolve, 500));
};
