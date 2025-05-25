
// A0 dimensions in points (1 mm ≈ 2.83 points)
export const A0_WIDTH_POINTS = 2384; // 841 mm in points
export const A0_HEIGHT_POINTS = 3370; // 1189 mm in points

// Current preview dimensions
export const PREVIEW_WIDTH = 800;
export const PREVIEW_HEIGHT = 1131;

/**
 * Creates optimized PDF export configuration for A0 posters
 */
export const createPdfConfig = () => ({
  margin: 0,
  filename: 'conference-poster-A0.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.98
  },
  html2canvas: { 
    scale: 2,
    useCORS: true,
    letterRendering: true,
    logging: true, // Enable logging to debug
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    allowTaint: true,
    imageTimeout: 0,
    removeContainer: false,
    backgroundColor: '#ffffff',
    foreignObjectRendering: true,
    onclone: (clonedDoc: Document) => {
      console.log("html2canvas cloned document:", clonedDoc);
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
