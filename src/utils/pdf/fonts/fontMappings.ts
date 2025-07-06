
/**
 * Font key to font family mappings with system fallbacks
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
    
    // Fallbacks for fonts without TTF files
    'crimsontext': 'System Serif',
    'sourceserifpro': 'System Serif',
    'ebgaramond': 'System Serif',
    'inter': 'System Sans',
    'librewilson': 'System Serif',
    'nunito': 'System Sans',
    'cormorantgaramond': 'System Serif',
    'worksans': 'System Sans',
    'oldstandardtt': 'System Serif',
    'karla': 'System Sans',
    'spectral': 'System Serif',
    'publicsans': 'System Sans',
    'vollkorn': 'System Serif',
    'firasans': 'System Sans'
  };
  
  const mappedFont = fontMap[fontKey];
  if (!mappedFont) {
    console.warn(`Unknown font key: ${fontKey}, falling back to System Sans`);
    return 'System Sans';
  }
  
  return mappedFont;
};

/**
 * Get available fonts that have TTF files or system fallbacks
 */
export const getAvailableFonts = (): string[] => {
  return [
    'Roboto',
    'Merriweather', 
    'Playfair Display',
    'Montserrat',
    'Open Sans',
    'Lora',
    'Raleway',
    'System Sans',
    'System Serif'
  ];
};

/**
 * Check if a font is available for PDF export
 */
export const isFontAvailable = (fontFamily: string): boolean => {
  return getAvailableFonts().includes(fontFamily);
};
