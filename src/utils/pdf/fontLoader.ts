
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
 * Ensures fonts are properly loaded and applied for PDF export
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement) => {
  // First preload fonts
  await preloadFonts();
  
  // Create a comprehensive CSS variable definition sheet
  const style = document.createElement('style');
  style.textContent = `
    /* Define CSS variables for all fonts matching index.css */
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
    
    /* Font class mappings using CSS variables */
    .font-playfair, .font-playfair * { font-family: var(--font-playfair) !important; }
    .font-roboto, .font-roboto * { font-family: var(--font-roboto) !important; }
    .font-merriweather, .font-merriweather * { font-family: var(--font-merriweather) !important; }
    .font-montserrat, .font-montserrat * { font-family: var(--font-montserrat) !important; }
    .font-opensans, .font-opensans * { font-family: var(--font-opensans) !important; }
    .font-lora, .font-lora * { font-family: var(--font-lora) !important; }
    .font-raleway, .font-raleway * { font-family: var(--font-raleway) !important; }
    .font-crimsontext, .font-crimsontext * { font-family: var(--font-crimsontext) !important; }
    .font-sourceserifpro, .font-sourceserifpro * { font-family: var(--font-sourceserifpro) !important; }
    .font-ebgaramond, .font-ebgaramond * { font-family: var(--font-ebgaramond) !important; }
    .font-inter, .font-inter * { font-family: var(--font-inter) !important; }
    .font-librewilson, .font-librewilson * { font-family: var(--font-librewilson) !important; }
    .font-nunito, .font-nunito * { font-family: var(--font-nunito) !important; }
    .font-cormorantgaramond, .font-cormorantgaramond * { font-family: var(--font-cormorantgaramond) !important; }
    .font-worksans, .font-worksans * { font-family: var(--font-worksans) !important; }
    .font-oldstandardtt, .font-oldstandardtt * { font-family: var(--font-oldstandardtt) !important; }
    .font-karla, .font-karla * { font-family: var(--font-karla) !important; }
    .font-spectral, .font-spectral * { font-family: var(--font-spectral) !important; }
    .font-publicsans, .font-publicsans * { font-family: var(--font-publicsans) !important; }
    .font-vollkorn, .font-vollkorn * { font-family: var(--font-vollkorn) !important; }
    .font-firasans, .font-firasans * { font-family: var(--font-firasans) !important; }
    
    /* Default poster fonts matching index.css */
    .poster-title {
      font-family: var(--font-merriweather) !important;
      font-weight: 700 !important;
    }
    
    .poster-body {
      font-family: var(--font-roboto) !important;
      font-weight: 500 !important;
    }
  `;
  
  // Apply styles to the cloned element
  clonedElement.appendChild(style);
  
  // Wait for fonts to be applied
  await new Promise(resolve => setTimeout(resolve, 500));
};
