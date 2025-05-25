
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
    <Card>
      <CardContent className="pt-4 space-y-4">
        <QrCode 
          url={qrCodeUrl} 
          setUrl={handleQrUrlChange}
          color={qrCodeColor}
          setColor={handleQrColorChange}
        />
        
        <div className="space-y-2">
          <Label htmlFor="qr-caption">QR Code Caption</Label>
          <Input
            id="qr-caption"
            value={qrCodeCaption}
            placeholder="Scan for more info"
            onChange={(e) => handleQrCaptionChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QrCodeSection;
