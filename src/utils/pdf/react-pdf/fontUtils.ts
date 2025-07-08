import { FONT_CONFIGS } from './fontConfig';
import { getRegisteredFonts } from './fontRegistration';

/**
 * Gets the best available font for PDF rendering with fallback
 */
export const getAvailableFontFamily = (requestedFont: string): string => {
  const registeredFonts = getRegisteredFonts();
  
  // Normalize the requested font name
  const normalizedFont = requestedFont.trim();
  
  // Check if the requested font was successfully registered (exact match)
  if (registeredFonts.has(normalizedFont)) {
    console.log(`Using registered font: ${normalizedFont}`);
    return normalizedFont;
  }
  
  // Check hyphenated version
  const hyphenatedFont = normalizedFont.replace(/\s+/g, '-');
  if (registeredFonts.has(hyphenatedFont)) {
    console.log(`Using registered hyphenated font: ${hyphenatedFont}`);
    return hyphenatedFont;
  }
  
  // Find the exact config match first
  const config = FONT_CONFIGS.find(c => c.family === normalizedFont);
  if (config && registeredFonts.has(config.family)) {
    console.log(`Using exact config match: ${config.family}`);
    return config.family;
  }
  
  // Use the first registered font as fallback if available
  if (registeredFonts.size > 0) {
    const firstRegistered = Array.from(registeredFonts)[0];
    console.log(`Using first registered font as fallback: ${firstRegistered}`);
    return firstRegistered;
  }
  
  // Default system fallback only if no fonts are registered
  console.log(`No fonts registered, using default system fallback for: ${normalizedFont}`);
  return 'Helvetica'; // Standard PDF font
};

/**
 * Maps font keys to registered font families
 */
export const mapFontKeyToFamily = (fontKey: string): string => {
  const fontMap: { [key: string]: string } = {
    'roboto': 'Roboto',
    'merriweather': 'Merriweather', 
    'montserrat': 'Montserrat',
    'opensans': 'Open Sans'
  };
  
  const mappedFont = fontMap[fontKey];
  if (mappedFont) {
    return getAvailableFontFamily(mappedFont);
  }
  
  return getAvailableFontFamily('Roboto'); // Default fallback
};