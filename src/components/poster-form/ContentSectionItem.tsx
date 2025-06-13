
import React from 'react';
import { SectionInput } from '@/components/ui/section-input';
import { ContentEditor } from '@/components/ui/content-editor';

interface ContentSectionItemProps {
  index: number;
  sectionTitle: string;
  sectionField: string;
  defaultTitle: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ContentSectionItem: React.FC<ContentSectionItemProps> = ({
  index,
  sectionTitle,
  sectionField,
  defaultTitle,
  content,
  onTitleChange,
  onContentChange
}) => {
  return (
    <div className="space-y-4">
      <SectionInput
        id={`section-title-${index}`}
        label={`${sectionTitle} Title`}
        value={defaultTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={`Enter ${sectionTitle.toLowerCase()} title`}
      />
      
      <ContentEditor
        id={sectionField}
        label="Content"
        value={content}
        onChange={onContentChange}
        placeholder={`Enter ${sectionTitle.toLowerCase()} content`}
      />
    </div>
  );
};
