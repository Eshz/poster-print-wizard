
// A0 dimensions at 300 DPI (much higher resolution for printing)
export const A0_WIDTH_POINTS = 9921; // 841 mm at 300 DPI in points
export const A0_HEIGHT_POINTS = 14043; // 1189 mm at 300 DPI in points

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
    scale: 12.4, // High scale for 300 DPI (A0_WIDTH_POINTS / PREVIEW_WIDTH)
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
    dpi: 300, // Set DPI for print quality
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
