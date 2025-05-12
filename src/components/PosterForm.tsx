
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoSection from './poster-form/BasicInfoSection';
import ContentSection from './poster-form/ContentSection';
import KeyPointsSection from './poster-form/KeyPointsSection';
import QrCodeSection from './poster-form/QrCodeSection';

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
          />
        </TabsContent>
        
        <TabsContent value="keypoints">
          <KeyPointsSection 
            keypoints={posterData.keypoints}
            keyDescriptions={posterData.keyDescriptions}
            handleKeyPointChange={handleKeyPointChange}
            handleKeyDescriptionChange={handleKeyDescriptionChange}
          />
        </TabsContent>

        <TabsContent value="qrcode">
          <QrCodeSection 
            qrCodeUrl={posterData.qrCodeUrl}
            qrCodeColor={posterData.qrCodeColor}
            handleQrUrlChange={handleQrUrlChange}
            handleQrColorChange={handleQrColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PosterForm;
