
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QrCodeProps {
  url: string;
  setUrl: (url: string) => void;
  color: string;
  setColor: (color: string) => void; // Add the missing setColor prop to the interface
}

const QrCode: React.FC<QrCodeProps> = ({ url, setUrl, color, setColor }) => {
  // QR Code API from QRServer.com
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&color=${color.replace('#', '')}`;
  
  return (
    <div className="space-y-3">
      <Label htmlFor="qr-url">QR Code Link</Label>
      <Input
        id="qr-url"
        value={url}
        placeholder="https://your-website.com"
        onChange={(e) => setUrl(e.target.value)}
        className="mb-2"
      />
      
      <div className="flex justify-center">
        {url && (
          <div className="border rounded-md p-2 bg-white">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-[150px] h-[150px]"
              width={150}
              height={150}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCode;
