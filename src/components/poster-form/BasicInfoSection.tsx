
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  singleField?: string;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  posterData, 
  handleChange,
  singleField
}) => {
  // If singleField is provided, only show that field
  if (singleField) {
    const fieldConfig = {
      title: { label: 'Title', placeholder: 'Enter your poster title' },
      authors: { label: 'Authors', placeholder: 'Enter author names' },
      school: { label: 'School/Institution', placeholder: 'Enter institution name' },
      contact: { label: 'Contact Info', placeholder: 'Enter contact information' }
    };

    const config = fieldConfig[singleField as keyof typeof fieldConfig];
    if (!config) return null;

    return (
      <div className="space-y-2">
        <Label htmlFor={singleField} className="text-xs font-medium text-gray-700">
          {config.label}
        </Label>
        <Input
          id={singleField}
          name={singleField}
          value={posterData[singleField] || ''}
          onChange={handleChange}
          placeholder={config.placeholder}
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
        />
      </div>
    );
  }

  // Updated layout with each field in separate row
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-xs font-medium text-gray-700">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          value={posterData.title || ''}
          onChange={handleChange}
          placeholder="Enter your poster title"
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="authors" className="text-xs font-medium text-gray-700">
          Authors
        </Label>
        <Input
          id="authors"
          name="authors"
          value={posterData.authors || ''}
          onChange={handleChange}
          placeholder="Enter author names"
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="school" className="text-xs font-medium text-gray-700">
          School/Institution
        </Label>
        <Input
          id="school"
          name="school"
          value={posterData.school || ''}
          onChange={handleChange}
          placeholder="Enter institution name"
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contact" className="text-xs font-medium text-gray-700">
          Contact Info
        </Label>
        <Input
          id="contact"
          name="contact"
          value={posterData.contact || ''}
          onChange={handleChange}
          placeholder="Enter contact information"
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
