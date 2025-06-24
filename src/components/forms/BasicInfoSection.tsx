
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { FormField } from '@/components/ui/form-field';
import { User } from 'lucide-react';
import { PosterData } from '@/types/project';

interface BasicInfoSectionProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  posterData,
  onUpdateField,
  isOpen,
  onToggle
}) => {
  const handleFieldChange = (field: keyof PosterData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`BasicInfoSection - Field ${field} changing to:`, e.target.value);
    onUpdateField(field, e.target.value);
  };

  return (
    <CollapsibleSection
      id="basic-info"
      title="General Information"
      icon={<User className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <FormField
          id="title"
          label="Poster Title"
          value={posterData.title || ''}
          onChange={handleFieldChange('title')}
          placeholder="Enter your poster title"
          required
        />

        <FormField
          id="authors"
          label="Authors"
          value={posterData.authors || ''}
          onChange={handleFieldChange('authors')}
          placeholder="Enter author names"
          required
        />

        <FormField
          id="school"
          label="Institution/School"
          value={posterData.school || ''}
          onChange={handleFieldChange('school')}
          placeholder="Enter institution name"
          required
        />

        <FormField
          id="contact"
          label="Contact Information"
          value={posterData.contact || ''}
          onChange={handleFieldChange('contact')}
          placeholder="Enter contact email or information"
          required
        />
      </div>
    </CollapsibleSection>
  );
};
