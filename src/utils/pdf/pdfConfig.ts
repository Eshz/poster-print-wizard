
// A0 dimensions in points (1 mm ≈ 2.83 points)
export const A0_WIDTH_POINTS = 2384; // 841 mm in points
export const A0_HEIGHT_POINTS = 3370; // 1189 mm in points

// Current preview dimensions
export const PREVIEW_WIDTH = 800;
export const PREVIEW_HEIGHT = 1131;

/**
 * Creates optimized PDF export configuration for A0 posters
 * Updated to work with the new zoom-independent scaling system
 */
export const createPdfConfig = () => ({
  margin: 0,
  filename: 'conference-poster-A0.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.9 // Slightly reduced for better balance
  },
  html2canvas: { 
    scale: 2.5, // Reduced from 3 to better match preview
    useCORS: true,
    letterRendering: true,
    logging: false,
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    allowTaint: true,
    imageTimeout: 0,
    removeContainer: false,
    backgroundColor: '#ffffff',
    foreignObjectRendering: true,
    windowWidth: PREVIEW_WIDTH,
    windowHeight: PREVIEW_HEIGHT,
    scrollX: 0,
    scrollY: 0
  },
  jsPDF: { 
    unit: 'pt', 
    format: [A0_WIDTH_POINTS, A0_HEIGHT_POINTS], 
    orientation: 'portrait',
    compress: true,
    precision: 2
  }
});
