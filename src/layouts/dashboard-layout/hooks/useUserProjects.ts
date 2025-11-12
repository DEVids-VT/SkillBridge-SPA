import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';

export interface UserProjectSkill {
  id: string;
  name: string;
  description: string;
}

export interface UserProjectTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
  projectAssignmentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProjectAssignment {
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
  skills: UserProjectSkill[];
  tasks: UserProjectTask[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProject {
  projectAssignment: UserProjectAssignment;
  claimedAt: string;
  isCompleted: boolean;
  completedAt: string | null;
}

/**
 * Fetches user's claimed projects from the API
 */
const fetchUserProjects = async (): Promise<UserProject[]> => {
  const response = await axiosInstance.get('/user/projects/mine');
  return response.data;
};

/**
 * Hook to fetch and manage user's claimed projects data
 */
export const useUserProjects = () => {
  return useQuery<UserProject[], Error>({
    queryKey: ['user-projects'],
    queryFn: fetchUserProjects,
  });
};
