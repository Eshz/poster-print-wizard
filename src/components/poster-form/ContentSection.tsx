
import React from 'react';
import { ContentSectionItem } from './ContentSectionItem';

interface ContentSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
  sectionIndex: number;
  sectionField: string;
  sectionTitle: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  posterData, 
  handleChange,
  handleSectionTitleChange,
  sectionIndex,
  sectionField,
  sectionTitle
}) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };

  const handleTitleChange = (value: string) => {
    handleSectionTitleChange(sectionIndex, value);
  };

  return (
    <ContentSectionItem
      index={sectionIndex}
      sectionTitle={sectionTitle}
      sectionField={sectionField}
      defaultTitle={posterData?.sectionTitles?.[sectionIndex] || `${sectionIndex + 1}. ${sectionTitle}`}
      content={posterData?.[sectionField] || ""}
      onTitleChange={handleTitleChange}
      onContentChange={handleContentChange}
    />
  );
};

export default ContentSection;
