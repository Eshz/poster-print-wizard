
import React, { useState, useEffect } from 'react';
import KeyPointsSection from './KeyPointsSection';
import { Switch } from "@/components/ui/switch";
import { Edit, Target, Check, X } from "lucide-react";

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
  const [tempValues, setTempValues] = useState<{[key: string]: {point: string, description: string, visible: boolean}}>({});

  const keyTakeawayItems = [
    { id: 'keypoint-0', label: 'Key Takeaway 1', index: 0 },
    { id: 'keypoint-1', label: 'Key Takeaway 2', index: 1 },
    { id: 'keypoint-2', label: 'Key Takeaway 3', index: 2 },
    { id: 'keypoint-3', label: 'Key Takeaway 4', index: 3 },
  ];

  useEffect(() => {
    // Initialize temp values when sections open
    keyTakeawayItems.forEach(item => {
      if (openSections[item.id] && !tempValues[item.id]) {
        setTempValues(prev => ({
          ...prev,
          [item.id]: {
            point: posterData.keypoints?.[item.index] || '',
            description: posterData.keyDescriptions?.[item.index] || '',
            visible: posterData.keyVisibility?.[item.index] !== false
          }
        }));
      }
    });
  }, [openSections, posterData]);

  const handleAccept = (item: any) => {
    const tempValue = tempValues[item.id];
    if (tempValue) {
      handleKeyPointChange(item.index, tempValue.point);
      handleKeyDescriptionChange(item.index, tempValue.description);
      handleKeyVisibilityChange(item.index, tempValue.visible);
    }
    toggleSection(item.id);
    setTempValues(prev => {
      const newValues = { ...prev };
      delete newValues[item.id];
      return newValues;
    });
  };

  const handleCancel = (itemId: string) => {
    toggleSection(itemId);
    setTempValues(prev => {
      const newValues = { ...prev };
      delete newValues[itemId];
      return newValues;
    });
  };

  const handleTempPointChange = (itemId: string, value: string) => {
    setTempValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        point: value
      }
    }));
  };

  const handleTempDescriptionChange = (itemId: string, value: string) => {
    setTempValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        description: value
      }
    }));
  };

  const handleTempVisibilityChange = (itemId: string, visible: boolean) => {
    setTempValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        visible: visible
      }
    }));
  };

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
                  <div className="flex items-center justify-end mb-4 gap-2">
                    <button 
                      onClick={() => handleAccept(item)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Check className="h-4 w-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleCancel(item.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <KeyPointsSection 
                    keypoints={tempValues[item.id]?.point !== undefined ? 
                      [...(posterData.keypoints || []), tempValues[item.id].point].slice(0, posterData.keypoints?.length || 4) :
                      posterData.keypoints || []
                    }
                    keyDescriptions={tempValues[item.id]?.description !== undefined ?
                      [...(posterData.keyDescriptions || []), tempValues[item.id].description].slice(0, posterData.keyDescriptions?.length || 4) :
                      posterData.keyDescriptions || []
                    }
                    keyVisibility={tempValues[item.id]?.visible !== undefined ?
                      [...(posterData.keyVisibility || [true, true, true, true]), tempValues[item.id].visible].slice(0, (posterData.keyVisibility || []).length || 4) :
                      posterData.keyVisibility || [true, true, true, true]
                    }
                    handleKeyPointChange={(idx, value) => handleTempPointChange(item.id, value)}
                    handleKeyDescriptionChange={(idx, value) => handleTempDescriptionChange(item.id, value)}
                    handleKeyVisibilityChange={(idx, visible) => handleTempVisibilityChange(item.id, visible)}
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
