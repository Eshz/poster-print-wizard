// A0 dimensions in points for 300 DPI
const A0_WIDTH_POINTS = 2384;
const A0_HEIGHT_POINTS = 3370;

// Preview dimensions
const PREVIEW_WIDTH_PORTRAIT = 800;
const PREVIEW_HEIGHT_PORTRAIT = 1131;
const PREVIEW_WIDTH_LANDSCAPE = 1131;
const PREVIEW_HEIGHT_LANDSCAPE = 800;

/**
 * Calculates the scale factor for A0 export at 300 DPI based on orientation
 */
export const calculateScaleFactor = (orientation: 'portrait' | 'landscape' = 'portrait') => {
  const isLandscape = orientation === 'landscape';
  
  // Use appropriate preview dimensions based on orientation
  const previewWidth = isLandscape ? PREVIEW_WIDTH_LANDSCAPE : PREVIEW_WIDTH_PORTRAIT;
  const previewHeight = isLandscape ? PREVIEW_HEIGHT_LANDSCAPE : PREVIEW_HEIGHT_PORTRAIT;
  
  // Use appropriate A0 dimensions based on orientation
  const a0Width = isLandscape ? A0_HEIGHT_POINTS : A0_WIDTH_POINTS;
  const a0Height = isLandscape ? A0_WIDTH_POINTS : A0_HEIGHT_POINTS;
  
  // Calculate the scale factor needed to go from preview size to A0 300 DPI size
  const widthRatio = a0Width / previewWidth;
  const heightRatio = a0Height / previewHeight;
  
  // Use the smaller ratio to maintain aspect ratio
  return Math.min(widthRatio, heightRatio);
};