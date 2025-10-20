import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import {
  SearchProjectsRequest,
  SearchProjectsResponse,
  PaginationMetadata,
  ProjectResponse,
} from '../types';

export interface Skill {
  id: string;
  name: string;
  description: string;
}

/**
 * Searches for projects with filtering and pagination via GET /api/p/search
 *
 * Query Parameters:
 * - Title: Filter by project title (partial match)
 * - Level: Filter by difficulty level (0=Beginner, 1=Intermediate, 2=Advanced)
 * - DurationAfter: Only show projects with duration after this date (ISO string)
 * - CompanyName: Filter by company name
 * - CompanySector: Filter by company sector
 * - ProjectSkills: Array of skill names to filter by
 * - pageNumber: Page number (default: 1)
 * - pageSize: Page size (default: 10)
 *
 * Returns pagination metadata via X-Pagination header
 */
const searchProjects = async (filters: SearchProjectsRequest): Promise<SearchProjectsResponse> => {
  const params = new URLSearchParams();

  // Add filter parameters
  if (filters.title) params.append('Title', filters.title);
  if (filters.level !== undefined) params.append('Level', String(filters.level));
  if (filters.durationAfter) params.append('DurationAfter', filters.durationAfter);
  if (filters.companyName) params.append('CompanyName', filters.companyName);
  if (filters.companySector) params.append('CompanySector', filters.companySector);
  if (filters.projectSkills && filters.projectSkills.length > 0) {
    filters.projectSkills.forEach((skill) => params.append('ProjectSkills', skill));
  }

  // Add pagination parameters
  params.append('pageNumber', String(filters.pageNumber || 1));
  params.append('pageSize', String(filters.pageSize || 10));

  const response = await axiosInstance.get<ProjectResponse[]>(`/p/search?${params.toString()}`);

  // Extract pagination metadata from X-Pagination header
  let pagination: PaginationMetadata = {
    currentPage: filters.pageNumber || 1,
    pageSize: filters.pageSize || 10,
    totalPages: 1,
    totalCount: response.data.length,
  };

  const paginationHeader = response.headers['x-pagination'];
  if (paginationHeader) {
    try {
      const parsed = JSON.parse(paginationHeader);
      pagination = {
        currentPage: parsed.CurrentPage || parsed.currentPage,
        pageSize: parsed.PageSize || parsed.pageSize,
        totalPages: parsed.TotalPages || parsed.totalPages,
        totalCount: parsed.TotalCount || parsed.totalCount,
      };
    } catch (error) {
      console.error('Failed to parse pagination header:', error);
    }
  }

  return {
    data: response.data,
    pagination,
  };
};

/**
 * Hook to search and filter projects with pagination support
 *
 * @param filters - Search filters and pagination parameters
 * @param enabled - Whether to enable the query (default: true)
 */
export const useSearchProjects = (filters: SearchProjectsRequest, enabled: boolean = true) => {
  return useQuery<SearchProjectsResponse, Error>({
    queryKey: ['projects', 'search', filters],
    queryFn: () => searchProjects(filters),
    enabled,
    staleTime: 1000 * 60, // 1 minute
  });
};
