
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/pdfExport';

export interface ExportOptions {
  format: 'pdf';
  quality: 'high' | 'medium' | 'low';
  orientation?: 'auto' | 'portrait' | 'landscape';
}

export class ExportService {
  static async exportPoster(
    elementId: string, 
    options: ExportOptions = { format: 'pdf', quality: 'high' }
  ): Promise<boolean> {
    try {
      toast.info('Preparing export...');
      
      switch (options.format) {
        case 'pdf':
          await exportToPDF(elementId);
          return true;
        default:
          toast.error('Unsupported export format');
          return false;
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
      return false;
    }
  }

  static getExportFormats() {
    return [
      { value: 'pdf', label: 'PDF (A0 Size)' }
    ];
  }

  static getQualityOptions() {
    return [
      { value: 'high', label: 'High Quality (Recommended)' },
      { value: 'medium', label: 'Medium Quality' },
      { value: 'low', label: 'Low Quality (Faster)' }
    ];
  }
}
