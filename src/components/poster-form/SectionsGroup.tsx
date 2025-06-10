
import React, { useState } from 'react';
import ContentSection from './ContentSection';
import { Plus, X, FileText, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <FileText className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-900">Sections</h3>
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
              className="border border-gray-100 rounded-md overflow-hidden"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="h-3 w-3 text-gray-400 cursor-move" />
                  <span className="text-xs font-medium text-gray-900">{section.label}</span>
                </div>
                {isOpen ? (
                  <X className="h-3 w-3 text-gray-500" />
                ) : (
                  <Plus className="h-3 w-3 text-gray-500" />
                )}
              </div>
              
              {isOpen && (
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <ContentSection 
                    posterData={posterData}
                    handleChange={handleChange}
                    handleSectionTitleChange={handleSectionTitleChange}
                    sectionIndex={index}
                    sectionField={section.field}
                  />
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
