
// A0 dimensions in points (1 mm ≈ 2.83 points)
export const A0_WIDTH_POINTS = 2384; // 841 mm in points
export const A0_HEIGHT_POINTS = 3370; // 1189 mm in points

// Current preview dimensions
export const PREVIEW_WIDTH = 800;
export const PREVIEW_HEIGHT = 1131;

/**
 * Creates optimized PDF export configuration
 */
export const createPdfConfig = (width: number, height: number) => ({
  margin: 0,
  filename: 'conference-poster-A0.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.9
  },
  html2canvas: { 
    scale: 1, // Use scale 1 since we're manually scaling the content
    useCORS: true,
    letterRendering: true,
    logging: false,
    width: width,
    height: height,
    allowTaint: true,
    imageTimeout: 0,
    removeContainer: true,
    backgroundColor: '#ffffff'
  },
  jsPDF: { 
    unit: 'pt', 
    format: [A0_WIDTH_POINTS, A0_HEIGHT_POINTS], 
    orientation: 'portrait',
    hotfixes: ["px_scaling"],
    compress: true
  }
});
