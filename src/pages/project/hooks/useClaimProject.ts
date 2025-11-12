import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { UserProject } from '../../dashboard-layout/hooks/useUserProjects';

export interface ClaimProjectRequest {
  projectAssignmentId: string;
}

export interface ClaimProjectResponse {
  projectAssignment: {
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
    skills: Array<{
      id: string;
      name: string;
      description: string;
    }>;
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      isCompleted: boolean;
      sequence: number;
      projectAssignmentId: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
  claimedAt: string;
  isCompleted: boolean;
  completedAt: string | null;
}

const claimProject = async (request: ClaimProjectRequest): Promise<ClaimProjectResponse> => {
  const response = await axiosInstance.post('/user/projects/claim', request);
  return response.data;
};

export const useClaimProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ClaimProjectResponse, Error, ClaimProjectRequest>({
    mutationFn: claimProject,
    onSuccess: (data) => {
      // Invalidate and refetch user projects to update the list
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });

      // Optionally update the cache directly
      queryClient.setQueryData(['user-projects'], (oldData: UserProject[] | undefined) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
    },
  });
};
