
// Re-export all font management functionality
export { FONT_CONFIGS, type FontConfig } from './fontConfig';
export { validateFontFile } from './fontValidation';
export { registerFontsForPDF, areFontsLoaded } from './fontRegistration';
export { getAvailableFontFamily, mapFontKeyToFamily } from './fontUtils';
