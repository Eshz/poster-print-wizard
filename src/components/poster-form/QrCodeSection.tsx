
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import QrCode from "@/components/QrCode";

interface QrCodeSectionProps {
  qrCodeUrl: string;
  qrCodeColor: string;
  handleQrUrlChange: (url: string) => void;
  handleQrColorChange: (color: string) => void;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({
  qrCodeUrl,
  qrCodeColor,
  handleQrUrlChange,
  handleQrColorChange
}) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <QrCode 
          url={qrCodeUrl} 
          setUrl={handleQrUrlChange}
          color={qrCodeColor}
          setColor={handleQrColorChange}
        />
      </CardContent>
    </Card>
  );
};

export default QrCodeSection;
