
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrCode from "@/components/QrCode";

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
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-4">
          <Label htmlFor="title">Poster Title</Label>
          <Input
            id="title"
            name="title"
            value={posterData.title}
            onChange={handleChange}
            className="mb-2"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="authors">Authors</Label>
              <Input
                id="authors"
                name="authors"
                value={posterData.authors}
                onChange={handleChange}
                className="mb-2"
              />
            </div>
            <div>
              <Label htmlFor="school">School/Institution</Label>
              <Input
                id="school"
                name="school"
                value={posterData.school}
                onChange={handleChange}
                className="mb-2"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="contact">Contact Info</Label>
            <Input
              id="contact"
              name="contact"
              value={posterData.contact}
              onChange={handleChange}
              className="mb-2"
            />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content">Main Content</TabsTrigger>
          <TabsTrigger value="keypoints">Key Takeaways</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="sectionTitle-0">Section 1 Title</Label>
              <Input 
                id="sectionTitle-0"
                value={posterData.sectionTitles[0]}
                onChange={(e) => handleSectionTitleChange(0, e.target.value)}
                className="max-w-[250px]"
              />
            </div>
            <Textarea
              id="introduction"
              name="introduction"
              value={posterData.introduction}
              onChange={handleChange}
              rows={3}
              className="mb-2"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="sectionTitle-1">Section 2 Title</Label>
              <Input 
                id="sectionTitle-1"
                value={posterData.sectionTitles[1]}
                onChange={(e) => handleSectionTitleChange(1, e.target.value)}
                className="max-w-[250px]"
              />
            </div>
            <Textarea
              id="methods"
              name="methods"
              value={posterData.methods}
              onChange={handleChange}
              rows={3}
              className="mb-2"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="sectionTitle-2">Section 2 Title</Label>
              <Input 
                id="sectionTitle-2"
                value={posterData.sectionTitles[2]}
                onChange={(e) => handleSectionTitleChange(2, e.target.value)}
                className="max-w-[250px]"
              />
            </div>
            <Textarea
              id="findings"
              name="findings"
              value={posterData.findings}
              onChange={handleChange}
              rows={3}
              className="mb-2"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="sectionTitle-3">Section 3 Title</Label>
              <Input 
                id="sectionTitle-3"
                value={posterData.sectionTitles[3]}
                onChange={(e) => handleSectionTitleChange(3, e.target.value)}
                className="max-w-[250px]"
              />
            </div>
            <Textarea
              id="conclusions"
              name="conclusions"
              value={posterData.conclusions}
              onChange={handleChange}
              rows={3}
              className="mb-2"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor="sectionTitle-4">Section 4 Title</Label>
              <Input 
                id="sectionTitle-4"
                value={posterData.sectionTitles[4]}
                onChange={(e) => handleSectionTitleChange(4, e.target.value)}
                className="max-w-[250px]"
              />
            </div>
            <Textarea
              id="references"
              name="references"
              value={posterData.references}
              onChange={handleChange}
              rows={3}
              className="mb-2"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="keypoints">
          {posterData.keypoints.map((point: string, index: number) => (
            <div key={index} className="mb-4">
              <Label htmlFor={`keypoint-${index}`}>Key Takeaway {index + 1}</Label>
              <Input
                id={`keypoint-${index}`}
                value={point}
                onChange={(e) => handleKeyPointChange(index, e.target.value)}
                className="mb-2"
              />
              <Label htmlFor={`keydesc-${index}`}>Description</Label>
              <Textarea
                id={`keydesc-${index}`}
                value={posterData.keyDescriptions[index]}
                onChange={(e) => handleKeyDescriptionChange(index, e.target.value)}
                rows={2}
                className="mb-2"
              />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="qrcode">
          <Card>
            <CardContent className="pt-4">
              <QrCode 
                url={posterData.qrCodeUrl} 
                setUrl={handleQrUrlChange}
                color={posterData.qrCodeColor || '#000000'}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PosterForm;
