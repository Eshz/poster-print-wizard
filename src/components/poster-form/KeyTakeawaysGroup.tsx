
import React from 'react';
import KeyPointsSection from './KeyPointsSection';
import { Switch } from "@/components/ui/switch";
import { Edit, Target } from "lucide-react";

interface KeyTakeawaysGroupProps {
  posterData: any;
  handleKeyPointChange: (index: number, value: string) => void;
  handleKeyDescriptionChange: (index: number, value: string) => void;
  handleKeyVisibilityChange: (index: number, visible: boolean) => void;
  handleToggleChange: (field: string) => (checked: boolean) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const KeyTakeawaysGroup: React.FC<KeyTakeawaysGroupProps> = ({
  posterData,
  handleKeyPointChange,
  handleKeyDescriptionChange,
  handleKeyVisibilityChange,
  handleToggleChange,
  openSections,
  toggleSection
}) => {
  const keyTakeawayItems = [
    { id: 'keypoint-0', label: 'Key Takeaway 1', index: 0 },
    { id: 'keypoint-1', label: 'Key Takeaway 2', index: 1 },
    { id: 'keypoint-2', label: 'Key Takeaway 3', index: 2 },
    { id: 'keypoint-3', label: 'Key Takeaway 4', index: 3 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Key Takeaways</h3>
          </div>
          <Switch 
            checked={posterData.showKeypoints !== false} 
            onCheckedChange={handleToggleChange('showKeypoints')}
          />
        </div>
      </div>
      
      {posterData.showKeypoints !== false && (
        <div className="p-6 space-y-3">
          {keyTakeawayItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {!openSections[item.id] && (
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => toggleSection(item.id)}
                >
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <Edit className="h-4 w-4 text-gray-400" />
                </div>
              )}
              
              {openSections[item.id] && (
                <div className="p-4 bg-white">
                  <KeyPointsSection 
                    keypoints={posterData.keypoints}
                    keyDescriptions={posterData.keyDescriptions}
                    keyVisibility={posterData.keyVisibility || [true, true, true, true]}
                    handleKeyPointChange={handleKeyPointChange}
                    handleKeyDescriptionChange={handleKeyDescriptionChange}
                    handleKeyVisibilityChange={handleKeyVisibilityChange}
                    singleIndex={item.index}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyTakeawaysGroup;
