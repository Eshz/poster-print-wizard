
import React from 'react';
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import ContentSection from './ContentSection';

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
  const isOpen = openSections['sections'];

  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={() => toggleSection('sections')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <FileText className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="pl-9 space-y-0">
          <ContentSection
            title="Introduction"
            content={posterData?.introduction || ""}
            name="introduction"
            placeholder="Introduce your research topic, background, and objectives..."
            handleChange={handleChange}
            sectionTitle={posterData?.sectionTitles?.[0] || ""}
            onSectionTitleChange={(value) => handleSectionTitleChange(0, value)}
          />
          
          <ContentSection
            title="Methods"
            content={posterData?.methods || ""}
            name="methods"
            placeholder="Describe your methodology, approach, and procedures..."
            handleChange={handleChange}
            sectionTitle={posterData?.sectionTitles?.[1] || ""}
            onSectionTitleChange={(value) => handleSectionTitleChange(1, value)}
          />
          
          <ContentSection
            title="Findings"
            content={posterData?.findings || ""}
            name="findings"
            placeholder="Present your main results and discoveries..."
            handleChange={handleChange}
            sectionTitle={posterData?.sectionTitles?.[2] || ""}
            onSectionTitleChange={(value) => handleSectionTitleChange(2, value)}
          />
          
          <ContentSection
            title="Conclusions"
            content={posterData?.conclusions || ""}
            name="conclusions"
            placeholder="Summarize your conclusions and implications..."
            handleChange={handleChange}
            sectionTitle={posterData?.sectionTitles?.[3] || ""}
            onSectionTitleChange={(value) => handleSectionTitleChange(3, value)}
          />
        </div>
      )}
    </div>
  );
};

export default SectionsGroup;
