
import React, { useState } from 'react';
import { usePosterData } from '@/hooks/usePosterData';
import { BasicInfoSection } from './BasicInfoSection';
import { ContentSectionsSection } from './ContentSectionsSection';
import { KeyTakeawaysSection } from './KeyTakeawaysSection';
import { ReferencesFormSection } from './ReferencesFormSection';
import { QrCodeFormSection } from './QrCodeFormSection';
import { ImagesFormSection } from './ImagesFormSection';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const PosterContentForm: React.FC = () => {
  const { posterData, updateField, updateKeyPoint, updateKeyDescription, updateKeyVisibility, updateSectionTitle } = usePosterData();
  
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'basic-info': true,
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

  console.log('PosterContentForm - posterData:', posterData);

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-0">
          <BasicInfoSection
            posterData={posterData}
            onUpdateField={updateField}
            isOpen={openSections['basic-info']}
            onToggle={() => toggleSection('basic-info')}
          />
          
          <ContentSectionsSection
            posterData={posterData}
            onUpdateField={updateField}
            onUpdateSectionTitle={updateSectionTitle}
            isOpen={openSections['content-sections']}
            onToggle={() => toggleSection('content-sections')}
          />

          <KeyTakeawaysSection
            posterData={posterData}
            onUpdateKeyPoint={updateKeyPoint}
            onUpdateKeyDescription={updateKeyDescription}
            onUpdateKeyVisibility={updateKeyVisibility}
            onToggleShowKeypoints={(checked) => updateField('showKeypoints', checked)}
            isOpen={openSections['key-takeaways']}
            onToggle={() => toggleSection('key-takeaways')}
          />

          <ReferencesFormSection
            posterData={posterData}
            onUpdateField={updateField}
            isOpen={openSections['references']}
            onToggle={() => toggleSection('references')}
          />

          <QrCodeFormSection
            posterData={posterData}
            onUpdateField={updateField}
            isOpen={openSections['qr-code']}
            onToggle={() => toggleSection('qr-code')}
          />

          <ImagesFormSection
            posterData={posterData}
            onUpdateField={updateField}
            isOpen={openSections['images']}
            onToggle={() => toggleSection('images')}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PosterContentForm;
