// Create project form type definition
export interface CreateProjectForm {
  roleTitle: string;
  requiredSkills: string;
  yearsExperience: string;
  seniorityLevel: string;
  relevantTechnologies: string;
  industryExperience: string; // Optional
  description: string;
}

// Form field error type
export interface CreateProjectFormErrors {
  roleTitle?: string;
  requiredSkills?: string;
  yearsExperience?: string;
  seniorityLevel?: string;
  relevantTechnologies?: string;
  description?: string;
}

// Notification state type
export interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

// Visual feedback props type
export interface VisualFeedbackData {
  roleTitle: string;
  requiredSkills: string;
  seniorityLevel: string;
}

// Seniority level options
export type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'lead' | 'principal';

// Form component props
export interface CreateProjectFormProps {
  formData: CreateProjectForm;
  formErrors: CreateProjectFormErrors;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTagInputChange: (name: string, value: string) => void;
  onSelectChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Progress component props
export interface CreateProjectProgressProps {
  progress: number;
  formData: VisualFeedbackData;
  getProgressMessage: () => string;
}

// Header component props
export interface CreateProjectHeaderProps {
  title1: string;
  title2: string;
  subtitle: string;
}

// Manual form type definition
export interface CreateManualForm {
  description: string;
}

// Manual form errors
export interface CreateManualFormErrors {
  description?: string;
} 