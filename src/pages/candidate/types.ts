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
