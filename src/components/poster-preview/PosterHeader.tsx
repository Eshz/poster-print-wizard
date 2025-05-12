
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
        <div>{authors}</div>
        <div>{school}</div>
        <div>{contact}</div>
      </div>
    </div>
  );
};

export default PosterHeader;
