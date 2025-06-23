
// A0 dimensions at 300 DPI - corrected calculations
// A0 Portrait = 841 × 1189 mm = 84.1 × 118.9 cm
// A0 Landscape = 1189 × 841 mm = 118.9 × 84.1 cm
// At 300 DPI: (841mm / 25.4) * 300 = 9921 points, (1189mm / 25.4) * 300 = 14043 points
export const A0_WIDTH_POINTS_PORTRAIT = 2384; // 84.1 cm at 300 DPI in points (841mm)
export const A0_HEIGHT_POINTS_PORTRAIT = 3370; // 118.9 cm at 300 DPI in points (1189mm)

export const A0_WIDTH_POINTS_LANDSCAPE = 3370; // 118.9 cm at 300 DPI in points (1189mm)
export const A0_HEIGHT_POINTS_LANDSCAPE = 2384; // 84.1 cm at 300 DPI in points (841mm)

// Current preview dimensions
export const PREVIEW_WIDTH = 800;
export const PREVIEW_HEIGHT = 1131;

// Landscape preview dimensions
export const PREVIEW_WIDTH_LANDSCAPE = 1131;
export const PREVIEW_HEIGHT_LANDSCAPE = 800;

/**
 * Detects if the poster is in landscape or portrait mode
 */
export const detectPosterOrientation = (element: HTMLElement): 'landscape' | 'portrait' => {
  const rect = element.getBoundingClientRect();
  return rect.width > rect.height ? 'landscape' : 'portrait';
};

/**
 * Creates optimized PDF export configuration for A0 posters at 300 DPI
 * Automatically detects orientation and configures accordingly
 */
export const createPdfConfig = (orientation: 'landscape' | 'portrait' = 'portrait') => {
  const isLandscape = orientation === 'landscape';
  
  const width = isLandscape ? A0_WIDTH_POINTS_LANDSCAPE : A0_WIDTH_POINTS_PORTRAIT;
  const height = isLandscape ? A0_HEIGHT_POINTS_LANDSCAPE : A0_HEIGHT_POINTS_PORTRAIT;
  const previewWidth = isLandscape ? PREVIEW_WIDTH_LANDSCAPE : PREVIEW_WIDTH;
  const previewHeight = isLandscape ? PREVIEW_HEIGHT_LANDSCAPE : PREVIEW_HEIGHT;
  
  return {
    margin: 0,
    filename: `conference-poster-A0-${orientation}-300dpi.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.98
    },
    html2canvas: { 
      scale: width / previewWidth, // Dynamic scale based on orientation
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: previewWidth,
      height: previewHeight,
      allowTaint: false,
      imageTimeout: 15000,
      removeContainer: false,
      backgroundColor: '#ffffff',
      foreignObjectRendering: true,
      windowWidth: previewWidth,
      windowHeight: previewHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      dpi: 300,
      // Preserve fonts by ensuring text is rendered properly
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
      format: [width, height], 
      orientation: isLandscape ? 'landscape' : 'portrait',
      compress: true,
      precision: 2
    }
  };
};
