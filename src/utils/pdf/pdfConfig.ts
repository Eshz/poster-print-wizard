
// A0 dimensions at 300 DPI - corrected calculations
// A0 = 841 × 1189 mm = 84.1 × 118.9 cm
// At 300 DPI: (841mm / 25.4) * 300 = 9921 points, (1189mm / 25.4) * 300 = 14043 points
export const A0_WIDTH_POINTS = 2384; // 84.1 cm at 300 DPI in points (841mm)
export const A0_HEIGHT_POINTS = 3370; // 118.9 cm at 300 DPI in points (1189mm)

// Current preview dimensions
export const PREVIEW_WIDTH = 800;
export const PREVIEW_HEIGHT = 1131;

/**
 * Creates optimized PDF export configuration for A0 posters at 300 DPI
 * Maintains preview appearance while achieving print quality
 */
export const createPdfConfig = () => ({
  margin: 0,
  filename: 'conference-poster-A0-300dpi.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.98
  },
  html2canvas: { 
    scale: 2.98, // Adjusted scale for correct A0 size (A0_WIDTH_POINTS / PREVIEW_WIDTH)
    useCORS: true,
    letterRendering: true,
    logging: false,
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    allowTaint: false, // Changed to false to handle QR images properly
    imageTimeout: 15000, // Increased timeout for image loading
    removeContainer: false,
    backgroundColor: '#ffffff',
    foreignObjectRendering: true,
    windowWidth: PREVIEW_WIDTH,
    windowHeight: PREVIEW_HEIGHT,
    scrollX: 0,
    scrollY: 0,
    x: 0,
    y: 0,
    dpi: 300,
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
