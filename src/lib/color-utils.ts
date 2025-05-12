
/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.0 formula
 * @param hexColor - Hex color code (e.g., #FFFFFF)
 */
export const getLuminance = (hexColor: string): number => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Calculate luminance
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.0 formula
 * @param color1 - First hex color
 * @param color2 - Second hex color
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  
  return (lightest + 0.05) / (darkest + 0.05);
};

/**
 * Check if the contrast between two colors meets WCAG accessibility standards
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @param level - 'AA' or 'AAA' standard level
 * @param isLargeText - Whether the text size is large (14pt bold/18pt regular or larger)
 */
export const isAccessible = (
  color1: string, 
  color2: string, 
  level: 'AA' | 'AAA' = 'AA', 
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  
  if (level === 'AA') {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
};

/**
 * Convert RGB to Hex color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Convert Hex to RGB color
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse hex value
  const bigint = parseInt(cleanHex, 16);
  
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

/**
 * Predefined accessible color combinations
 */
export const accessibleColorPairs = [
  { bg: '#FFFFFF', fg: '#000000', name: 'Black on White' },
  { bg: '#000000', fg: '#FFFFFF', name: 'White on Black' },
  { bg: '#FFFF00', fg: '#000000', name: 'Yellow on Black' },
  { bg: '#4052b6', fg: '#FFFFFF', name: 'Default Blue' },
  { bg: '#1E3A8A', fg: '#BFDBFE', name: 'Dark Blue / Light Blue' },
  { bg: '#065F46', fg: '#D1FAE5', name: 'Dark Green / Light Green' },
  { bg: '#581C87', fg: '#E9D5FF', name: 'Dark Purple / Light Purple' },
  { bg: '#991B1B', fg: '#FEE2E2', name: 'Dark Red / Light Red' },
];

/**
 * Get font display name from CSS font family
 */
export const getFontDisplayName = (fontFamily: string): string => {
  const fontMap: Record<string, string> = {
    'playfair': 'Playfair Display',
    'roboto': 'Roboto',
    'merriweather': 'Merriweather',
    'montserrat': 'Montserrat',
    'opensans': 'Open Sans',
    'lora': 'Lora',
    'raleway': 'Raleway',
  };
  
  return fontMap[fontFamily] || fontFamily;
};

/**
 * Available fonts for the poster
 */
export const availableFonts = [
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'lora', label: 'Lora' },
  { value: 'raleway', label: 'Raleway' },
];
