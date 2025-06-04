
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  posterData, 
  handleChange 
}) => {
  return (
    <div className="space-y-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
