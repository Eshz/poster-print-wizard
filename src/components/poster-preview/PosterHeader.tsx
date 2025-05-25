
import React from 'react';

interface PosterHeaderProps {
  title: string;
  authors: string;
  school: string;
  contact: string;
  designSettings: any;
  qrCodeUrl?: string;
  showQrCode?: boolean;
  qrCodeCaption?: string;
}

const PosterHeader: React.FC<PosterHeaderProps> = ({
  title,
  authors,
  school,
  contact,
  designSettings,
  qrCodeUrl,
  showQrCode,
  qrCodeCaption
}) => {
  return (
    <>
      <div 
        className="w-full p-4 text-center relative flex items-center justify-center"
        style={{ 
          backgroundColor: designSettings.headerBgColor, 
          color: designSettings.headerTextColor,
          fontFamily: `var(--font-${designSettings.titleFont})`,
          minHeight: showQrCode && qrCodeUrl ? '120px' : 'auto'
        }}
      >
        <div className="flex-1 transition-all duration-300 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase flex-1">{title}</h1>
          
          {/* QR Code positioned within the flex-1 container */}
          {showQrCode && qrCodeUrl && (
            <div className="flex flex-col items-center p-2 ml-4">
              <div className="bg-white p-2 rounded shadow-sm mb-2">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              {qrCodeCaption && (
                <p 
                  className="text-xs text-center mb-2 px-1 leading-tight max-w-24"
                  style={{ 
                    color: designSettings.headerTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  {qrCodeCaption}
                </p>
              )}
              {!qrCodeCaption && (
                <p 
                  className="text-xs text-center px-1 leading-tight max-w-24"
                  style={{ 
                    color: designSettings.headerTextColor,
                    fontFamily: `var(--font-${designSettings.contentFont})`
                  }}
                >
                  Scan for more info
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Author info with borders above and below - updated font family */}
      <div 
        className="w-full text-center py-2 mt-2"
        style={{
          borderTop: `2px solid ${designSettings.keyPointsTextColor || designSettings.sectionTitleColor}`,
          borderBottom: `2px solid ${designSettings.keyPointsTextColor || designSettings.sectionTitleColor}`,
          backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff',
        }}
      >
        <div 
          className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2 px-4 mx-auto"
          style={{ 
            color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
            fontFamily: `var(--font-${designSettings.titleFont})`,
            maxWidth: '95%'
          }}
        >
          <div className="mb-1 md:mb-0 font-semibold">{authors}</div>
          <div className="mb-1 md:mb-0 font-semibold">{school}</div>
          <div className="font-semibold">{contact}</div>
        </div>
      </div>
    </>
  );
};

export default PosterHeader;
