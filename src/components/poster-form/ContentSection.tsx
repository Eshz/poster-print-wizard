
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContentSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  posterData, 
  handleChange,
  handleSectionTitleChange
}) => {
  // Sections data structure - maps the section index to the corresponding field name
  const sections = [
    { index: 0, field: "introduction", title: "Section 1 Title" },
    { index: 1, field: "methods", title: "Section 2 Title" },
    { index: 2, field: "findings", title: "Section 3 Title" },
    { index: 3, field: "conclusions", title: "Section 4 Title" },
    { index: 4, field: "references", title: "Section 5 Title" }
  ];

  // Make sure sectionTitles exists in posterData and has default values if needed
  const sectionTitles = posterData?.sectionTitles || [
    "1. Introduction",
    "2. Methods",
    "3. Findings",
    "4. Conclusions",
    "5. References"
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div 
          key={section.index}
          className="border border-gray-200 p-3 rounded-md"
        >
          <div className="flex items-center gap-2 mb-1">
            <Label htmlFor={`sectionTitle-${section.index}`}>{section.title}</Label>
            <Input 
              id={`sectionTitle-${section.index}`}
              value={sectionTitles[section.index] || `Section ${section.index + 1}`}
              onChange={(e) => handleSectionTitleChange(section.index, e.target.value)}
              className="max-w-[250px]"
            />
          </div>
          <Textarea
            id={section.field}
            name={section.field}
            value={posterData?.[section.field] || ""}
            onChange={handleChange}
            rows={3}
            className="mb-2"
          />
        </div>
      ))}
    </div>
  );
};

export default ContentSection;
