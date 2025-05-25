
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
        className="w-full p-4 text-center relative"
        style={{ 
          backgroundColor: designSettings.headerBgColor, 
          color: designSettings.headerTextColor,
          fontFamily: `var(--font-${designSettings.titleFont})`
        }}
      >
        <div className={`${showQrCode && qrCodeUrl ? 'pr-32' : ''} transition-all duration-300`}>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase">{title}</h1>
        </div>
        
        {/* QR Code - absolute positioned to the right with proper padding */}
        {showQrCode && qrCodeUrl && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center p-2">
            <div className="bg-white p-2 rounded shadow-sm mb-2">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-20 h-20 object-contain"
              />
            </div>
            {qrCodeCaption && (
              <p 
                className="text-xs text-center mb-2 px-1 leading-tight"
                style={{ 
                  color: designSettings.headerTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {qrCodeCaption}
              </p>
            )}
            <p 
              className="text-xs text-center px-1 leading-tight"
              style={{ 
                color: designSettings.headerTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
            >
              Scan for more info
            </p>
          </div>
        )}
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
            fontFamily: `var(--font-${designSettings.titleFont})`, // Changed from contentFont to titleFont
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
