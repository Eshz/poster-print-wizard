
// A0 dimensions in points (1 mm ≈ 2.83 points)
export const A0_WIDTH_POINTS = 2384; // 841 mm in points
export const A0_HEIGHT_POINTS = 3370; // 1189 mm in points

// Current preview dimensions
export const PREVIEW_WIDTH = 800;
export const PREVIEW_HEIGHT = 1131;

/**
 * Creates optimized PDF export configuration for A0 posters
 * Updated to produce better font scaling and layout matching
 */
export const createPdfConfig = () => ({
  margin: 0,
  filename: 'conference-poster-A0.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.98 // Slightly higher quality for better text rendering
  },
  html2canvas: { 
    scale: 2.0, // Reduced from 2.5 to 2.0 for better performance and sizing
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
    scrollY: 0,
    x: 0,
    y: 0,
    // Additional settings to prevent scrollbars and improve text rendering
    ignoreElements: (element: Element) => {
      const el = element as HTMLElement;
      return el.style.overflow === 'scroll' || 
             el.style.overflowX === 'scroll' || 
             el.style.overflowY === 'scroll' ||
             el.classList.contains('scrollbar');
    }
  },
  jsPDF: { 
    unit: 'pt', 
    format: [A0_WIDTH_POINTS, A0_HEIGHT_POINTS], 
    orientation: 'portrait',
    compress: true,
    precision: 2
  }
});
