
import React, { useState } from 'react';
import ContentSection from './ContentSection';
import { Plus, X, FileText, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SectionsGroupProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const SectionsGroup: React.FC<SectionsGroupProps> = ({
  posterData,
  handleChange,
  handleSectionTitleChange,
  openSections,
  toggleSection
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [sections, setSections] = useState([
    { id: 'introduction', label: 'Introduction', field: 'introduction' },
    { id: 'methods', label: 'Methods', field: 'methods' },
    { id: 'findings', label: 'Findings', field: 'findings' },
    { id: 'conclusions', label: 'Conclusions', field: 'conclusions' },
  ]);

  const addNewSection = () => {
    const newId = `custom-${Date.now()}`;
    const newSection = {
      id: newId,
      label: `Section ${sections.length + 1}`,
      field: `customSection${sections.length + 1}`
    };
    setSections(prev => [...prev, newSection]);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);
    
    setSections(newSections);
    setDraggedIndex(null);
  };

  const sectionTitles = posterData?.sectionTitles || [
    "1. Introduction",
    "2. Methods", 
    "3. Findings",
    "4. Conclusions",
    "5. References"
  ];

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <FileText className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
        </div>
        <Button 
          onClick={addNewSection}
          variant="ghost" 
          size="sm"
          className="h-6 px-2 text-xs text-gray-600 hover:text-gray-900"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {sections.map((section, index) => {
          const isOpen = openSections[section.id];
          return (
            <div 
              key={section.id}
              className="border-b border-gray-100 pb-2"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {!isOpen && (
                <div 
                  className="flex items-center justify-between p-2 hover:bg-gray-50 transition-colors cursor-pointer rounded-md"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-3 w-3 text-gray-400 cursor-move" />
                    <span className="text-lg font-semibold text-gray-900">
                      {sectionTitles[index] || section.label}
                    </span>
                  </div>
                  <Plus className="h-4 w-4 text-gray-500" />
                </div>
              )}
              
              {isOpen && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2 flex-1">
                      <GripVertical className="h-3 w-3 text-gray-400 cursor-move" />
                      <Input 
                        value={sectionTitles[index] || section.label}
                        onChange={(e) => handleSectionTitleChange(index, e.target.value)}
                        className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-lg font-semibold text-gray-900 px-0"
                        placeholder="Section title"
                      />
                    </div>
                    <X 
                      className="h-4 w-4 text-gray-500 cursor-pointer" 
                      onClick={() => toggleSection(section.id)}
                    />
                  </div>
                  
                  <div className="pl-5">
                    <ContentSection 
                      posterData={posterData}
                      handleChange={handleChange}
                      handleSectionTitleChange={handleSectionTitleChange}
                      sectionIndex={index}
                      sectionField={section.field}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsGroup;
