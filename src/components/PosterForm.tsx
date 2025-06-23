
import React, { useState } from 'react';
import { ContactInfoForm } from './forms/ContactInfoForm';
import { ContentSectionsForm } from './forms/ContentSectionsForm';
import KeyTakeawaysGroup from './poster-form/KeyTakeawaysGroup';
import ImagesGroup from './poster-form/ImagesGroup';
import QrCodeGroup from './poster-form/QrCodeGroup';
import ReferencesSection from './poster-form/ReferencesSection';
import { usePosterData } from '@/hooks/usePosterData';
import { PosterImage } from '@/types/poster';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const PosterForm: React.FC = () => {
  const {
    posterData,
    updateField,
    updateKeyPoint,
    updateKeyDescription,
    updateKeyVisibility,
    updateSectionTitle,
    updatePosterData
  } = usePosterData();

  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'contact-info': true,
    'content-sections': false,
    'key-takeaways': false,
    'references': false,
    'qr-code': false,
    'images': false
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleImagesChange = (images: PosterImage[]) => {
    updateField('images', images);
  };

  const handleToggleChange = (field: keyof typeof posterData) => (checked: boolean) => {
    updateField(field, checked);
  };

  const handleQrUrlChange = (url: string) => {
    updateField('qrCodeUrl', url);
  };

  const handleQrColorChange = (color: string) => {
    updateField('qrCodeColor', color);
  };

  const handleQrCaptionChange = (caption: string) => {
    updateField('qrCodeCaption', caption);
  };

  const handleKeyTakeawaysReorder = (newKeypoints: string[]) => {
    const currentKeypoints = posterData.keypoints || [];
    const currentDescriptions = posterData.keyDescriptions || [];
    const currentVisibility = posterData.keyVisibility || [];
    
    const indexMap = new Map();
    newKeypoints.forEach((keypoint, newIndex) => {
      const oldIndex = currentKeypoints.indexOf(keypoint);
      if (oldIndex !== -1) {
        indexMap.set(oldIndex, newIndex);
      }
    });
    
    const newDescriptions = new Array(newKeypoints.length);
    const newVisibility = new Array(newKeypoints.length);
    
    indexMap.forEach((newIndex, oldIndex) => {
      newDescriptions[newIndex] = currentDescriptions[oldIndex] || '';
      newVisibility[newIndex] = currentVisibility[oldIndex] !== undefined ? currentVisibility[oldIndex] : true;
    });
    
    updatePosterData(prev => ({
      ...prev,
      keypoints: newKeypoints,
      keyDescriptions: newDescriptions,
      keyVisibility: newVisibility
    }));
  };

  const handleSectionsReorder = (newSectionTitles: string[]) => {
    const sectionFields = ['introduction', 'methods', 'findings', 'conclusions', 'references'];
    const currentData = [
      posterData.introduction || '',
      posterData.methods || '',
      posterData.findings || '',
      posterData.conclusions || '',
      posterData.references || ''
    ];
    
    const currentTitles = posterData.sectionTitles || [];
    const indexMap = new Map();
    newSectionTitles.forEach((title, newIndex) => {
      const oldIndex = currentTitles.indexOf(title);
      if (oldIndex !== -1) {
        indexMap.set(oldIndex, newIndex);
      }
    });
    
    const newData = new Array(5).fill('');
    indexMap.forEach((newIndex, oldIndex) => {
      newData[newIndex] = currentData[oldIndex];
    });
    
    updatePosterData(prev => ({
      ...prev,
      sectionTitles: newSectionTitles,
      introduction: newData[0],
      methods: newData[1],
      findings: newData[2],
      conclusions: newData[3],
      references: newData[4]
    }));
  };

  // Legacy handler for backward compatibility
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof posterData, value);
  };

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-0">
          <ContactInfoForm
            posterData={posterData}
            onUpdateField={updateField}
            isOpen={openSections['contact-info']}
            onToggle={() => toggleSection('contact-info')}
          />
          
          <ContentSectionsForm
            posterData={posterData}
            onUpdateField={updateField}
            onUpdateSectionTitle={updateSectionTitle}
            isOpen={openSections['content-sections']}
            onToggle={() => toggleSection('content-sections')}
          />

          <KeyTakeawaysGroup 
            posterData={posterData}
            handleKeyPointChange={updateKeyPoint}
            handleKeyDescriptionChange={updateKeyDescription}
            handleKeyVisibilityChange={updateKeyVisibility}
            handleKeyTakeawaysReorder={handleKeyTakeawaysReorder}
            handleToggleChange={handleToggleChange}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          <ReferencesSection 
            posterData={posterData}
            handleChange={handleChange}
            openSections={openSections}
            toggleSection={toggleSection}
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

          <ImagesGroup 
            posterData={posterData}
            handleImagesChange={handleImagesChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PosterForm;
