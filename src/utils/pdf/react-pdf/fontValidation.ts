/**
 * Validates that a font file exists and is accessible
 */
export const validateFontFile = async (fontPath: string): Promise<void> => {
  try {
    const response = await fetch(fontPath, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Font file returned ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Font file validation failed for ${fontPath}: ${error}`);
  }
};