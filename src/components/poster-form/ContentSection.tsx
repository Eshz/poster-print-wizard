
import React from 'react';
import { Input } from "@/components/ui/input";
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
  handleSectionTitleChange,
  sectionIndex,
  sectionField
}) => {
  const sectionTitles = posterData?.sectionTitles || [
    "1. Introduction",
    "2. Methods", 
    "3. Findings",
    "4. Conclusions",
    "5. References"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`sectionTitle-${sectionIndex}`} className="text-sm font-medium text-gray-900">
          Section Title
        </Label>
        <Input 
          id={`sectionTitle-${sectionIndex}`}
          value={sectionTitles[sectionIndex] || `Section ${sectionIndex + 1}`}
          onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
          placeholder="Enter section title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={sectionField} className="text-sm font-medium text-gray-900">
          Content
        </Label>
        <Textarea
          id={sectionField}
          name={sectionField}
          value={posterData?.[sectionField] || ""}
          onChange={handleChange}
          rows={6}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
          placeholder="Enter section content"
        />
      </div>
    </div>
  );
};

export default ContentSection;
