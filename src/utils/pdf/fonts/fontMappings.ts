
/**
 * Font key to font family mappings for PDF export with fallbacks
 */
export const getFontFamilyFromKey = (fontKey: string): string => {
  const fontMap: { [key: string]: string } = {
    'playfair': 'Playfair Display',
    'roboto': 'Roboto', 
    'merriweather': 'Merriweather',
    'montserrat': 'Montserrat',
    'opensans': 'Open Sans',
    'lora': 'Lora',
    'raleway': 'Raleway',
    'crimsontext': 'Roboto', // Fallback to Roboto if not available
    'sourceserifpro': 'Merriweather', // Fallback to Merriweather
    'ebgaramond': 'Merriweather', // Fallback to Merriweather
    'inter': 'Roboto', // Fallback to Roboto
    'librewilson': 'Merriweather', // Fallback to Merriweather
    'nunito': 'Roboto', // Fallback to Roboto
    'cormorantgaramond': 'Merriweather', // Fallback to Merriweather
    'worksans': 'Roboto', // Fallback to Roboto
    'oldstandardtt': 'Merriweather', // Fallback to Merriweather
    'karla': 'Roboto', // Fallback to Roboto
    'spectral': 'Merriweather', // Fallback to Merriweather
    'publicsans': 'Roboto', // Fallback to Roboto
    'vollkorn': 'Merriweather', // Fallback to Merriweather
    'firasans': 'Roboto' // Fallback to Roboto
  };
  
  const mappedFont = fontMap[fontKey];
  if (!mappedFont) {
    console.warn(`Unknown font key: ${fontKey}, falling back to Roboto`);
    return 'Roboto';
  }
  
  return mappedFont;
};

/**
 * Get available fonts that have TTF files
 */
export const getAvailableFonts = (): string[] => {
  return [
    'Roboto',
    'Merriweather', 
    'Playfair Display',
    'Montserrat',
    'Open Sans',
    'Lora',
    'Raleway'
  ];
};

/**
 * Check if a font is available for PDF export
 */
export const isFontAvailable = (fontFamily: string): boolean => {
  return getAvailableFonts().includes(fontFamily);
};
