
import React from 'react';
import { FormInput } from './FormInput';
import { PosterData } from '@/types/project';
import { CollapsibleSection } from '@/components/ui/collapsible-section';

interface ContactInfoFormProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  posterData,
  onUpdateField,
  isOpen,
  onToggle
}) => {
  console.log('ContactInfoForm - posterData:', posterData);
  console.log('ContactInfoForm - onUpdateField:', typeof onUpdateField);

  const handleFieldUpdate = (field: keyof PosterData) => (value: string) => {
    console.log(`Updating field ${field} with value:`, value);
    onUpdateField(field, value);
  };

  return (
    <CollapsibleSection
      id="contact-info"
      title="General Information"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <FormInput
          id="title"
          label="Poster Title"
          value={posterData.title || ''}
          onChange={handleFieldUpdate('title')}
          placeholder="Enter your poster title"
          required
        />

        <FormInput
          id="authors"
          label="Authors"
          value={posterData.authors || ''}
          onChange={handleFieldUpdate('authors')}
          placeholder="Enter author names"
          required
        />

        <FormInput
          id="school"
          label="Institution/School"
          value={posterData.school || ''}
          onChange={handleFieldUpdate('school')}
          placeholder="Enter institution name"
          required
        />

        <FormInput
          id="contact"
          label="Contact Information"
          value={posterData.contact || ''}
          onChange={handleFieldUpdate('contact')}
          placeholder="Enter contact email or information"
          required
        />
      </div>
    </CollapsibleSection>
  );
};
