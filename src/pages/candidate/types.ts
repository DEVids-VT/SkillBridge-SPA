// Candidate form type definition
export interface CandidateForm {
  roleTitle: string;
  requiredSkills: string;
  yearsExperience: string;
  seniorityLevel: string;
  relevantTechnologies: string;
  industryExperience: string; // Optional
  description: string;
}

// Form field error type
export interface FormErrors {
  roleTitle?: string;
  requiredSkills?: string;
  yearsExperience?: string;
  seniorityLevel?: string;
  relevantTechnologies?: string;
  description?: string;
}

// Candidate profile related types
export interface CandidateProfile {
  id: string;
  name: string;
  // Add more candidate profile fields as needed
}

export interface PreferredCandidate {
  roleTitle: string;
}

export interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  education: string;
  roleTitle?: string;
}

// Add more candidate-related types here
