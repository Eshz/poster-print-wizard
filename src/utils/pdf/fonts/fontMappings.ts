
/**
 * Font key to font family mappings for PDF export
 * Now uses the same font families as registered with Google Fonts
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
    // Additional fonts with system fallbacks
    'crimsontext': 'Times-Roman',
    'sourceserifpro': 'Times-Roman', 
    'ebgaramond': 'Times-Roman',
    'inter': 'Helvetica',
    'librewilson': 'Times-Roman',
    'nunito': 'Helvetica',
    'cormorantgaramond': 'Times-Roman',
    'worksans': 'Helvetica',
    'oldstandardtt': 'Times-Roman',
    'karla': 'Helvetica',
    'spectral': 'Times-Roman',
    'publicsans': 'Helvetica',
    'vollkorn': 'Times-Roman',
    'firasans': 'Helvetica'
  };
  
  return fontMap[fontKey] || 'Roboto';
};
