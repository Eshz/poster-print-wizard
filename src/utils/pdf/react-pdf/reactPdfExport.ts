
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
  // Create a Buffer polyfill that doesn't conflict with Uint8Array
  class BufferPolyfill {
    private data: Uint8Array;

    constructor(input?: any, encoding?: string) {
      if (typeof input === 'string') {
        const encoder = new TextEncoder();
        this.data = encoder.encode(input);
      } else if (typeof input === 'number') {
        this.data = new Uint8Array(input);
      } else if (input instanceof ArrayBuffer || input instanceof Uint8Array) {
        this.data = new Uint8Array(input);
      } else if (Array.isArray(input)) {
        this.data = new Uint8Array(input);
      } else {
        this.data = new Uint8Array(0);
      }
    }

    static from(input: string | ArrayLike<number> | ArrayBuffer, encoding?: string): BufferPolyfill {
      return new BufferPolyfill(input, encoding);
    }

    static alloc(size: number, fill?: number): BufferPolyfill {
      const buffer = new BufferPolyfill(size);
      if (fill !== undefined) {
        buffer.data.fill(fill);
      }
      return buffer;
    }

    static concat(buffers: (Uint8Array | BufferPolyfill)[]): BufferPolyfill {
      const totalLength = buffers.reduce((sum, buf) => {
        return sum + (buf instanceof BufferPolyfill ? buf.length : buf.length);
      }, 0);
      
      const result = new BufferPolyfill(totalLength);
      let offset = 0;
      
      for (const buf of buffers) {
        const sourceData = buf instanceof BufferPolyfill ? buf.data : buf;
        result.data.set(sourceData, offset);
        offset += sourceData.length;
      }
      return result;
    }

    static isBuffer(obj: any): boolean {
      return obj instanceof BufferPolyfill || obj instanceof Uint8Array || obj instanceof ArrayBuffer;
    }

    get length(): number {
      return this.data.length;
    }

    toString(encoding?: string): string {
      const decoder = new TextDecoder(encoding || 'utf8');
      return decoder.decode(this.data);
    }

    toJSON(): { type: string; data: number[] } {
      return {
        type: 'Buffer',
        data: Array.from(this.data)
      };
    }

    // Add methods to make it behave like a Uint8Array
    set(array: ArrayLike<number>, offset?: number): void {
      this.data.set(array, offset);
    }

    fill(value: number, start?: number, end?: number): this {
      this.data.fill(value, start, end);
      return this;
    }

    // Make it iterable and array-like
    [Symbol.iterator]() {
      return this.data[Symbol.iterator]();
    }

    [index: number]: number;
  }

  // Add array-like behavior
  Object.defineProperty(BufferPolyfill.prototype, Symbol.iterator, {
    value: function() {
      return this.data[Symbol.iterator]();
    }
  });

  // Set up the polyfill
  (window as any).Buffer = BufferPolyfill;
  (global as any).Buffer = BufferPolyfill;
  
  // Also add process polyfill if needed
  if (typeof process === 'undefined') {
    (window as any).process = { 
      env: {}, 
      nextTick: (fn: Function) => setTimeout(fn, 0),
      browser: true
    };
    (global as any).process = (window as any).process;
  }
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
