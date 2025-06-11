
import React from 'react';
import QrCodeSection from './QrCodeSection';
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp, QrCode } from "lucide-react";

interface QrCodeGroupProps {
  posterData: any;
  handleQrUrlChange: (url: string) => void;
  handleQrColorChange: (color: string) => void;
  handleQrCaptionChange: (caption: string) => void;
  handleToggleChange: (field: string) => (checked: boolean) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const QrCodeGroup: React.FC<QrCodeGroupProps> = ({
  posterData,
  handleQrUrlChange,
  handleQrColorChange,
  handleQrCaptionChange,
  handleToggleChange,
  openSections,
  toggleSection
}) => {
  const isOpen = openSections['qrcode'];

  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={() => toggleSection('qrcode')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <QrCode className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
        </div>
        <div className="flex items-center gap-2">
          <Switch 
            checked={posterData.showQrCode !== false} 
            onCheckedChange={handleToggleChange('showQrCode')}
            onClick={(e) => e.stopPropagation()}
          />
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {isOpen && posterData.showQrCode !== false && (
        <div className="mt-4 pl-9">
          <QrCodeSection 
            qrCodeUrl={posterData.qrCodeUrl || ''}
            qrCodeColor={posterData.qrCodeColor || '#000000'}
            qrCodeCaption={posterData.qrCodeCaption || ''}
            handleQrUrlChange={handleQrUrlChange}
            handleQrColorChange={handleQrColorChange}
            handleQrCaptionChange={handleQrCaptionChange}
          />
        </div>
      )}
    </div>
  );
};

export default QrCodeGroup;
