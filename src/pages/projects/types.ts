// Types for projects
export interface Project {
  id: string;
  company: string;
  logo: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  postedDate: string;
  learningBenefits: string;
  duration: string;
}

export interface CategoryFilter {
  id: string;
  name: string;
  color?: string;
}

// Backend search filter types
export enum ProjectAssignmentLevel {
  Beginner = 0,
  Intermediate = 1,
  Advanced = 2,
}

export interface SearchProjectFilters {
  title?: string;
  level?: ProjectAssignmentLevel;
  durationAfter?: string; // Timespan string
  companyName?: string;
  companySector?: string;
  projectSkills?: string[]; // Array of skill names
}

// Pagination metadata from X-Pagination header (backend returns Pascal case)
export interface PaginationMetadata {
  CurrentPage: number;
  PageSize: number;
  TotalPages: number;
  TotalCount: number;
}

// Search request with pagination
export interface SearchProjectsRequest extends SearchProjectFilters {
  pageNumber?: number;
  pageSize?: number;
}

// Backend project response interface
export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: number;
  duration: string;
  status: number;
  companyId: string;
  companyName: string;
  companySector?: string;
  skills: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Search response with pagination
export interface SearchProjectsResponse {
  data: ProjectResponse[];
  pagination: PaginationMetadata;
}
