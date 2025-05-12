
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
              <Label htmlFor="contact">Contact Info</Label>
              <Input
                id="contact"
                name="contact"
                value={posterData.contact}
                onChange={handleChange}
                className="mb-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="content">Main Content</TabsTrigger>
          <TabsTrigger value="keypoints">Key Takeaways</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="introduction">1. Introduction</Label>
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
            <Label htmlFor="methods">2. Methods</Label>
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
            <Label htmlFor="findings">3. Findings</Label>
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
            <Label htmlFor="conclusions">4. Conclusions and Implications</Label>
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
            <Label htmlFor="references">5. References</Label>
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
      </Tabs>
    </div>
  );
};

export default PosterForm;
