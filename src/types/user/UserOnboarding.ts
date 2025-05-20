export type UserRole = 'company' | 'candidate';

export interface CompanyFormData {
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  logo?: File | null;
}

export interface CandidateFormData {
  fullName: string;
  dateOfBirth: string;
  cv?: File | null;
  areaOfInterest: string[];
}

export interface UserOnboardingData {
  role: UserRole | null;
  company?: CompanyFormData;
  candidate?: CandidateFormData;
  completed: boolean;
}
