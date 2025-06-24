
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { FormField } from '@/components/ui/form-field';
import { FileText } from 'lucide-react';
import { PosterData } from '@/types/project';

interface ContentSectionsSectionProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: any) => void;
  onUpdateSectionTitle: (index: number, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ContentSectionsSection: React.FC<ContentSectionsSectionProps> = ({
  posterData,
  onUpdateField,
  onUpdateSectionTitle,
  isOpen,
  onToggle
}) => {
  const sections = [
    { key: 'introduction' as keyof PosterData, title: 'Introduction', titleIndex: 0 },
    { key: 'methods' as keyof PosterData, title: 'Methods', titleIndex: 1 },
    { key: 'findings' as keyof PosterData, title: 'Findings', titleIndex: 2 },
    { key: 'conclusions' as keyof PosterData, title: 'Conclusions', titleIndex: 3 }
  ];

  const handleContentChange = (field: keyof PosterData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`ContentSectionsSection - Field ${field} changing to:`, e.target.value);
    onUpdateField(field, e.target.value);
  };

  const handleTitleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`ContentSectionsSection - Section title ${index} changing to:`, e.target.value);
    onUpdateSectionTitle(index, e.target.value);
  };

  return (
    <CollapsibleSection
      id="content-sections"
      title="Content Sections"
      icon={<FileText className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            <FormField
              id={`${section.key}-title`}
              label="Section Title"
              value={posterData.sectionTitles?.[section.titleIndex] || `${section.titleIndex + 1}. ${section.title}`}
              onChange={handleTitleChange(section.titleIndex)}
              type="underline-input"
            />
            
            <FormField
              id={section.key}
              label="Content"
              value={(posterData[section.key] as string) || ''}
              onChange={handleContentChange(section.key)}
              type="textarea"
              rows={4}
              placeholder={`Enter ${section.title.toLowerCase()} content...`}
            />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};
