
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
        <Label htmlFor={singleField} className="text-sm font-medium text-gray-900">
          {config.label}
        </Label>
        <Input
          id={singleField}
          name={singleField}
          value={posterData[singleField] || ''}
          onChange={handleChange}
          placeholder={config.placeholder}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>
    );
  }

  // Full form layout with each field in its own row
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-900">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          value={posterData.title || ''}
          onChange={handleChange}
          placeholder="Enter your poster title"
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="authors" className="text-sm font-medium text-gray-900">
          Authors
        </Label>
        <Input
          id="authors"
          name="authors"
          value={posterData.authors || ''}
          onChange={handleChange}
          placeholder="Enter author names"
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="school" className="text-sm font-medium text-gray-900">
          School/Institution
        </Label>
        <Input
          id="school"
          name="school"
          value={posterData.school || ''}
          onChange={handleChange}
          placeholder="Enter institution name"
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contact" className="text-sm font-medium text-gray-900">
          Contact Info
        </Label>
        <Input
          id="contact"
          name="contact"
          value={posterData.contact || ''}
          onChange={handleChange}
          placeholder="Enter contact information"
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
