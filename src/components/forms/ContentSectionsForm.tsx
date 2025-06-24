
import React from 'react';
import { FormInput } from './FormInput';
import { PosterData } from '@/types/project';
import { CollapsibleSection } from '@/components/ui/collapsible-section';

interface ContentSectionsFormProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: string) => void;
  onUpdateSectionTitle: (index: number, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ContentSectionsForm: React.FC<ContentSectionsFormProps> = ({
  posterData,
  onUpdateField,
  onUpdateSectionTitle,
  isOpen,
  onToggle
}) => {
  console.log('ContentSectionsForm - posterData:', posterData);

  const sections = [
    { key: 'introduction' as keyof PosterData, defaultTitle: '1. Introduction', titleIndex: 0 },
    { key: 'methods' as keyof PosterData, defaultTitle: '2. Methods', titleIndex: 1 },
    { key: 'findings' as keyof PosterData, defaultTitle: '3. Findings', titleIndex: 2 },
    { key: 'conclusions' as keyof PosterData, defaultTitle: '4. Conclusions', titleIndex: 3 }
  ];

  const handleFieldUpdate = (field: keyof PosterData) => (value: string) => {
    console.log(`Updating content field ${field} with value:`, value);
    onUpdateField(field, value);
  };

  const handleSectionTitleUpdate = (index: number) => (value: string) => {
    console.log(`Updating section title ${index} with value:`, value);
    onUpdateSectionTitle(index, value);
  };

  return (
    <CollapsibleSection
      id="content-sections"
      title="Content Sections"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            <FormInput
              id={`${section.key}-title`}
              label="Section Title"
              value={posterData.sectionTitles?.[section.titleIndex] || section.defaultTitle}
              onChange={handleSectionTitleUpdate(section.titleIndex)}
              type="underline-input"
            />
            
            <FormInput
              id={section.key}
              label="Content"
              value={(posterData[section.key] as string) || ''}
              onChange={handleFieldUpdate(section.key)}
              type="textarea"
              rows={4}
              placeholder={`Enter ${section.key} content...`}
            />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};
