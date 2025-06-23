
import React from 'react';
import { FormField } from '@/components/ui/form-field';

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'input' | 'textarea' | 'underline-input';
  rows?: number;
  className?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'input',
  rows = 3,
  className,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormField
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      rows={rows}
      className={className}
      required={required}
      error={error}
    />
  );
};
