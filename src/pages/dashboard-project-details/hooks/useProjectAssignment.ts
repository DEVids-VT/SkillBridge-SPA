import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { IProjectAssignment } from '@/types/interfaces/projectassignment/IProjectAssignment';
import { ITask } from '@/types/interfaces/task/ITask';

export type ProjectDetailData = IProjectAssignment & {
  tasks: ITask[];
};

/**
 * Fetches a single project assignment by ID from the API
 */
const fetchProjectAssignment = async (id: string): Promise<ProjectDetailData> => {
  const response = await axiosInstance.get(`/p/${id}`);
  return response.data;
};

/**
 * Hook to fetch and manage a single project assignment's data for dashboard detail view
 */
export const useProjectAssignment = (id: string | undefined) => {
  return useQuery<ProjectDetailData, Error>({
    queryKey: ['project-assignment', id],
    queryFn: () => {
      if (!id) throw new Error('Project ID is required');
      return fetchProjectAssignment(id);
    },
    enabled: !!id, // Only run the query if we have an ID
  });
};
