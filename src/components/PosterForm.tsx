
import React, { useState } from 'react';
import BasicInfoSection from './poster-form/BasicInfoSection';
import ContentSection from './poster-form/ContentSection';
import KeyPointsSection from './poster-form/KeyPointsSection';
import QrCodeSection from './poster-form/QrCodeSection';
import ImagesSection from './poster-form/ImagesSection';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit, FileText, Target, QrCode, Image, User } from "lucide-react";

interface PosterFormProps {
  posterData: any;
  setPosterData: React.Dispatch<React.SetStateAction<any>>;
}

const PosterForm: React.FC<PosterFormProps> = ({ 
  posterData, 
  setPosterData
}) => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPosterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleKeyPointChange = (index: number, value: string) => {
    const updatedKeypoints = [...posterData.keypoints];
    updatedKeypoints[index] = value;
    setPosterData(prev => ({ ...prev, keypoints: updatedKeypoints }));
  };
  
  const handleKeyDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...posterData.keyDescriptions];
    updatedDescriptions[index] = value;
    setPosterData(prev => ({ ...prev, keyDescriptions: updatedDescriptions }));
  };

  const handleKeyVisibilityChange = (index: number, visible: boolean) => {
    const updatedVisibility = [...(posterData.keyVisibility || [true, true, true, true])];
    updatedVisibility[index] = visible;
    setPosterData(prev => ({ ...prev, keyVisibility: updatedVisibility }));
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    const updatedSectionTitles = [...posterData.sectionTitles];
    updatedSectionTitles[index] = value;
    setPosterData(prev => ({ ...prev, sectionTitles: updatedSectionTitles }));
  };

  const handleQrUrlChange = (url: string) => {
    setPosterData(prev => ({ ...prev, qrCodeUrl: url }));
  };
  
  const handleQrColorChange = (color: string) => {
    setPosterData(prev => ({ ...prev, qrCodeColor: color }));
  };
  
  const handleImagesChange = (images: { url: string; visible: boolean; caption: string }[]) => {
    setPosterData(prev => ({ ...prev, images }));
  };
  
  const handleToggleChange = (field: string) => (checked: boolean) => {
    setPosterData(prev => ({ ...prev, [field]: checked }));
  };
  
  const handleQrCaptionChange = (caption: string) => {
    setPosterData(prev => ({ ...prev, qrCodeCaption: caption }));
  };

  const sections = [
    { id: 'introduction', label: 'Introduction', field: 'introduction' },
    { id: 'methods', label: 'Methods', field: 'methods' },
    { id: 'findings', label: 'Findings', field: 'findings' },
    { id: 'conclusions', label: 'Conclusions', field: 'conclusions' },
    { id: 'references', label: 'References', field: 'references' },
  ];

  const contactFields = [
    { id: 'title', label: 'Title', field: 'title' },
    { id: 'authors', label: 'Authors', field: 'authors' },
    { id: 'school', label: 'School/Institution', field: 'school' },
    { id: 'contact', label: 'Contact Info', field: 'contact' },
  ];

  const keyTakeawayItems = [
    { id: 'keypoint-0', label: 'Key Takeaway 1', index: 0 },
    { id: 'keypoint-1', label: 'Key Takeaway 2', index: 1 },
    { id: 'keypoint-2', label: 'Key Takeaway 3', index: 2 },
    { id: 'keypoint-3', label: 'Key Takeaway 4', index: 3 },
  ];
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Contact Info */}
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
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => toggleSection(field.id)}
                >
                  <span className="text-sm font-medium text-gray-900">{field.label}</span>
                  <Edit className="h-4 w-4 text-gray-400" />
                </div>
                
                {openSections[field.id] && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <BasicInfoSection 
                      posterData={posterData} 
                      handleChange={handleChange}
                      singleField={field.field}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Sections */}
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
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="text-sm font-medium text-gray-900">{section.label}</span>
                  <Edit className="h-4 w-4 text-gray-400" />
                </div>
                
                {openSections[section.id] && (
                  <div className="p-4 bg-white border-t border-gray-200">
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

        {/* Key Takeaways */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Key Takeaways</h3>
              </div>
              <Switch 
                checked={posterData.showKeypoints !== false} 
                onCheckedChange={handleToggleChange('showKeypoints')}
              />
            </div>
          </div>
          
          {posterData.showKeypoints !== false && (
            <div className="p-6 space-y-3">
              {keyTakeawayItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => toggleSection(item.id)}
                  >
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    <Edit className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  {openSections[item.id] && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <KeyPointsSection 
                        keypoints={posterData.keypoints}
                        keyDescriptions={posterData.keyDescriptions}
                        keyVisibility={posterData.keyVisibility || [true, true, true, true]}
                        handleKeyPointChange={handleKeyPointChange}
                        handleKeyDescriptionChange={handleKeyDescriptionChange}
                        handleKeyVisibilityChange={handleKeyVisibilityChange}
                        singleIndex={item.index}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Image className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Images</h3>
            </div>
          </div>
          
          <div className="p-6">
            <ImagesSection 
              images={posterData.images || []}
              onImagesChange={handleImagesChange}
            />
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
              </div>
              <Switch 
                checked={posterData.showQrCode !== false} 
                onCheckedChange={handleToggleChange('showQrCode')}
              />
            </div>
          </div>
          
          {posterData.showQrCode !== false && (
            <div 
              className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200"
              onClick={() => toggleSection('qrcode')}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Edit QR Code</span>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
          
          {openSections['qrcode'] && posterData.showQrCode !== false && (
            <div className="p-6">
              <QrCodeSection 
                qrCodeUrl={posterData.qrCodeUrl}
                qrCodeColor={posterData.qrCodeColor}
                qrCodeCaption={posterData.qrCodeCaption || ''}
                handleQrUrlChange={handleQrUrlChange}
                handleQrColorChange={handleQrColorChange}
                handleQrCaptionChange={handleQrCaptionChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PosterForm;
