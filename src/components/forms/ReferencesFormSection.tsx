
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { FormField } from '@/components/ui/form-field';
import { Switch } from '@/components/ui/switch';
import { BookOpen } from 'lucide-react';
import { PosterData } from '@/types/project';

interface ReferencesFormSectionProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ReferencesFormSection: React.FC<ReferencesFormSectionProps> = ({
  posterData,
  onUpdateField,
  isOpen,
  onToggle
}) => {
  const handleReferencesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('ReferencesFormSection - References changing to:', e.target.value);
    onUpdateField('references', e.target.value);
  };

  const handleToggleReferences = (checked: boolean) => {
    onUpdateField('showReferences', checked);
  };

  return (
    <CollapsibleSection
      id="references"
      title="References"
      icon={<BookOpen className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
      rightContent={
        <Switch
          checked={posterData.showReferences !== false}
          onCheckedChange={handleToggleReferences}
          onClick={(e) => e.stopPropagation()}
        />
      }
    >
      {posterData.showReferences !== false && (
        <div className="space-y-4">
          <FormField
            id="references"
            label="References Content"
            value={posterData.references || ''}
            onChange={handleReferencesChange}
            type="textarea"
            rows={6}
            placeholder="Enter references..."
          />
        </div>
      )}
    </CollapsibleSection>
  );
};
