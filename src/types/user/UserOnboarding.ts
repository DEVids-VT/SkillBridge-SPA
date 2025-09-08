export type UserRole = 'company' | 'candidate';

export interface CompanyFormData {
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  logo?: File | null;
  about?: string;
  activities?: string;
  sector?: string;
  headquarters?: string;
  technologies?: string[];
  yearEstablished?: number;
  hasOfficesInBulgaria?: boolean;
  bulgarianOffices?: string[];
  employeesInBulgaria?: number;
  globalEmployees?: number;
  whyWorkWithUs?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactPerson?: string;
}

export interface CandidateFormData {
  username: string;
  cv?: File | null;
  profilePicture?: File | null;
  externalLink?: string;
}

export interface UserOnboardingData {
  role: UserRole | null;
  company?: CompanyFormData;
  candidate?: CandidateFormData;
  completed: boolean;
}
