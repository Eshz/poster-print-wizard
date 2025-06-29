
/**
 * Canvas to PDF conversion utilities
 */

import jsPDF from 'jspdf';
import { toast } from "sonner";
import { A0_WIDTH_POINTS, A0_HEIGHT_POINTS } from '../pdfConfig';

/**
 * Converts canvas to PDF and downloads it
 */
export const canvasToPDF = async (canvas: HTMLCanvasElement, orientation: 'portrait' | 'landscape') => {
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
