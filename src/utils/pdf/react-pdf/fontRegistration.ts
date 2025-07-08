import { Font } from '@react-pdf/renderer';
import { FONT_CONFIGS, type FontConfig } from './fontConfig';
import { validateFontFile } from './fontValidation';

// Track which fonts have been successfully registered
const registeredFonts = new Set<string>();
const fontRegistrationPromises = new Map<string, Promise<void>>();

/**
 * Pre-register all fonts synchronously to ensure they're available for PDF generation
 */
export const registerFontsForPDF = async (): Promise<void> => {
  console.log('Starting font registration for PDF export...');
  
  // Register all fonts in parallel but wait for completion
  const registrationPromises = FONT_CONFIGS.map(async (config) => {
    if (registeredFonts.has(config.family)) {
      console.log(`Font ${config.family} already registered`);
      return;
    }
    
    if (fontRegistrationPromises.has(config.family)) {
      return fontRegistrationPromises.get(config.family);
    }
    
    const promise = registerFontFamily(config);
    fontRegistrationPromises.set(config.family, promise);
    
    try {
      await promise;
      registeredFonts.add(config.family);
      console.log(`Successfully registered font: ${config.family}`);
    } catch (error) {
      console.warn(`Failed to register font ${config.family}:`, error);
      // Don't add to registeredFonts if it failed
    }
    
    return promise;
  });
  
  // Wait for all font registrations to complete
  await Promise.allSettled(registrationPromises);
  
  console.log(`Font registration complete. Successfully registered: ${Array.from(registeredFonts).join(', ')}`);
  
  // Wait a bit more to ensure fonts are fully loaded
  await new Promise(resolve => setTimeout(resolve, 500));
};

/**
 * Registers a single font family with multiple weights from local TTF files
 */
const registerFontFamily = async (config: FontConfig): Promise<void> => {
  const fonts = [];
  
  for (const weightConfig of config.weights) {
    const fontSrc = weightConfig.fileName.startsWith('http') 
      ? weightConfig.fileName 
      : `/fonts/${weightConfig.fileName}`;
    
    try {
      // Skip validation for external URLs, validate only local files
      if (!weightConfig.fileName.startsWith('http')) {
        await validateFontFile(fontSrc);
      }
      
      fonts.push({
        src: fontSrc,
        fontWeight: weightConfig.weight,
        fontStyle: weightConfig.style
      });
    } catch (error) {
      console.warn(`Skipping weight ${weightConfig.weight} for ${config.family}: ${error}`);
    }
  }
  
  if (fonts.length === 0) {
    throw new Error(`No valid fonts found for ${config.family}`);
  }
  
  // Register the font family with react-pdf - ensure exact family name match
  Font.register({
    family: config.family,
    fonts
  });
  
  // Also register with hyphenated versions that might be used in CSS
  const hyphenatedFamily = config.family.replace(/\s+/g, '-');
  if (hyphenatedFamily !== config.family) {
    Font.register({
      family: hyphenatedFamily,
      fonts
    });
    console.log(`Also registered ${hyphenatedFamily} (hyphenated version)`);
  }
  
  console.log(`Registered ${config.family} with ${fonts.length} weights`);
};

/**
 * Check if fonts are properly loaded
 */
export const areFontsLoaded = (): boolean => {
  return registeredFonts.size > 0;
};

/**
 * Get registered fonts set (for utilities)
 */
export const getRegisteredFonts = (): Set<string> => {
  return registeredFonts;
};