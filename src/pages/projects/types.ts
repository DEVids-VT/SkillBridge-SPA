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
  deadline: string;
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
  deadlineAfter?: string; // ISO date string
  companyName?: string;
  companySector?: string;
  projectSkills?: string[]; // Array of skill names
}

// Pagination metadata from X-Pagination header
export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

// Search request with pagination
export interface SearchProjectsRequest extends SearchProjectFilters {
  pageNumber?: number;
  pageSize?: number;
}

// Search response with pagination
export interface SearchProjectsResponse {
  data: Project[];
  pagination: PaginationMetadata;
}
