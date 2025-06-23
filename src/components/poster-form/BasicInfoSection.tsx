
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  // Helper function to determine if field should use textarea
  const shouldUseTextarea = (value: string) => {
    return value && (value.length > 50 || value.includes('\n'));
  };

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

    const value = posterData[singleField] || '';
    const useTextarea = shouldUseTextarea(value);

    return (
      <div className="space-y-1">
        <Label htmlFor={singleField} className="text-xs font-medium text-gray-700">
          {config.label}
        </Label>
        {useTextarea ? (
          <Textarea
            id={singleField}
            name={singleField}
            value={value}
            onChange={handleChange}
            placeholder={config.placeholder}
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm min-h-[60px] resize-none px-0"
            rows={Math.max(2, Math.ceil(value.length / 50))}
          />
        ) : (
          <Input
            id={singleField}
            name={singleField}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={config.placeholder}
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
          />
        )}
      </div>
    );
  }

  // Compact layout with adaptive text areas and underline styling
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title" className="text-xs font-medium text-gray-700">
          Title
        </Label>
        {shouldUseTextarea(posterData.title || '') ? (
          <Textarea
            id="title"
            name="title"
            value={posterData.title || ''}
            onChange={handleChange}
            placeholder="Enter your poster title"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm min-h-[60px] resize-none px-0"
            rows={Math.max(2, Math.ceil((posterData.title || '').length / 50))}
          />
        ) : (
          <Input
            id="title"
            name="title"
            type="text"
            value={posterData.title || ''}
            onChange={handleChange}
            placeholder="Enter your poster title"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
          />
        )}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="authors" className="text-xs font-medium text-gray-700">
          Authors
        </Label>
        {shouldUseTextarea(posterData.authors || '') ? (
          <Textarea
            id="authors"
            name="authors"
            value={posterData.authors || ''}
            onChange={handleChange}
            placeholder="Enter author names"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm min-h-[60px] resize-none px-0"
            rows={Math.max(2, Math.ceil((posterData.authors || '').length / 50))}
          />
        ) : (
          <Input
            id="authors"
            name="authors"
            type="text"
            value={posterData.authors || ''}
            onChange={handleChange}
            placeholder="Enter author names"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
          />
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="school" className="text-xs font-medium text-gray-700">
          School/Institution
        </Label>
        {shouldUseTextarea(posterData.school || '') ? (
          <Textarea
            id="school"
            name="school"
            value={posterData.school || ''}
            onChange={handleChange}
            placeholder="Enter institution name"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm min-h-[60px] resize-none px-0"
            rows={Math.max(2, Math.ceil((posterData.school || '').length / 50))}
          />
        ) : (
          <Input
            id="school"
            name="school"
            type="text"
            value={posterData.school || ''}
            onChange={handleChange}
            placeholder="Enter institution name"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
          />
        )}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="contact" className="text-xs font-medium text-gray-700">
          Contact Info
        </Label>
        {shouldUseTextarea(posterData.contact || '') ? (
          <Textarea
            id="contact"
            name="contact"
            value={posterData.contact || ''}
            onChange={handleChange}
            placeholder="Enter contact information"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm min-h-[60px] resize-none px-0"
            rows={Math.max(2, Math.ceil((posterData.contact || '').length / 50))}
          />
        ) : (
          <Input
            id="contact"
            name="contact"
            type="text"
            value={posterData.contact || ''}
            onChange={handleChange}
            placeholder="Enter contact information"
            className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
          />
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;
