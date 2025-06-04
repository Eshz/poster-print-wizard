
import React, { useState, useEffect } from 'react';
import BasicInfoSection from './BasicInfoSection';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit, User, Check, X } from "lucide-react";

interface ContactInfoSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  posterData,
  handleChange,
  openSections,
  toggleSection
}) => {
  const [tempValues, setTempValues] = useState<{[key: string]: string}>({});

  const contactFields = [
    { id: 'title', label: 'Title', field: 'title' },
    { id: 'authors', label: 'Authors', field: 'authors' },
    { id: 'school', label: 'School/Institution', field: 'school' },
    { id: 'contact', label: 'Contact Info', field: 'contact' },
  ];

  useEffect(() => {
    // Initialize temp values when sections open
    contactFields.forEach(field => {
      if (openSections[field.id] && !tempValues[field.field]) {
        setTempValues(prev => ({
          ...prev,
          [field.field]: posterData[field.field] || ''
        }));
      }
    });
  }, [openSections, posterData]);

  const handleAccept = (field: any) => {
    const tempValue = tempValues[field.field] || '';
    handleChange({ target: { name: field.field, value: tempValue } } as React.ChangeEvent<HTMLInputElement>);
    toggleSection(field.id);
    setTempValues(prev => {
      const newValues = { ...prev };
      delete newValues[field.field];
      return newValues;
    });
  };

  const handleCancel = (field: any) => {
    toggleSection(field.id);
    setTempValues(prev => {
      const newValues = { ...prev };
      delete newValues[field.field];
      return newValues;
    });
  };

  const handleTempChange = (field: string, value: string) => {
    setTempValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Info</h3>
        </div>
      </div>
      
      <div className="p-6 space-y-3">
        {contactFields.map((field) => (
          <div key={field.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {!openSections[field.id] && (
              <div 
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => toggleSection(field.id)}
              >
                <span className="text-sm font-medium text-gray-900">{field.label}</span>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
            )}
            
            {openSections[field.id] && (
              <div className="p-4 bg-white">
                <div className="flex items-center justify-end mb-4 gap-2">
                  <button 
                    onClick={() => handleAccept(field)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Check className="h-4 w-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleCancel(field)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <BasicInfoSection 
                  posterData={{
                    ...posterData,
                    [field.field]: tempValues[field.field] !== undefined ? tempValues[field.field] : posterData[field.field]
                  }}
                  handleChange={(e) => handleTempChange(field.field, e.target.value)}
                  singleField={field.field}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoSection;
