
import React from 'react';
import { Switch } from './switch';
import { Label } from './label';

interface VisibilityToggleProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  id,
  checked,
  onCheckedChange,
  label = "Show",
  className
}) => {
  const handleToggle = (newChecked: boolean) => {
    console.log(`Toggle ${id} changed to:`, newChecked);
    onCheckedChange(newChecked);
  };

  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <Switch 
        id={id}
        checked={checked} 
        onCheckedChange={handleToggle}
        aria-describedby={`${id}-label`}
      />
      <Label 
        htmlFor={id} 
        id={`${id}-label`}
        className="text-sm text-gray-600 cursor-pointer"
        onClick={() => handleToggle(!checked)}
      >
        {label}
      </Label>
    </div>
  );
};
