
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface KeyPointsSectionProps {
  keypoints: string[];
  keyDescriptions: string[];
  keyVisibility: boolean[];
  handleKeyPointChange: (index: number, value: string) => void;
  handleKeyDescriptionChange: (index: number, value: string) => void;
  handleKeyVisibilityChange: (index: number, visible: boolean) => void;
  singleIndex?: number;
}

const KeyPointsSection: React.FC<KeyPointsSectionProps> = ({
  keypoints,
  keyDescriptions,
  keyVisibility,
  handleKeyPointChange,
  handleKeyDescriptionChange,
  handleKeyVisibilityChange,
  singleIndex
}) => {
  // If singleIndex is provided, only show that specific key takeaway
  if (singleIndex !== undefined) {
    const index = singleIndex;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor={`keypoint-${index}`} className="font-medium">Key Takeaway Title</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`key-visible-${index}`}
              checked={keyVisibility[index] !== false}
              onCheckedChange={(checked) => handleKeyVisibilityChange(index, checked as boolean)}
            />
            <Label htmlFor={`key-visible-${index}`} className="text-sm text-gray-600">Show</Label>
          </div>
        </div>
        <Input
          id={`keypoint-${index}`}
          value={keypoints[index] || ''}
          onChange={(e) => handleKeyPointChange(index, e.target.value)}
          placeholder="Enter key takeaway title"
        />
        <div className="space-y-2">
          <Label htmlFor={`keydesc-${index}`}>Description</Label>
          <Textarea
            id={`keydesc-${index}`}
            value={keyDescriptions[index] || ''}
            onChange={(e) => handleKeyDescriptionChange(index, e.target.value)}
            rows={2}
            placeholder="Enter key takeaway description"
          />
        </div>
      </div>
    );
  }

  // Original full form layout
  return (
    <>
      {keypoints.map((point, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor={`keypoint-${index}`} className="font-medium">Key Takeaway {index + 1}</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`key-visible-${index}`}
                checked={keyVisibility[index] !== false}
                onCheckedChange={(checked) => handleKeyVisibilityChange(index, checked as boolean)}
              />
              <Label htmlFor={`key-visible-${index}`} className="text-sm text-gray-600">Show</Label>
            </div>
          </div>
          <Input
            id={`keypoint-${index}`}
            value={point}
            onChange={(e) => handleKeyPointChange(index, e.target.value)}
            className="mb-2"
            placeholder="Enter key takeaway title"
          />
          <Label htmlFor={`keydesc-${index}`}>Description</Label>
          <Textarea
            id={`keydesc-${index}`}
            value={keyDescriptions[index]}
            onChange={(e) => handleKeyDescriptionChange(index, e.target.value)}
            rows={2}
            className="mb-2"
            placeholder="Enter key takeaway description"
          />
        </div>
      ))}
    </>
  );
};

export default KeyPointsSection;
