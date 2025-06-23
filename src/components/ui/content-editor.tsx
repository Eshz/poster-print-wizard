
import React from 'react';
import { Textarea } from './textarea';
import { Label } from './label';

interface ContentEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  required = false,
  className
}) => {
  return (
    <div className={`space-y-1 ${className || ''}`}>
      <Label htmlFor={id} className="text-xs font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
        required={required}
      />
    </div>
  );
};
