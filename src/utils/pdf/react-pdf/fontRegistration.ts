
import { Font } from '@react-pdf/renderer';

/**
 * Available font configurations
 */
const FONT_CONFIGS = [
  {
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto-Regular.ttf' },
      { src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 as const }
    ]
  },
  {
    family: 'Merriweather',
    fonts: [
      { src: '/fonts/Merriweather-Regular.ttf' },
      { src: '/fonts/Merriweather-Bold.ttf', fontWeight: 700 as const }
    ]
  },
  {
    family: 'Playfair Display',
    fonts: [
      { src: '/fonts/PlayfairDisplay-Regular.ttf' },
      { src: '/fonts/PlayfairDisplay-Bold.ttf', fontWeight: 700 as const }
    ]
  },
  {
    family: 'Montserrat',
    fonts: [
      { src: '/fonts/Montserrat-Regular.ttf' },
      { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 700 as const }
    ]
  },
  {
    family: 'Open Sans',
    fonts: [
      { src: '/fonts/OpenSans-Regular.ttf' },
      { src: '/fonts/OpenSans-Bold.ttf', fontWeight: 700 as const }
    ]
  },
  {
    family: 'Lora',
    fonts: [
      { src: '/fonts/Lora-Regular.ttf' },
      { src: '/fonts/Lora-Bold.ttf', fontWeight: 700 as const }
    ]
  },
  {
    family: 'Raleway',
    fonts: [
      { src: '/fonts/Raleway-Regular.ttf' },
      { src: '/fonts/Raleway-Bold.ttf', fontWeight: 700 as const }
    ]
  }
];

/**
 * Check if a font file exists by attempting to fetch its header
 */
const checkFontExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Registers fonts with error handling for missing files
 */
export const registerFonts = async () => {
  console.log('Starting font registration for PDF export...');
  
  for (const config of FONT_CONFIGS) {
    try {
      // Check if at least the regular font exists (font without fontWeight or with default weight)
      const regularFont = config.fonts.find(f => !f.fontWeight);
      if (regularFont && await checkFontExists(regularFont.src)) {
        
        // Filter to only include fonts that exist
        const availableFonts = [];
        for (const font of config.fonts) {
          if (await checkFontExists(font.src)) {
            availableFonts.push(font);
          } else {
            console.warn(`Font file not found: ${font.src}`);
          }
        }
        
        if (availableFonts.length > 0) {
          Font.register({
            family: config.family,
            fonts: availableFonts
          });
          console.log(`Successfully registered font: ${config.family} with ${availableFonts.length} variants`);
        }
      } else {
        console.warn(`Skipping font registration for ${config.family} - regular font file not found`);
      }
    } catch (error) {
      console.error(`Failed to register font ${config.family}:`, error);
    }
  }
  
  console.log('Font registration completed');
};

/**
 * Synchronous font registration for backward compatibility
 * This registers fonts without checking if files exist
 */
export const registerFontsSync = () => {
  FONT_CONFIGS.forEach(config => {
    try {
      Font.register({
        family: config.family,
        fonts: config.fonts
      });
      console.log(`Registered font: ${config.family}`);
    } catch (error) {
      console.warn(`Failed to register font ${config.family}:`, error);
    }
  });
};
