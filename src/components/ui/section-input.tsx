
import React from 'react';
import { Input } from './input';
import { Label } from './label';

interface SectionInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const SectionInput: React.FC<SectionInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className
}) => {
  return (
    <div className={`space-y-1 ${className || ''}`}>
      <Label htmlFor={id} className="text-xs font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
        required={required}
      />
    </div>
  );
};
