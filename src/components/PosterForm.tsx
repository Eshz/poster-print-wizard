
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoSection from './poster-form/BasicInfoSection';
import ContentSection from './poster-form/ContentSection';
import KeyPointsSection from './poster-form/KeyPointsSection';
import QrCodeSection from './poster-form/QrCodeSection';
import ImagesSection from './poster-form/ImagesSection';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

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
    { id: 'introduction', label: 'Introduction', icon: Edit },
    { id: 'methods', label: 'Methods', icon: Edit },
    { id: 'results', label: 'Results', icon: Edit },
    { id: 'conclusion', label: 'Conclusion', icon: Edit },
    { id: 'references', label: 'References', icon: Edit },
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Content</h2>
        <p className="text-sm text-gray-600">Build your academic poster content</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          <BasicInfoSection 
            posterData={posterData} 
            handleChange={handleChange} 
          />
          
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Sections</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + Add a section
              </button>
            </div>
            
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900 capitalize">{section.label}</span>
                  <Edit className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Images</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Drag and drop images here</p>
                <p className="text-xs text-gray-500">Or click to browse</p>
                <button className="mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="content" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
                Main Content
              </TabsTrigger>
              <TabsTrigger value="keypoints" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
                Key Takeaways
              </TabsTrigger>
              <TabsTrigger value="images" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
                Images
              </TabsTrigger>
              <TabsTrigger value="qrcode" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">
                QR Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <ContentSection 
                posterData={posterData}
                handleChange={handleChange}
                handleSectionTitleChange={handleSectionTitleChange}
              />
            </TabsContent>
            
            <TabsContent value="keypoints">
              <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="show-keypoints" className="font-medium text-gray-900">
                    Show Key Takeaways
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">Display key points on your poster</p>
                </div>
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
                  keyVisibility={posterData.keyVisibility || [true, true, true, true]}
                  handleKeyPointChange={handleKeyPointChange}
                  handleKeyDescriptionChange={handleKeyDescriptionChange}
                  handleKeyVisibilityChange={handleKeyVisibilityChange}
                />
              )}
            </TabsContent>
            
            <TabsContent value="images">
              <ImagesSection 
                images={posterData.images || []}
                onImagesChange={handleImagesChange}
              />
            </TabsContent>

            <TabsContent value="qrcode">
              <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="show-qrcode" className="font-medium text-gray-900">
                    Show QR Code
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">Add a QR code to your poster</p>
                </div>
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
                  qrCodeCaption={posterData.qrCodeCaption || ''}
                  handleQrUrlChange={handleQrUrlChange}
                  handleQrColorChange={handleQrColorChange}
                  handleQrCaptionChange={handleQrCaptionChange}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PosterForm;
