
import React, { useState } from 'react';
import ContactInfoSection from './poster-form/ContactInfoSection';
import SectionsGroup from './poster-form/SectionsGroup';
import KeyTakeawaysGroup from './poster-form/KeyTakeawaysGroup';
import ImagesGroup from './poster-form/ImagesGroup';
import QrCodeGroup from './poster-form/QrCodeGroup';

interface PosterFormProps {
  posterData: any;
  setPosterData: React.Dispatch<React.SetStateAction<any>>;
}

const PosterForm: React.FC<PosterFormProps> = ({ 
  posterData, 
  setPosterData
}) => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPosterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleKeyPointChange = (index: number, value: string) => {
    const updatedKeypoints = [...posterData.keypoints];
    updatedKeypoints[index] = value;
    setPosterData(prev => ({ ...prev, keypoints: updatedKeypoints }));
  };
  
  const handleKeyDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...posterData.keyDescriptions];
    updatedDescriptions[index] = value;
    setPosterData(prev => ({ ...prev, keyDescriptions: updatedDescriptions }));
  };

  const handleKeyVisibilityChange = (index: number, visible: boolean) => {
    const updatedVisibility = [...(posterData.keyVisibility || [true, true, true, true])];
    updatedVisibility[index] = visible;
    setPosterData(prev => ({ ...prev, keyVisibility: updatedVisibility }));
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    const updatedSectionTitles = [...posterData.sectionTitles];
    updatedSectionTitles[index] = value;
    setPosterData(prev => ({ ...prev, sectionTitles: updatedSectionTitles }));
  };

  const handleQrUrlChange = (url: string) => {
    setPosterData(prev => ({ ...prev, qrCodeUrl: url }));
  };
  
  const handleQrColorChange = (color: string) => {
    setPosterData(prev => ({ ...prev, qrCodeColor: color }));
  };
  
  const handleImagesChange = (images: { url: string; visible: boolean; caption: string }[]) => {
    setPosterData(prev => ({ ...prev, images }));
  };
  
  const handleToggleChange = (field: string) => (checked: boolean) => {
    setPosterData(prev => ({ ...prev, [field]: checked }));
  };
  
  const handleQrCaptionChange = (caption: string) => {
    setPosterData(prev => ({ ...prev, qrCodeCaption: caption }));
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <ContactInfoSection 
          posterData={posterData}
          handleChange={handleChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />
        
        <SectionsGroup 
          posterData={posterData}
          handleChange={handleChange}
          handleSectionTitleChange={handleSectionTitleChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <KeyTakeawaysGroup 
          posterData={posterData}
          handleKeyPointChange={handleKeyPointChange}
          handleKeyDescriptionChange={handleKeyDescriptionChange}
          handleKeyVisibilityChange={handleKeyVisibilityChange}
          handleToggleChange={handleToggleChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />

        <ImagesGroup 
          posterData={posterData}
          handleImagesChange={handleImagesChange}
        />

        <QrCodeGroup 
          posterData={posterData}
          handleQrUrlChange={handleQrUrlChange}
          handleQrColorChange={handleQrColorChange}
          handleQrCaptionChange={handleQrCaptionChange}
          handleToggleChange={handleToggleChange}
          openSections={openSections}
          toggleSection={toggleSection}
        />
      </div>
    </div>
  );
};

export default PosterForm;
