
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { FormField } from '@/components/ui/form-field';
import { Switch } from '@/components/ui/switch';
import { QrCode } from 'lucide-react';
import { PosterData } from '@/types/project';

interface QrCodeFormSectionProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const QrCodeFormSection: React.FC<QrCodeFormSectionProps> = ({
  posterData,
  onUpdateField,
  isOpen,
  onToggle
}) => {
  const handleQrUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('QrCodeFormSection - QR URL changing to:', e.target.value);
    onUpdateField('qrCodeUrl', e.target.value);
  };

  const handleQrCaptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('QrCodeFormSection - QR Caption changing to:', e.target.value);
    onUpdateField('qrCodeCaption', e.target.value);
  };

  const handleQrColorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('QrCodeFormSection - QR Color changing to:', e.target.value);
    onUpdateField('qrCodeColor', e.target.value);
  };

  const handleToggleQrCode = (checked: boolean) => {
    onUpdateField('showQrCode', checked);
  };

  return (
    <CollapsibleSection
      id="qr-code"
      title="QR Code"
      icon={<QrCode className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
      rightContent={
        <Switch
          checked={posterData.showQrCode !== false}
          onCheckedChange={handleToggleQrCode}
          onClick={(e) => e.stopPropagation()}
        />
      }
    >
      {posterData.showQrCode !== false && (
        <div className="space-y-4">
          <FormField
            id="qr-url"
            label="QR Code URL"
            value={posterData.qrCodeUrl || ''}
            onChange={handleQrUrlChange}
            placeholder="Enter URL for QR code"
          />
          
          <FormField
            id="qr-caption"
            label="QR Code Caption"
            value={posterData.qrCodeCaption || ''}
            onChange={handleQrCaptionChange}
            placeholder="Enter caption for QR code"
          />
          
          <FormField
            id="qr-color"
            label="QR Code Color"
            value={posterData.qrCodeColor || '#000000'}
            onChange={handleQrColorChange}
            placeholder="#000000"
          />
        </div>
      )}
    </CollapsibleSection>
  );
};
