
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { FormField } from '@/components/ui/form-field';
import { Switch } from '@/components/ui/switch';
import { Target } from 'lucide-react';
import { PosterData } from '@/types/project';

interface KeyTakeawaysSectionProps {
  posterData: PosterData;
  onUpdateKeyPoint: (index: number, value: string) => void;
  onUpdateKeyDescription: (index: number, value: string) => void;
  onUpdateKeyVisibility: (index: number, visible: boolean) => void;
  onToggleShowKeypoints: (checked: boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const KeyTakeawaysSection: React.FC<KeyTakeawaysSectionProps> = ({
  posterData,
  onUpdateKeyPoint,
  onUpdateKeyDescription,
  onUpdateKeyVisibility,
  onToggleShowKeypoints,
  isOpen,
  onToggle
}) => {
  const keypoints = posterData.keypoints || ['', '', '', ''];
  const keyDescriptions = posterData.keyDescriptions || ['', '', '', ''];
  const keyVisibility = posterData.keyVisibility || [true, true, true, true];

  const handleKeyPointChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`KeyTakeawaysSection - Key point ${index} changing to:`, e.target.value);
    onUpdateKeyPoint(index, e.target.value);
  };

  const handleKeyDescriptionChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`KeyTakeawaysSection - Key description ${index} changing to:`, e.target.value);
    onUpdateKeyDescription(index, e.target.value);
  };

  return (
    <CollapsibleSection
      id="key-takeaways"
      title="Key Takeaways"
      icon={<Target className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
      rightContent={
        <Switch 
          checked={posterData.showKeypoints !== false} 
          onCheckedChange={onToggleShowKeypoints}
          onClick={(e) => e.stopPropagation()}
        />
      }
    >
      {posterData.showKeypoints !== false && (
        <div className="space-y-4">
          {keypoints.map((point, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Key Point {index + 1}</h4>
                <Switch
                  checked={keyVisibility[index] !== false}
                  onCheckedChange={(checked) => onUpdateKeyVisibility(index, checked)}
                />
              </div>
              
              <FormField
                id={`keypoint-${index}`}
                label="Title"
                value={point}
                onChange={handleKeyPointChange(index)}
                placeholder={`Enter key point ${index + 1}`}
              />
              
              <FormField
                id={`key-description-${index}`}
                label="Description"
                value={keyDescriptions[index] || ''}
                onChange={handleKeyDescriptionChange(index)}
                type="textarea"
                rows={2}
                placeholder={`Enter description for key point ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </CollapsibleSection>
  );
};
