
import { Font } from '@react-pdf/renderer';
import { toast } from "sonner";

interface FontConfig {
  family: string;
  googleFontName: string;
  fallback: string;
  weights: number[];
}

// Font configurations with Google Fonts URLs
const FONT_CONFIGS: FontConfig[] = [
  {
    family: 'Roboto',
    googleFontName: 'Roboto',
    fallback: 'Arial, sans-serif',
    weights: [300, 400, 500, 700]
  },
  {
    family: 'Merriweather',
    googleFontName: 'Merriweather',
    fallback: 'Georgia, serif',
    weights: [400, 700]
  },
  {
    family: 'Montserrat',
    googleFontName: 'Montserrat',
    fallback: 'Arial, sans-serif',
    weights: [300, 400, 500, 600, 700]
  },
  {
    family: 'Open Sans',
    googleFontName: 'Open+Sans',
    fallback: 'Arial, sans-serif',
    weights: [300, 400, 500, 600, 700]
  }
];

// Track which fonts have been successfully registered
const registeredFonts = new Set<string>();
const failedFonts = new Set<string>();

/**
 * Dynamically registers fonts from Google Fonts with proper error handling
 */
export const registerFontsForPDF = async (): Promise<void> => {
  console.log('Starting dynamic font registration for PDF export...');
  
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
 * Registers a single font family with multiple weights
 */
const registerFontFamily = async (config: FontConfig): Promise<void> => {
  const fonts = [];
  
  for (const weight of config.weights) {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${config.googleFontName}:wght@${weight}&display=swap`;
    
    try {
      // Validate font URL accessibility
      await validateFontUrl(fontUrl);
      
      fonts.push({
        src: fontUrl,
        fontWeight: weight === 400 ? 'normal' : weight === 700 ? 'bold' : weight.toString()
      });
    } catch (error) {
      console.warn(`Skipping weight ${weight} for ${config.family}:`, error);
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
 * Validates that a font URL is accessible
 */
const validateFontUrl = async (url: string): Promise<void> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Font URL returned ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Font URL validation failed: ${error}`);
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
