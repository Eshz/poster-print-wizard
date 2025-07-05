
import { toast } from "sonner";
import { PosterData, DesignSettings } from '@/types/project';

/**
 * SVG-based export approach for maximum fidelity
 */
export const exportToSVGPDF = async (
  elementId: string,
  posterData: PosterData,
  designSettings: DesignSettings,
  orientation: 'portrait' | 'landscape' = 'portrait'
) => {
  try {
    toast.info('Generating SVG-based PDF for maximum quality...');
    
    const element = document.getElementById(elementId);
    if (!element) {
      toast.error("Could not find poster content to export");
      return;
    }
    
    // Create SVG representation of the poster
    const svg = await createSVGFromElement(element, orientation);
    
    // Convert SVG to PDF using a dedicated library
    await convertSVGToPDF(svg, orientation);
    
  } catch (error) {
    console.error('SVG PDF export failed:', error);
    toast.error('SVG PDF export failed. Please try again.');
    throw error;
  }
};

/**
 * Creates an SVG representation of the DOM element
 */
const createSVGFromElement = async (element: HTMLElement, orientation: 'portrait' | 'landscape'): Promise<string> => {
  const rect = element.getBoundingClientRect();
  const isLandscape = orientation === 'landscape';
  
  // A0 dimensions in pixels at 300 DPI
  const width = isLandscape ? 14043 : 9921;
  const height = isLandscape ? 9921 : 14043;
  
  // Calculate scale to fit A0
  const scaleX = width / rect.width;
  const scaleY = height / rect.height;
  
  let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  svgContent += `<rect width="100%" height="100%" fill="white"/>`;
  
  // Recursively convert DOM elements to SVG
  svgContent += await convertElementToSVG(element, 0, 0, scaleX, scaleY);
  
  svgContent += '</svg>';
  
  return svgContent;
};

/**
 * Recursively converts DOM elements to SVG elements
 */
const convertElementToSVG = async (
  element: HTMLElement,
  offsetX: number,
  offsetY: number,
  scaleX: number,
  scaleY: number
): Promise<string> => {
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  const x = offsetX + (rect.left * scaleX);
  const y = offsetY + (rect.top * scaleY);
  const width = rect.width * scaleX;
  const height = rect.height * scaleY;
  
  let svgElement = '';
  
  // Background
  const bgColor = computedStyle.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    svgElement += `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${bgColor}"/>`;
  }
  
  // Borders
  const borderWidth = parseFloat(computedStyle.borderWidth) || 0;
  const borderColor = computedStyle.borderColor;
  if (borderWidth > 0 && borderColor) {
    svgElement += `<rect x="${x}" y="${y}" width="${width}" height="${height}" 
      fill="none" stroke="${borderColor}" stroke-width="${borderWidth * scaleX}"/>`;
  }
  
  // Text content
  if (element.textContent && element.children.length === 0) {
    const fontSize = parseFloat(computedStyle.fontSize) * scaleY;
    const fontFamily = computedStyle.fontFamily;
    const color = computedStyle.color;
    const fontWeight = computedStyle.fontWeight;
    
    svgElement += `<text x="${x + (width / 2)}" y="${y + (height / 2)}" 
      font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}"
      fill="${color}" text-anchor="middle" dominant-baseline="middle">
      ${element.textContent.trim()}
    </text>`;
  }
  
  // Handle images
  if (element.tagName === 'IMG') {
    const img = element as HTMLImageElement;
    if (img.src) {
      svgElement += `<image x="${x}" y="${y}" width="${width}" height="${height}" href="${img.src}"/>`;
    }
  }
  
  // Process children
  for (const child of element.children) {
    svgElement += await convertElementToSVG(child as HTMLElement, offsetX, offsetY, scaleX, scaleY);
  }
  
  return svgElement;
};

/**
 * Converts SVG to PDF
 */
const convertSVGToPDF = async (svgContent: string, orientation: 'portrait' | 'landscape') => {
  // This would require a dedicated SVG to PDF conversion library
  // For now, we'll use a simpler approach with canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  const isLandscape = orientation === 'landscape';
  canvas.width = isLandscape ? 14043 : 9921;
  canvas.height = isLandscape ? 9921 : 14043;
  
  // Convert SVG to canvas and then to PDF
  const img = new Image();
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  return new Promise<void>((resolve, reject) => {
    img.onload = async () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      
      // Convert canvas to PDF
      const { canvasToPDF } = await import('../canvas/canvasPdfConverter');
      await canvasToPDF(canvas, orientation);
      resolve();
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG'));
    };
    
    img.src = url;
  });
};
