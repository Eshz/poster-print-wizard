
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
    console.log(`🔍 Checking font existence: ${src}`);
    const response = await fetch(src, { method: 'HEAD' });
    const exists = response.ok;
    console.log(`${exists ? '✅' : '❌'} Font ${src}: ${exists ? 'exists' : 'not found'}`);
    return exists;
  } catch (error) {
    console.warn(`⚠️ Error checking font ${src}:`, error);
    return false;
  }
};

/**
 * Registers fonts with comprehensive error handling and logging
 */
export const registerFonts = async () => {
  console.log('🎨 Starting font registration for PDF export...');
  
  let successCount = 0;
  let failureCount = 0;
  
  for (const config of FONT_CONFIGS) {
    try {
      console.log(`📝 Processing font family: ${config.family}`);
      
      // Check if at least the regular font exists (font without fontWeight)
      const regularFont = config.fonts.find(f => !f.fontWeight);
      if (regularFont && await checkFontExists(regularFont.src)) {
        
        // Filter to only include fonts that exist
        const availableFonts = [];
        for (const font of config.fonts) {
          if (await checkFontExists(font.src)) {
            availableFonts.push(font);
            console.log(`✅ Font variant available: ${font.src} (weight: ${font.fontWeight || 'normal'})`);
          } else {
            console.warn(`⚠️ Font file not found: ${font.src}`);
          }
        }
        
        if (availableFonts.length > 0) {
          Font.register({
            family: config.family,
            fonts: availableFonts
          });
          console.log(`🎯 Successfully registered font: ${config.family} with ${availableFonts.length} variants`);
          successCount++;
        }
      } else {
        console.warn(`⚠️ Skipping font registration for ${config.family} - regular font file not found`);
        failureCount++;
      }
    } catch (error) {
      console.error(`❌ Failed to register font ${config.family}:`, error);
      failureCount++;
    }
  }
  
  console.log(`🎨 Font registration completed: ${successCount} successful, ${failureCount} failed`);
  
  if (successCount === 0) {
    console.error('💥 No fonts were successfully registered! PDF may use fallback fonts.');
  }
};

/**
 * Synchronous font registration with better error handling and logging
 */
export const registerFontsSync = () => {
  console.log('🎨 Starting synchronous font registration...');
  
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
  
  console.log(`🎨 Sync font registration completed: ${successCount} successful, ${failureCount} failed`);
  
  if (successCount === 0) {
    console.error('💥 No fonts were successfully registered synchronously!');
  }
};
