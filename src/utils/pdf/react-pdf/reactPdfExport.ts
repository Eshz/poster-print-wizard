
import { pdf } from '@react-pdf/renderer';
import { toast } from "sonner";
import { createPdfDocument } from './PdfDocument';
import { registerFonts } from './fontRegistration';
import { PosterData, DesignSettings } from '@/types/project';

// Add comprehensive Buffer polyfill for browser environment
if (typeof global === 'undefined') {
  (window as any).global = window;
}

if (typeof Buffer === 'undefined') {
  // Create a proper Buffer polyfill that works with @react-pdf/renderer
  const BufferPolyfill = {
    from: (input: string | ArrayLike<number>, encoding?: string) => {
      if (typeof input === 'string') {
        const encoder = new TextEncoder();
        return encoder.encode(input);
      }
      return new Uint8Array(input);
    },
    isBuffer: (obj: any) => {
      return obj instanceof Uint8Array || obj instanceof ArrayBuffer;
    },
    alloc: (size: number, fill?: number) => {
      const buffer = new Uint8Array(size);
      if (fill !== undefined) {
        buffer.fill(fill);
      }
      return buffer;
    },
    concat: (buffers: Uint8Array[]) => {
      const totalLength = buffers.reduce((sum, buf) => sum + buf.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const buf of buffers) {
        result.set(buf, offset);
        offset += buf.length;
      }
      return result;
    }
  };
  
  (window as any).Buffer = BufferPolyfill;
  (global as any).Buffer = BufferPolyfill;
}

/**
 * Exports poster using react-pdf for high-quality vector-based output
 */
export const exportToReactPDF = async (
  posterData: PosterData,
  designSettings: DesignSettings,
  qrCodeUrl?: string
) => {
  try {
    toast.info('Preparing fonts and generating high-quality vector PDF...');
    
    // Ensure fonts are registered before creating the document
    await registerFonts();
    
    // Longer delay to allow font registration to complete properly
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create the PDF document
    const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);
    
    // Generate PDF blob with better error handling
    const blob = await pdf(doc).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conference-poster-A0-${designSettings.orientation || 'portrait'}-vector.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    toast.success(`High-quality vector PDF exported! File size: ${sizeInMB}MB`);
    
  } catch (error) {
    console.error('React-PDF export failed:', error);
    toast.error('Vector PDF export failed. Trying fallback method...');
    
    // Instead of throwing, let the main export function handle fallback
    throw new Error(`React-PDF export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
