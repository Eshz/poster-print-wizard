
import { Font } from '@react-pdf/renderer';
import { toast } from "sonner";

interface FontConfig {
  family: string;
  fallback: string;
  weights: Array<{
    weight: number;
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
      { weight: 400, style: 'normal', fileName: 'Roboto-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'Roboto-Medium.ttf' },
      { weight: 700, style: 'normal', fileName: 'Roboto-Bold.ttf' }
    ]
  },
  {
    family: 'Merriweather',
    fallback: 'Georgia, serif',
    weights: [
      { weight: 400, style: 'normal', fileName: 'Merriweather-Regular.ttf' },
      { weight: 700, style: 'normal', fileName: 'Merriweather-Bold.ttf' }
    ]
  },
  {
    family: 'Montserrat',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'Montserrat-Light.ttf' },
      { weight: 400, style: 'normal', fileName: 'Montserrat-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'Montserrat-Medium.ttf' },
      { weight: 600, style: 'normal', fileName: 'Montserrat-SemiBold.ttf' },
      { weight: 700, style: 'normal', fileName: 'Montserrat-Bold.ttf' }
    ]
  },
  {
    family: 'Open Sans',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'OpenSans-Light.ttf' },
      { weight: 400, style: 'normal', fileName: 'OpenSans-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'OpenSans-Medium.ttf' },
      { weight: 600, style: 'normal', fileName: 'OpenSans-SemiBold.ttf' },
      { weight: 700, style: 'normal', fileName: 'OpenSans-Bold.ttf' }
    ]
  }
];

// Track which fonts have been successfully registered
const registeredFonts = new Set<string>();
const failedFonts = new Set<string>();

/**
 * Registers fonts from local TTF files with proper error handling
 */
export const registerFontsForPDF = async (): Promise<void> => {
  console.log('Starting local TTF font registration for PDF export...');
  
  for (const config of FONT_CONFIGS) {
    if (registeredFonts.has(config.family) || failedFonts.has(config.family)) {
      continue; // Skip already processed fonts
    }
    
    try {
      await registerFontFamily(config);
      registeredFonts.add(config.family);
      console.log(`Successfully registered font: ${config.family}`);
    } catch (error) {
      console.warn(`Failed to register font ${config.family}:`, error);
      failedFonts.add(config.family);
    }
  }
  
  console.log(`Font registration complete. Registered: ${registeredFonts.size}, Failed: ${failedFonts.size}`);
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
        fontWeight: weightConfig.weight === 400 ? 'normal' : 
                   weightConfig.weight === 700 ? 'bold' : 
                   weightConfig.weight.toString(),
        fontStyle: weightConfig.style
      });
    } catch (error) {
      console.warn(`Skipping weight ${weightConfig.weight} for ${config.family}:`, error);
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
};

/**
 * Validates that a font file exists and is accessible
 */
const validateFontFile = async (fontPath: string): Promise<void> => {
  try {
    const response = await fetch(fontPath, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Font file returned ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Font file validation failed: ${error}`);
  }
};

/**
 * Gets the best available font for PDF rendering with fallback
 */
export const getAvailableFontFamily = (requestedFont: string): string => {
  // Check if the requested font was successfully registered
  if (registeredFonts.has(requestedFont)) {
    return requestedFont;
  }
  
  // Find fallback from config
  const config = FONT_CONFIGS.find(c => c.family === requestedFont);
  if (config) {
    console.log(`Using fallback font for ${requestedFont}: ${config.fallback}`);
    return config.fallback;
  }
  
  // Default system fallback
  console.log(`Using system fallback for unknown font: ${requestedFont}`);
  return 'Arial, sans-serif';
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
