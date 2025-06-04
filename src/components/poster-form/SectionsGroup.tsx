
import React from 'react';
import ContentSection from './ContentSection';
import { Edit, FileText } from "lucide-react";

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
  const sections = [
    { id: 'introduction', label: 'Introduction', field: 'introduction' },
    { id: 'methods', label: 'Methods', field: 'methods' },
    { id: 'findings', label: 'Findings', field: 'findings' },
    { id: 'conclusions', label: 'Conclusions', field: 'conclusions' },
    { id: 'references', label: 'References', field: 'references' },
  ];

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
        ))}
      </div>
    </div>
  );
};

export default SectionsGroup;
