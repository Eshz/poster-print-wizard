
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
  // Calculate relative widths based on content length - with safe defaults
  const authorsLength = (authors || '').length;
  const schoolLength = (school || '').length;
  const contactLength = (contact || '').length;
  const totalLength = authorsLength + schoolLength + contactLength;
  
  // Calculate flex basis percentages, with minimum 25% and maximum 50% per element
  const getFlexBasis = (length: number) => {
    const percentage = (length / totalLength) * 100;
    return Math.max(25, Math.min(50, percentage));
  };
  
  const authorsFlex = getFlexBasis(authorsLength);
  const schoolFlex = getFlexBasis(schoolLength);
  const contactFlex = getFlexBasis(contactLength);

  return (
    <>
      <div 
        className={`w-full text-center relative flex items-center justify-center px-4 ${showQrCode && qrCodeUrl ? 'py-2' : 'py-4'}`}
        style={{ 
          backgroundColor: designSettings.headerBgColor, 
          color: designSettings.headerTextColor,
          fontFamily: `var(--font-${designSettings.titleFont})`,
          minHeight: showQrCode && qrCodeUrl ? '120px' : 'auto'
        }}
      >
        <div className="flex-1 transition-all duration-300 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase flex-1">{title || 'Poster Title'}</h1>
          
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
                    fontFamily: `var(--font-${designSettings.titleFont})`
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
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  Scan me!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Author info with top and bottom borders - Fixed height and responsive text */}
      <div 
        className="w-full text-center py-2 h-12 flex items-center"
        style={{
          borderTop: '1px solid #202b5b',
          borderBottom: '1px solid #202b5b',
          backgroundColor: designSettings.headerBgColor,
        }}
      >
        <div 
          className="flex flex-row justify-between items-center gap-2 px-2 mx-auto overflow-hidden w-full"
          style={{ 
            color: designSettings.headerTextColor,
            fontFamily: `var(--font-${designSettings.titleFont})`,
            fontSize: 'clamp(10px, 1.2vw, 14px)'
          }}
        >
          <div 
            className="font-semibold min-w-0 truncate leading-tight"
            style={{ flexBasis: `${authorsFlex}%` }}
            title={authors || 'Authors'}
          >
            {authors || 'Authors'}
          </div>
          <div 
            className="font-semibold min-w-0 truncate leading-tight"
            style={{ flexBasis: `${schoolFlex}%` }}
            title={school || 'Institution'}
          >
            {school || 'Institution'}
          </div>
          <div 
            className="font-semibold min-w-0 truncate leading-tight"
            style={{ flexBasis: `${contactFlex}%` }}
            title={contact || 'Contact'}
          >
            {contact || 'Contact'}
          </div>
        </div>
      </div>
    </>
  );
};

export default PosterHeader;
