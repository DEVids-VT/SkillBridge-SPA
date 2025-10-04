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

// Manual project assignment creation types
export interface CreateAssignmentTaskRequest {
  title: string;
  description?: string;
  isCompleted?: boolean; // defaults false on backend
  sequence: number;
}

export type ProjectAssignmentLevel = 0 | 1 | 2; // Beginner, Intermediate, Advanced
export type ProjectAssignmentStatus = 0 | 1 | 2 | 3; // Draft, Published, Completed, Cancelled

export interface CreateProjectAssignmentRequest {
  title: string;
  description?: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: ProjectAssignmentLevel;
  deadline: string; // ISO string
  status: ProjectAssignmentStatus;
  skills: string[]; // Array of skill name strings or IDs
  tasks: CreateAssignmentTaskRequest[];
}

// Skill response interface
export interface SkillResponse {
  id: string;
  name: string;
  description: string;
}

// Task response interface (from backend)
export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
  projectAssignmentId: string;
  createdAt: string;
  updatedAt: string;
}

// Complete project assignment response from backend
export interface ProjectAssignmentResponse {
  id: string;
  title: string;
  description: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: ProjectAssignmentLevel;
  deadline: string;
  status: ProjectAssignmentStatus;
  companyId: string;
  companyName: string;
  skills: SkillResponse[];
  tasks: TaskResponse[];
  createdAt: string;
  updatedAt: string;
}
