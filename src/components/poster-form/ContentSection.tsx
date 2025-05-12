
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoveVertical } from "lucide-react";

interface ContentSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
  reorderSections?: (dragIndex: number, dropIndex: number) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  posterData, 
  handleChange,
  handleSectionTitleChange,
  reorderSections
}) => {
  // Sections data structure - maps the section index to the corresponding field name
  const sections = [
    { index: 0, field: "introduction", title: "Section 1 Title" },
    { index: 1, field: "methods", title: "Section 2 Title" },
    { index: 2, field: "findings", title: "Section 3 Title" },
    { index: 3, field: "conclusions", title: "Section 4 Title" },
    { index: 4, field: "references", title: "Section 5 Title" }
  ];

  // Drag and drop functionality
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!reorderSections) return;
    
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex === targetIndex) return;
    
    reorderSections(dragIndex, targetIndex);
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div 
          key={section.index}
          draggable={!!reorderSections}
          onDragStart={(e) => handleDragStart(e, section.index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, section.index)}
          className={`${reorderSections ? 'border border-dashed border-gray-300 p-3 rounded-md' : ''}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {reorderSections && (
              <div className="cursor-move text-gray-500 hover:text-gray-700">
                <MoveVertical size={18} />
              </div>
            )}
            <Label htmlFor={`sectionTitle-${section.index}`}>{section.title}</Label>
            <Input 
              id={`sectionTitle-${section.index}`}
              value={posterData.sectionTitles[section.index]}
              onChange={(e) => handleSectionTitleChange(section.index, e.target.value)}
              className="max-w-[250px]"
            />
          </div>
          <Textarea
            id={section.field}
            name={section.field}
            value={posterData[section.field]}
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
