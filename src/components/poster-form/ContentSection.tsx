
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContentSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  posterData, 
  handleChange,
  handleSectionTitleChange
}) => {
  return (
    <div className="space-y-4">
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
          <Label htmlFor="sectionTitle-2">Section 3 Title</Label>
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
          <Label htmlFor="sectionTitle-3">Section 4 Title</Label>
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
          <Label htmlFor="sectionTitle-4">Section 5 Title</Label>
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
    </div>
  );
};

export default ContentSection;
