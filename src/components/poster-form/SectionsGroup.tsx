
import React, { useState } from 'react';
import ContentSection from './ContentSection';
import { ChevronDown, ChevronUp, FileText, GripVertical, Plus } from "lucide-react";
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
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const [sections, setSections] = useState([
    { id: 'introduction', label: 'Introduction', field: 'introduction' },
    { id: 'methods', label: 'Methods', field: 'methods' },
    { id: 'findings', label: 'Findings', field: 'findings' },
    { id: 'conclusions', label: 'Conclusions', field: 'conclusions' },
  ]);

  const isSectionsOpen = openSections['sections'];

  const addNewSection = () => {
    const newId = `custom-${Date.now()}`;
    const newSection = {
      id: newId,
      label: `Section ${sections.length + 1}`,
      field: `customSection${sections.length + 1}`
    };
    setSections(prev => [...prev, newSection]);
    
    // Initialize the new section content in posterData
    handleChange({ target: { name: newSection.field, value: '' } } as any);
    
    // Update section titles to include the new section
    const newSectionTitles = [...(posterData?.sectionTitles || [])];
    newSectionTitles.push(`${sections.length + 1}. ${newSection.label}`);
    handleChange({ target: { name: 'sectionTitles', value: newSectionTitles } } as any);
    
    // Update sections order to include the new section
    handleChange({ target: { name: 'sectionsOrder', value: [...sections, newSection] } } as any);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);
    
    // Update the sections state to save the new order
    setSections(newSections);
    
    // Update section titles to match new order
    const newSectionTitles = [...(posterData?.sectionTitles || [])];
    const draggedTitle = newSectionTitles[draggedIndex];
    newSectionTitles.splice(draggedIndex, 1);
    newSectionTitles.splice(dropIndex, 0, draggedTitle);
    
    // Save the new order in posterData
    handleChange({ target: { name: 'sectionsOrder', value: newSections } } as any);
    handleChange({ target: { name: 'sectionTitles', value: newSectionTitles } } as any);
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
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
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors mb-4"
        onClick={() => toggleSection('sections')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <FileText className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
        </div>
        {isSectionsOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      
      {isSectionsOpen && (
        <div className="space-y-2">
          {sections.map((section, index) => {
            const isOpen = openSections[section.id];
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index;
            
            return (
              <div 
                key={section.id}
                className={`border-b border-gray-100 pb-2 transition-all duration-200 ${
                  isDragging ? 'opacity-50 scale-95' : ''
                } ${isDragOver ? 'border-blue-300 bg-blue-50' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                {isDragOver && (
                  <div className="h-1 bg-blue-400 rounded-full mb-2 transition-all duration-200" />
                )}
                
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
                    <ChevronDown className="h-4 w-4 text-gray-500" />
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
                          className="border-0 border-b border-gray-300 focus:border-blue-400 rounded-none bg-transparent text-lg font-semibold text-gray-900 px-0"
                          placeholder="Section title"
                        />
                      </div>
                      <ChevronUp 
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
          
          {/* Add Section Button at the bottom */}
          <div className="pt-2">
            <Button 
              onClick={addNewSection}
              variant="ghost" 
              size="sm"
              className="h-8 px-3 text-sm text-gray-600 hover:text-gray-900 border border-dashed border-gray-300 hover:border-gray-400 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionsGroup;
