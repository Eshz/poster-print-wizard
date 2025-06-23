
import React from 'react';
import { VisibilityToggle } from '@/components/ui/visibility-toggle';

interface FormToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const FormToggle: React.FC<FormToggleProps> = ({
  id,
  label,
  checked,
  onChange,
  className
}) => {
  return (
    <VisibilityToggle
      id={id}
      label={label}
      checked={checked}
      onCheckedChange={onChange}
      className={className}
    />
  );
};
