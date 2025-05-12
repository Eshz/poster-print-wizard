
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface BasicInfoSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  posterData, 
  handleChange 
}) => {
  return (
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
  );
};

export default BasicInfoSection;
