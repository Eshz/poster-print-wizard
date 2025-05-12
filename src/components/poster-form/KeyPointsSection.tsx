
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface KeyPointsSectionProps {
  keypoints: string[];
  keyDescriptions: string[];
  handleKeyPointChange: (index: number, value: string) => void;
  handleKeyDescriptionChange: (index: number, value: string) => void;
}

const KeyPointsSection: React.FC<KeyPointsSectionProps> = ({
  keypoints,
  keyDescriptions,
  handleKeyPointChange,
  handleKeyDescriptionChange
}) => {
  return (
    <>
      {keypoints.map((point, index) => (
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
            value={keyDescriptions[index]}
            onChange={(e) => handleKeyDescriptionChange(index, e.target.value)}
            rows={2}
            className="mb-2"
          />
        </div>
      ))}
    </>
  );
};

export default KeyPointsSection;
