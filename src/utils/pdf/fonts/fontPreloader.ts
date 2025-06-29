
/**
 * Font preloading utilities for PDF export
 */

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
