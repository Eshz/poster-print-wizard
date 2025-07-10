import React from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import { View } from '@react-pdf/renderer';
import { createPdfDocument } from '@/utils/pdf/react-pdf/PdfDocument';

interface PdfPreviewRendererProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl?: string;
}

const PdfPreviewRenderer: React.FC<PdfPreviewRendererProps> = ({ 
  posterData, 
  designSettings, 
  qrCodeUrl 
}) => {
  // For now, show a simple placeholder that indicates PDF-only export
  return (
    <div className="w-full h-full bg-white border border-gray-200 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: `var(--font-${designSettings.titleFont})` }}>
          {posterData.title}
        </h2>
        <p className="text-gray-600 mb-4">PDF Preview Mode</p>
        <p className="text-sm text-gray-500">
          Your poster will be generated as a high-quality PDF when exported.
          <br />
          The final layout will match your design settings and content.
        </p>
      </div>
    </div>
  );
};

export default PdfPreviewRenderer;