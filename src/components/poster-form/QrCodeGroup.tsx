
import React from 'react';
import QrCodeSection from './QrCodeSection';
import { Switch } from "@/components/ui/switch";
import { Edit, QrCode } from "lucide-react";

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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <QrCode className="h-4 w-4 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
          </div>
          <Switch 
            checked={posterData.showQrCode !== false} 
            onCheckedChange={handleToggleChange('showQrCode')}
          />
        </div>
      </div>
      
      {posterData.showQrCode !== false && (
        <div 
          className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200"
          onClick={() => toggleSection('qrcode')}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Edit QR Code</span>
            <Edit className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}
      
      {openSections['qrcode'] && posterData.showQrCode !== false && (
        <div className="p-6">
          <QrCodeSection 
            qrCodeUrl={posterData.qrCodeUrl}
            qrCodeColor={posterData.qrCodeColor}
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
