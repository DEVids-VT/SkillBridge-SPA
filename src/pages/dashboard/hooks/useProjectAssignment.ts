import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';

export interface ProjectDetailSkill {
  id: string;
  name: string;
  description: string;
}

export interface ProjectDetailTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
  projectAssignmentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetailData {
  id: string;
  title: string;
  description: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: number;
  deadline: string;
  status: number;
  companyId: string;
  companyName: string;
  skills: ProjectDetailSkill[];
  tasks: ProjectDetailTask[];
  createdAt: string;
  updatedAt: string;
}

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
