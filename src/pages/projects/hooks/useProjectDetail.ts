// filepath: src/pages/projects/hooks/useProjectDetail.ts
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: number;
  companyId: string;
  companyName: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches a single project by ID from the API
 */
const fetchProjectById = async (id: string): Promise<ProjectDetail> => {
  const response = await axiosInstance.get(`/p/${id}`);
  return response.data;
};

/**
 * Hook to fetch and manage a single project's data
 */
export const useProjectDetail = (id: string | undefined) => {
  return useQuery<ProjectDetail, Error>({
    queryKey: ['project', id],
    queryFn: () => {
      if (!id) throw new Error('Project ID is required');
      return fetchProjectById(id);
    },
    enabled: !!id, // Only run the query if we have an ID
  });
};
