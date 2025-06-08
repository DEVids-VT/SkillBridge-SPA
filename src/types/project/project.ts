export interface ProjectRequest {
  roleTitle: string;
  yearsOfExperience: number;
  seniorityLevel: string;
  requiredSkills: string[];
  relevantTechnologies: string[];
  industryExperience: string[];
  description: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: number;
  companyId: string;
  companyName: string;
  skills: {
    id: string;
    name: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
