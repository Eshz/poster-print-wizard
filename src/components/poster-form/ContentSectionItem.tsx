
import React from 'react';
import { SectionInput } from '@/components/ui/section-input';
import { ContentEditor } from '@/components/ui/content-editor';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-move">
      <CardContent className="p-0 space-y-4">
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
      </CardContent>
    </Card>
  );
};
