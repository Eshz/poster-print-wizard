
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
  // Filter out empty fields and create array of visible fields
  const visibleFields = [
    { content: authors?.trim(), label: 'Authors' },
    { content: school?.trim(), label: 'Institution' },
    { content: contact?.trim(), label: 'Contact' }
  ].filter(field => field.content);

  // Check if authors row should be hidden (all fields empty)
  const shouldHideAuthorsRow = visibleFields.length === 0;

  // Calculate equal flex basis for visible fields
  const flexBasis = visibleFields.length > 0 ? `${100 / visibleFields.length}%` : '100%';

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
                  className="text-xs text-center mb-2 px-1 leading-tight max-w-24 font-bold"
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
                  className="text-xs text-center px-1 leading-tight max-w-24 font-bold"
                  style={{ 
                    color: designSettings.headerTextColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  Full Research
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Author info with top and bottom borders - only render if there are visible fields */}
      {!shouldHideAuthorsRow && (
        <div 
          className="w-full text-center py-2"
          style={{
            borderTop: '1px solid #202b5b',
            borderBottom: '1px solid #202b5b',
            backgroundColor: designSettings.headerBgColor,
          }}
        >
          <div 
            className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 px-2 mx-auto text-xs md:text-sm overflow-hidden"
            style={{ 
              color: designSettings.headerTextColor,
              fontFamily: `var(--font-${designSettings.titleFont})`,
              maxWidth: '98%'
            }}
          >
            {visibleFields.map((field, index) => (
              <div 
                key={index}
                className="mb-1 md:mb-0 font-semibold min-w-0 break-words"
                style={{ flexBasis }}
              >
                {field.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PosterHeader;
