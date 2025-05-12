
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface QrCodeProps {
  url: string;
  setUrl: (url: string) => void;
  color: string;
  setColor: (color: string) => void;
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
      
      <div className="mb-4">
        <Label htmlFor="qr-color" className="block mb-2">QR Code Color</Label>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-10 h-10 p-0 border-2"
                style={{
                  backgroundColor: color,
                  borderColor: color === '#ffffff' ? '#e2e8f0' : color
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">
              <HexColorPicker color={color} onChange={setColor} />
            </PopoverContent>
          </Popover>
          <Input
            id="qr-color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-28"
          />
        </div>
      </div>

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
