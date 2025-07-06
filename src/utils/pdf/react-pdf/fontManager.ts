
import { Font } from '@react-pdf/renderer';
import { toast } from "sonner";

interface FontConfig {
  family: string;
  fallback: string;
  weights: Array<{
    weight: number | string;
    style: 'normal' | 'italic';
    fileName: string;
  }>;
}

// Font configurations with local TTF files
const FONT_CONFIGS: FontConfig[] = [
  {
    family: 'Roboto',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'Roboto-Light.ttf' },
      { weight: 'normal', style: 'normal', fileName: 'Roboto-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'Roboto-Medium.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'Roboto-Bold.ttf' }
    ]
  },
  {
    family: 'Merriweather',
    fallback: 'Georgia, serif',
    weights: [
      { weight: 'normal', style: 'normal', fileName: 'Merriweather-Regular.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'Merriweather-Bold.ttf' }
    ]
  },
  {
    family: 'Montserrat',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'Montserrat-Light.ttf' },
      { weight: 'normal', style: 'normal', fileName: 'Montserrat-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'Montserrat-Medium.ttf' },
      { weight: 600, style: 'normal', fileName: 'Montserrat-SemiBold.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'Montserrat-Bold.ttf' }
    ]
  },
  {
    family: 'Open Sans',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'OpenSans-Light.ttf' },
      { weight: 'normal', style: 'normal', fileName: 'OpenSans-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'OpenSans-Medium.ttf' },
      { weight: 600, style: 'normal', fileName: 'OpenSans-SemiBold.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'OpenSans-Bold.ttf' }
    ]
  }
];

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
    const fontPath = `/fonts/${weightConfig.fileName}`;
    
    try {
      // Validate that the font file exists
      await validateFontFile(fontPath);
      
      fonts.push({
        src: fontPath,
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
  
  // Register the font family with react-pdf
  Font.register({
    family: config.family,
    fonts
  });
  
  console.log(`Registered ${config.family} with ${fonts.length} weights`);
};

/**
 * Validates that a font file exists and is accessible
 */
const validateFontFile = async (fontPath: string): Promise<void> => {
  try {
    const response = await fetch(fontPath, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Font file returned ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Font file validation failed for ${fontPath}: ${error}`);
  }
};

/**
 * Gets the best available font for PDF rendering with fallback
 */
export const getAvailableFontFamily = (requestedFont: string): string => {
  // Check if the requested font was successfully registered
  if (registeredFonts.has(requestedFont)) {
    console.log(`Using registered font: ${requestedFont}`);
    return requestedFont;
  }
  
  // Find fallback from config
  const config = FONT_CONFIGS.find(c => c.family === requestedFont);
  if (config) {
    console.log(`Font ${requestedFont} not available, using system fallback: ${config.fallback}`);
    return config.fallback;
  }
  
  // Default system fallback
  console.log(`Using default system fallback for unknown font: ${requestedFont}`);
  return 'Times-Roman'; // Use a standard PDF font as fallback
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

/**
 * Check if fonts are properly loaded
 */
export const areFontsLoaded = (): boolean => {
  return registeredFonts.size > 0;
};
