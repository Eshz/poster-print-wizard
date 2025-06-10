
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContentSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
  sectionIndex: number;
  sectionField: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  posterData, 
  handleChange,
  sectionField
}) => {
  return (
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
        placeholder="Enter section content"
      />
    </div>
  );
};

export default ContentSection;
