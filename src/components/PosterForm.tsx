
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoSection from './poster-form/BasicInfoSection';
import ContentSection from './poster-form/ContentSection';
import KeyPointsSection from './poster-form/KeyPointsSection';
import QrCodeSection from './poster-form/QrCodeSection';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PosterFormProps {
  posterData: any;
  setPosterData: React.Dispatch<React.SetStateAction<any>>;
}

const PosterForm: React.FC<PosterFormProps> = ({ 
  posterData, 
  setPosterData
}) => {
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
  
  const handleToggleChange = (field: string) => (checked: boolean) => {
    setPosterData(prev => ({ ...prev, [field]: checked }));
  };
  
  // Function to reorder sections by swapping field values and titles
  const reorderSections = (dragIndex: number, dropIndex: number) => {
    // Create a mapping of field names to their order
    const sectionFields = ["introduction", "methods", "findings", "conclusions", "references"];
    
    // Create copies of the data
    const newData = { ...posterData };
    const newSectionTitles = [...posterData.sectionTitles];
    
    // Store the dragged item's values
    const draggedTitle = newSectionTitles[dragIndex];
    const draggedContent = posterData[sectionFields[dragIndex]];
    
    // Swap the section titles
    newSectionTitles[dragIndex] = newSectionTitles[dropIndex];
    newSectionTitles[dropIndex] = draggedTitle;
    
    // Swap the section contents
    newData[sectionFields[dragIndex]] = posterData[sectionFields[dropIndex]];
    newData[sectionFields[dropIndex]] = draggedContent;
    
    // Update the section titles in the new data
    newData.sectionTitles = newSectionTitles;
    
    // Update state
    setPosterData(newData);
  };
  
  return (
    <div className="space-y-6">
      <BasicInfoSection 
        posterData={posterData} 
        handleChange={handleChange} 
      />
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content">Main Content</TabsTrigger>
          <TabsTrigger value="keypoints">Key Takeaways</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <ContentSection 
            posterData={posterData}
            handleChange={handleChange}
            handleSectionTitleChange={handleSectionTitleChange}
            reorderSections={reorderSections}
          />
        </TabsContent>
        
        <TabsContent value="keypoints">
          <div className="mb-4 flex items-center justify-between">
            <Label htmlFor="show-keypoints" className="font-medium">Show Key Takeaways</Label>
            <Switch 
              id="show-keypoints" 
              checked={posterData.showKeypoints !== false} 
              onCheckedChange={handleToggleChange('showKeypoints')}
            />
          </div>
          
          {posterData.showKeypoints !== false && (
            <KeyPointsSection 
              keypoints={posterData.keypoints}
              keyDescriptions={posterData.keyDescriptions}
              handleKeyPointChange={handleKeyPointChange}
              handleKeyDescriptionChange={handleKeyDescriptionChange}
            />
          )}
        </TabsContent>

        <TabsContent value="qrcode">
          <div className="mb-4 flex items-center justify-between">
            <Label htmlFor="show-qrcode" className="font-medium">Show QR Code</Label>
            <Switch 
              id="show-qrcode" 
              checked={posterData.showQrCode !== false} 
              onCheckedChange={handleToggleChange('showQrCode')}
            />
          </div>
          
          {posterData.showQrCode !== false && (
            <QrCodeSection 
              qrCodeUrl={posterData.qrCodeUrl}
              qrCodeColor={posterData.qrCodeColor}
              handleQrUrlChange={handleQrUrlChange}
              handleQrColorChange={handleQrColorChange}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PosterForm;
