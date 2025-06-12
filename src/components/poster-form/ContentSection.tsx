
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor={`section-title-${sectionIndex}`} className="text-xs font-medium text-gray-700">
          {sectionTitle} Title
        </Label>
        <Input
          id={`section-title-${sectionIndex}`}
          value={posterData?.sectionTitles?.[sectionIndex] || `${sectionIndex + 1}. ${sectionTitle}`}
          onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
          placeholder={`Enter ${sectionTitle.toLowerCase()} title`}
          className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={sectionField} className="text-xs font-medium text-gray-700">
          Content
        </Label>
        <Textarea
          id={sectionField}
          name={sectionField}
          value={posterData?.[sectionField] || ""}
          onChange={handleChange}
          rows={6}
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          placeholder={`Enter ${sectionTitle.toLowerCase()} content`}
        />
      </div>
    </div>
  );
};

export default ContentSection;
