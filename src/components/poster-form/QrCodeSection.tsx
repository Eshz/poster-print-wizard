
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import QrCode from "@/components/QrCode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QrCodeSectionProps {
  qrCodeUrl: string;
  qrCodeColor: string;
  qrCodeCaption: string;
  handleQrUrlChange: (url: string) => void;
  handleQrColorChange: (color: string) => void;
  handleQrCaptionChange: (caption: string) => void;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({
  qrCodeUrl,
  qrCodeColor,
  qrCodeCaption,
  handleQrUrlChange,
  handleQrColorChange,
  handleQrCaptionChange
}) => {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="pt-6 space-y-6">
        <QrCode 
          url={qrCodeUrl} 
          setUrl={handleQrUrlChange}
          color={qrCodeColor}
          setColor={handleQrColorChange}
        />
        
        <div className="space-y-2">
          <Label htmlFor="qr-caption" className="text-sm font-medium text-gray-700">
            QR Code Caption
          </Label>
          <Input
            id="qr-caption"
            value={qrCodeCaption}
            placeholder="Scan for more info"
            onChange={(e) => handleQrCaptionChange(e.target.value)}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QrCodeSection;
