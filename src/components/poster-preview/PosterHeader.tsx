
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
      <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm">
        <div className="md:w-1/3 mb-1 md:mb-0">{authors}</div>
        <div className="md:w-1/3 mb-1 md:mb-0">{school}</div>
        <div className="md:w-1/3">{contact}</div>
      </div>
    </div>
  );
};

export default PosterHeader;
