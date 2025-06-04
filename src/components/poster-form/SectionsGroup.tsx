
import React, { useState, useEffect } from 'react';
import ContentSection from './ContentSection';
import { Edit, FileText, Check, X } from "lucide-react";

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
  const [tempValues, setTempValues] = useState<{[key: string]: {content: string, title: string}}>({});

  const sections = [
    { id: 'introduction', label: 'Introduction', field: 'introduction' },
    { id: 'methods', label: 'Methods', field: 'methods' },
    { id: 'findings', label: 'Findings', field: 'findings' },
    { id: 'conclusions', label: 'Conclusions', field: 'conclusions' },
    { id: 'references', label: 'References', field: 'references' },
  ];

  useEffect(() => {
    // Initialize temp values when sections open
    sections.forEach((section, index) => {
      if (openSections[section.id] && !tempValues[section.id]) {
        const sectionTitles = posterData?.sectionTitles || [
          "1. Introduction",
          "2. Methods", 
          "3. Findings",
          "4. Conclusions",
          "5. References"
        ];
        setTempValues(prev => ({
          ...prev,
          [section.id]: {
            content: posterData[section.field] || '',
            title: sectionTitles[index] || section.label
          }
        }));
      }
    });
  }, [openSections, posterData]);

  const handleAccept = (section: any, index: number) => {
    const tempValue = tempValues[section.id];
    if (tempValue) {
      handleChange({ target: { name: section.field, value: tempValue.content } } as React.ChangeEvent<HTMLTextAreaElement>);
      handleSectionTitleChange(index, tempValue.title);
    }
    toggleSection(section.id);
    setTempValues(prev => {
      const newValues = { ...prev };
      delete newValues[section.id];
      return newValues;
    });
  };

  const handleCancel = (sectionId: string) => {
    toggleSection(sectionId);
    setTempValues(prev => {
      const newValues = { ...prev };
      delete newValues[sectionId];
      return newValues;
    });
  };

  const handleTempContentChange = (sectionId: string, value: string) => {
    setTempValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        content: value
      }
    }));
  };

  const handleTempTitleChange = (sectionId: string, value: string) => {
    setTempValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        title: value
      }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
        </div>
      </div>
      
      <div className="p-6 space-y-3">
        {sections.map((section, index) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {!openSections[section.id] && (
              <div 
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <span className="text-sm font-medium text-gray-900">{section.label}</span>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
            )}
            
            {openSections[section.id] && (
              <div className="p-4 bg-white">
                <div className="flex items-center justify-end mb-4 gap-2">
                  <button 
                    onClick={() => handleAccept(section, index)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Check className="h-4 w-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleCancel(section.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <ContentSection 
                  posterData={{
                    ...posterData,
                    [section.field]: tempValues[section.id]?.content !== undefined ? tempValues[section.id].content : posterData[section.field],
                    sectionTitles: tempValues[section.id]?.title !== undefined ? 
                      [...(posterData.sectionTitles || []), tempValues[section.id].title].slice(0, posterData.sectionTitles?.length || 5) :
                      posterData.sectionTitles
                  }}
                  handleChange={(e) => handleTempContentChange(section.id, e.target.value)}
                  handleSectionTitleChange={(idx, value) => handleTempTitleChange(section.id, value)}
                  sectionIndex={index}
                  sectionField={section.field}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsGroup;
