
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
  const sections = [
    { key: 'introduction' as keyof PosterData, defaultTitle: '1. Introduction', titleIndex: 0 },
    { key: 'methods' as keyof PosterData, defaultTitle: '2. Methods', titleIndex: 1 },
    { key: 'findings' as keyof PosterData, defaultTitle: '3. Findings', titleIndex: 2 },
    { key: 'conclusions' as keyof PosterData, defaultTitle: '4. Conclusions', titleIndex: 3 }
  ];

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
              onChange={(value) => onUpdateSectionTitle(section.titleIndex, value)}
              type="underline-input"
            />
            
            <FormInput
              id={section.key}
              label="Content"
              value={posterData[section.key] as string}
              onChange={(value) => onUpdateField(section.key, value)}
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
