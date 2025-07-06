
import { Font } from '@react-pdf/renderer';

/**
 * Font URLs from Google Fonts for reliable web-based loading
 */
const FONT_URLS = {
  roboto: {
    normal: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
    bold: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2'
  },
  merriweather: {
    normal: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZMdeX3rsHo.woff2',
    bold: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRZWMf6hPvhPQ.woff2'
  }
};

let fontsRegistered = false;

/**
 * Registers fonts for react-pdf using Google Fonts URLs
 */
export const registerPdfFonts = async (): Promise<boolean> => {
  // Skip if already registered
  if (fontsRegistered) {
    console.log('PDF fonts already registered');
    return true;
  }

  try {
    console.log('Registering PDF fonts from Google Fonts...');
    
    // Register Roboto font family
    Font.register({
      family: 'Roboto',
      fonts: [
        { 
          src: FONT_URLS.roboto.normal,
          fontWeight: 'normal'
        },
        { 
          src: FONT_URLS.roboto.bold,
          fontWeight: 'bold' 
        }
      ]
    });

    // Register Merriweather font family
    Font.register({
      family: 'Merriweather',
      fonts: [
        { 
          src: FONT_URLS.merriweather.normal,
          fontWeight: 'normal'
        },
        { 
          src: FONT_URLS.merriweather.bold,
          fontWeight: 'bold' 
        }
      ]
    });

    fontsRegistered = true;
    console.log('PDF fonts registered successfully');
    return true;
  } catch (error) {
    console.error('Failed to register PDF fonts:', error);
    // Don't fail the export if fonts fail to register
    return false;
  }
};

/**
 * Validates that fonts are properly registered
 */
export const validateFontRegistration = (): boolean => {
  return fontsRegistered;
};
