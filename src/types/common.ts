
export interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string | null>;
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export type EventHandler<T = Event> = (event: T) => void;
export type ChangeHandler<T = string> = (value: T) => void;

export interface CollapsibleSectionState {
  [sectionId: string]: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
