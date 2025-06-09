
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

  // Set default open state for general-info section
  useEffect(() => {
    if (!openSections.hasOwnProperty('general-info')) {
      toggleSection('general-info');
    }
  }, []);

  useEffect(() => {
    // Initialize temp values when section opens
    if (openSections['general-info'] && Object.keys(tempValues).length === 0) {
      setTempValues({
        title: posterData.title || '',
        authors: posterData.authors || '',
        school: posterData.school || '',
        contact: posterData.contact || ''
      });
    }
  }, [openSections, posterData]);

  const handleAccept = () => {
    // Save all temp values to poster data
    Object.keys(tempValues).forEach(field => {
      handleChange({ target: { name: field, value: tempValues[field] } } as React.ChangeEvent<HTMLInputElement>);
    });
    toggleSection('general-info');
    setTempValues({});
  };

  const handleCancel = () => {
    toggleSection('general-info');
    setTempValues({});
  };

  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">General info</h3>
        </div>
      </div>
      
      {!openSections['general-info'] && (
        <div 
          className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200"
          onClick={() => toggleSection('general-info')}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Edit General info</span>
            <Edit className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}
      
      {openSections['general-info'] && (
        <div className="p-6">
          <div className="flex items-center justify-end mb-4 gap-2">
            <button 
              onClick={handleAccept}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Check className="h-4 w-4 text-gray-600" />
            </button>
            <button 
              onClick={handleCancel}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <BasicInfoSection 
            posterData={tempValues}
            handleChange={handleTempChange}
          />
        </div>
      )}
    </div>
  );
};

export default ContactInfoSection;
