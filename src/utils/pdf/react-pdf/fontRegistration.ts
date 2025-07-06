
import { Font } from '@react-pdf/renderer';

/**
 * Available font configurations with proper fallbacks
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
 * Simple synchronous font registration with built-in fallbacks
 */
export const registerFontsSync = () => {
  console.log('🎨 Starting font registration for PDF export...');
  
  let successCount = 0;
  let failureCount = 0;
  
  FONT_CONFIGS.forEach(config => {
    try {
      Font.register({
        family: config.family,
        fonts: config.fonts
      });
      console.log(`✅ Registered font: ${config.family}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to register font ${config.family}:`, error);
      failureCount++;
    }
  });
  
  // Register system font fallbacks if local fonts fail
  try {
    Font.register({
      family: 'System Sans',
      fonts: [
        { src: 'Helvetica' },
        { src: 'Helvetica-Bold', fontWeight: 700 as const }
      ]
    });
    Font.register({
      family: 'System Serif',
      fonts: [
        { src: 'Times-Roman' },
        { src: 'Times-Bold', fontWeight: 700 as const }
      ]
    });
    console.log('✅ Registered system fallback fonts');
  } catch (error) {
    console.warn('⚠️ System fallback fonts not available:', error);
  }
  
  console.log(`🎨 Font registration completed: ${successCount} successful, ${failureCount} failed`);
  
  if (successCount === 0) {
    console.warn('⚠️ No custom fonts were registered, using system fonts');
  }
  
  return successCount > 0;
};

/**
 * Async version with font existence checking - only use if sync fails
 */
export const registerFonts = async () => {
  console.log('🔄 Attempting async font registration...');
  
  const checkFontExists = async (src: string): Promise<boolean> => {
    try {
      const response = await fetch(src, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  for (const config of FONT_CONFIGS) {
    try {
      const regularFont = config.fonts.find(f => !f.fontWeight);
      if (regularFont && await checkFontExists(regularFont.src)) {
        const availableFonts = [];
        for (const font of config.fonts) {
          if (await checkFontExists(font.src)) {
            availableFonts.push(font);
          }
        }
        
        if (availableFonts.length > 0) {
          Font.register({
            family: config.family,
            fonts: availableFonts
          });
          console.log(`✅ Async registered font: ${config.family}`);
        }
      }
    } catch (error) {
      console.error(`❌ Async font registration failed for ${config.family}:`, error);
    }
  }
};
