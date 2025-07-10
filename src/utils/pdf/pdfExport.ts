import { exportToReactPDF } from './react-pdf/reactPdfExport';

/**
 * Simplified PDF export - now only supports react-pdf for consistent high-quality output
 */
export const exportToPDF = async (
  elementId: string, 
  orientation: 'portrait' | 'landscape' = 'portrait',
  projectData?: { posterData: any; designSettings: any }
) => {
  if (!projectData?.posterData || !projectData?.designSettings) {
    console.error('Project data is required for PDF export');
    return;
  }

  try {
    await exportToReactPDF(projectData.posterData, projectData.designSettings);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};