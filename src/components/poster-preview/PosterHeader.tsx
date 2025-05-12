
import React from 'react';

interface PosterHeaderProps {
  title: string;
  authors: string;
  school: string;
  contact: string;
  designSettings: any;
}

const PosterHeader: React.FC<PosterHeaderProps> = ({
  title,
  authors,
  school,
  contact,
  designSettings
}) => {
  return (
    <div 
      className="w-full p-4 text-center"
      style={{ 
        backgroundColor: designSettings.headerBgColor, 
        color: designSettings.headerTextColor,
        fontFamily: `var(--font-${designSettings.titleFont})`
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
      <div 
        className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2 p-2 rounded-md"
        style={{ 
          backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff',
          color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
          fontFamily: `var(--font-${designSettings.contentFont})`,
          margin: '0 auto',
          maxWidth: '95%'
        }}
      >
        <div className="mb-1 md:mb-0 font-semibold">{authors}</div>
        <div className="mb-1 md:mb-0 font-semibold">{school}</div>
        <div className="font-semibold">{contact}</div>
      </div>
    </div>
  );
};

export default PosterHeader;
