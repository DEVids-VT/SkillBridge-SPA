// filepath: src/pages/projects/hooks/useProjectDetail.ts
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { IProjectAssignment } from '@/types/interfaces/projectassignment/IProjectAssignment';

/**
 * Fetches a single project by ID from the API
 */
const fetchProjectById = async (id: string): Promise<IProjectAssignment> => {
  const response = await axiosInstance.get(`/p/${id}`);
  return response.data;
};

/**
 * Hook to fetch and manage a single project's data
 */
export const useProjectDetail = (id: string | undefined) => {
  return useQuery<IProjectAssignment, Error>({
    queryKey: ['project', id],
    queryFn: () => {
      if (!id) throw new Error('Project ID is required');
      return fetchProjectById(id);
    },
    enabled: !!id, // Only run the query if we have an ID
  });
};
