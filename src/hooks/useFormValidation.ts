
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationErrors {
  [field: string]: string | null;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((value: string, rules: ValidationRule): string | null => {
    if (rules.required && (!value || value.trim() === '')) {
      return 'This field is required';
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (value && rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, []);

  const setFieldError = useCallback((field: string, error: string | null) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.values(errors).some(error => error !== null);

  return {
    errors,
    validateField,
    setFieldError,
    clearErrors,
    hasErrors
  };
};
