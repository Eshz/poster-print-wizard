
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { extractDesignSettings, getOriginalPosterElement } from './domUtils';
import { preloadFonts } from './fontLoader';
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS } from './pdfConfig';

/**
 * Canvas-based PDF export that renders the poster directly to canvas
 * This bypasses html2canvas font rendering issues
 */
export const exportToCanvasPDF = async (elementId: string, orientation: 'portrait' | 'landscape' = 'portrait') => {
  toast.info(`Preparing high-quality canvas export in ${orientation} mode...`);
  
  // Preload fonts first
  await preloadFonts();
  
  // Get the original poster element
  const element = getOriginalPosterElement();
  if (!element) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  const designSettings = extractDesignSettings();
  console.log('Canvas export using design settings:', designSettings);
  
  try {
    // Create high-resolution canvas
    const canvas = await renderPosterToCanvas(element, orientation, designSettings);
    
    // Convert canvas to PDF
    await canvasToPDF(canvas, orientation);
    
  } catch (error) {
    console.error("Canvas PDF export failed:", error);
    toast.error("Canvas PDF export failed. Please try again.");
  }
};

/**
 * Renders the poster DOM element to a high-resolution canvas
 */
const renderPosterToCanvas = async (element: HTMLElement, orientation: 'portrait' | 'landscape', designSettings: any): Promise<HTMLCanvasElement> => {
  const isLandscape = orientation === 'landscape';
  
  // Calculate dimensions for 300 DPI A0
  const canvasWidth = isLandscape ? Math.floor(A0_HEIGHT_POINTS * 4.17) : Math.floor(A0_WIDTH_POINTS * 4.17); // Convert points to pixels at 300 DPI
  const canvasHeight = isLandscape ? Math.floor(A0_WIDTH_POINTS * 4.17) : Math.floor(A0_HEIGHT_POINTS * 4.17);
  
  console.log(`Creating canvas: ${canvasWidth}x${canvasHeight} pixels for ${orientation} A0 at 300 DPI`);
  
  // Create high-resolution canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Set high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.textBaseline = 'top';
  
  // Fill background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  toast.info('Rendering poster content to high-resolution canvas...');
  
  // Calculate scale factor from DOM to canvas
  const domRect = element.getBoundingClientRect();
  const scaleX = canvasWidth / domRect.width;
  const scaleY = canvasHeight / domRect.height;
  
  console.log(`Scale factors: ${scaleX}x${scaleY}, DOM size: ${domRect.width}x${domRect.height}`);
  
  // Render all elements recursively
  await renderElementToCanvas(ctx, element, 0, 0, scaleX, scaleY, designSettings);
  
  return canvas;
};

/**
 * Recursively renders DOM elements to canvas
 */
const renderElementToCanvas = async (
  ctx: CanvasRenderingContext2D, 
  element: HTMLElement, 
  offsetX: number, 
  offsetY: number, 
  scaleX: number, 
  scaleY: number,
  designSettings: any
) => {
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  const x = offsetX + (rect.left * scaleX);
  const y = offsetY + (rect.top * scaleY);
  const width = rect.width * scaleX;
  const height = rect.height * scaleY;
  
  // Render background
  const bgColor = computedStyle.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
  }
  
  // Render borders
  const borderWidth = parseFloat(computedStyle.borderWidth) || 0;
  if (borderWidth > 0) {
    ctx.strokeStyle = computedStyle.borderColor || '#000000';
    ctx.lineWidth = borderWidth * scaleX;
    ctx.strokeRect(x, y, width, height);
  }
  
  // Handle images
  if (element.tagName === 'IMG') {
    const img = element as HTMLImageElement;
    if (img.complete) {
      try {
        ctx.drawImage(img, x, y, width, height);
      } catch (error) {
        console.warn('Could not draw image:', error);
      }
    }
  }
  
  // Handle text content
  if (element.textContent && element.children.length === 0) {
    await renderTextToCanvas(ctx, element, x, y, width, height, scaleX, scaleY, designSettings);
  }
  
  // Render children
  for (const child of Array.from(element.children)) {
    await renderElementToCanvas(ctx, child as HTMLElement, offsetX, offsetY, scaleX, scaleY, designSettings);
  }
};

/**
 * Renders text content to canvas with proper font handling
 */
const renderTextToCanvas = async (
  ctx: CanvasRenderingContext2D,
  element: HTMLElement,
  x: number,
  y: number,
  width: number,
  height: number,
  scaleX: number,
  scaleY: number,
  designSettings: any
) => {
  const computedStyle = window.getComputedStyle(element);
  const text = element.textContent?.trim();
  
  if (!text) return;
  
  // Get font properties
  const fontSize = parseFloat(computedStyle.fontSize) * scaleY;
  const fontWeight = computedStyle.fontWeight;
  const fontFamily = getFontFamilyForCanvas(element, designSettings);
  
  // Set font
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = computedStyle.color || '#000000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Handle text wrapping for long text
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > width && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Draw text lines
  const lineHeight = fontSize * 1.2;
  lines.forEach((line, index) => {
    ctx.fillText(line, x + 5, y + (index * lineHeight) + 5);
  });
};

/**
 * Gets the correct font family for canvas rendering
 */
const getFontFamilyForCanvas = (element: HTMLElement, designSettings: any): string => {
  // Check if it's a title element
  if (element.classList.contains('poster-title') || element.tagName.match(/^H[1-6]$/)) {
    return getFontFamilyFromKey(designSettings?.titleFont || 'merriweather');
  }
  
  // Default to content font
  return getFontFamilyFromKey(designSettings?.contentFont || 'roboto');
};

/**
 * Converts font key to actual font family name
 */
const getFontFamilyFromKey = (fontKey: string): string => {
  const fontMap: { [key: string]: string } = {
    'playfair': 'Playfair Display, serif',
    'roboto': 'Roboto, sans-serif',
    'merriweather': 'Merriweather, serif',
    'montserrat': 'Montserrat, sans-serif',
    'opensans': 'Open Sans, sans-serif',
    'lora': 'Lora, serif',
    'raleway': 'Raleway, sans-serif',
    'crimsontext': 'Crimson Text, serif',
    'sourceserifpro': 'Source Serif Pro, serif',
    'ebgaramond': 'EB Garamond, serif',
    'inter': 'Inter, sans-serif',
    'librewilson': 'Libre Baskerville, serif',
    'nunito': 'Nunito, sans-serif',
    'cormorantgaramond': 'Cormorant Garamond, serif',
    'worksans': 'Work Sans, sans-serif',
    'oldstandardtt': 'Old Standard TT, serif',
    'karla': 'Karla, sans-serif',
    'spectral': 'Spectral, serif',
    'publicsans': 'Public Sans, sans-serif',
    'vollkorn': 'Vollkorn, serif',
    'firasans': 'Fira Sans, sans-serif'
  };
  
  return fontMap[fontKey] || 'Roboto, sans-serif';
};

/**
 * Converts canvas to PDF and downloads it
 */
const canvasToPDF = async (canvas: HTMLCanvasElement, orientation: 'portrait' | 'landscape') => {
  toast.info('Converting high-resolution canvas to PDF...');
  
  // Convert canvas to image data
  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  
  // Create PDF with correct A0 dimensions
  const isLandscape = orientation === 'landscape';
  const pdfWidth = isLandscape ? A0_HEIGHT_POINTS : A0_WIDTH_POINTS;
  const pdfHeight = isLandscape ? A0_WIDTH_POINTS : A0_HEIGHT_POINTS;
  
  const pdf = new jsPDF({
    orientation: orientation,
    unit: 'pt',
    format: [pdfWidth, pdfHeight],
    compress: true
  });
  
  // Add the image to PDF
  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  
  // Save the PDF
  const fileName = `conference-poster-A0-${orientation}-canvas.pdf`;
  pdf.save(fileName);
  
  const blob = pdf.output('blob');
  const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
  
  toast.success(`High-quality canvas PDF exported! File size: ${sizeInMB}MB`);
};
