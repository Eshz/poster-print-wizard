
// A0 dimensions in pixels at 96 DPI (standard screen DPI)
// A0 Portrait = 841 × 1189 mm = 33.1 × 46.8 inches = 3179 × 4494 pixels at 96 DPI
// A0 Landscape = 1189 × 841 mm = 46.8 × 33.1 inches = 4494 × 3179 pixels at 96 DPI
export const A0_WIDTH_PX_PORTRAIT = 3179;
export const A0_HEIGHT_PX_PORTRAIT = 4494;

export const A0_WIDTH_PX_LANDSCAPE = 4494;
export const A0_HEIGHT_PX_LANDSCAPE = 3179;

// Our poster representation dimensions (scaled down for UI)
// Portrait orientation (taller than wide)
export const POSTER_UI_WIDTH_PORTRAIT = 800;
export const POSTER_UI_HEIGHT_PORTRAIT = 1131;

// Landscape orientation (wider than tall) 
export const POSTER_UI_WIDTH_LANDSCAPE = 1131;
export const POSTER_UI_HEIGHT_LANDSCAPE = 800;

// Legacy exports for backward compatibility - default to landscape for academic modern landscape layout
export const A0_WIDTH_PX = A0_WIDTH_PX_LANDSCAPE;
export const A0_HEIGHT_PX = A0_HEIGHT_PX_LANDSCAPE;

export const POSTER_UI_WIDTH = POSTER_UI_WIDTH_LANDSCAPE;
export const POSTER_UI_HEIGHT = POSTER_UI_HEIGHT_LANDSCAPE;
