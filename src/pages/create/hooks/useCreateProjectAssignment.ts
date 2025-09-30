import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { useCompanyProfile } from '@/pages/company/hooks/useCompanyProfile';
import { CreateProjectAssignmentRequest, ProjectAssignmentResponse } from '../types';

/**
 * Creates a new Project Assignment via POST /api/c/{companyId}/projects
 *
 * NOTE: If this endpoint returns 404, verify the backend route configuration.
 * Common alternatives: `/p/${companyId}`, `/projects/${companyId}`, or `/g/${companyId}`
 * The endpoint should match the backend controller's [Route] attribute.
 */
const createProjectAssignment = async (params: {
  companyId: string;
  data: CreateProjectAssignmentRequest;
}): Promise<ProjectAssignmentResponse> => {
  const response = await axiosInstance.post<ProjectAssignmentResponse>(
    `/c/${params.companyId}/projects`,
    params.data,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};

/**
 * Hook to create a new Project Assignment for the current company
 * Automatically invalidates relevant queries on success
 */
export const useCreateProjectAssignment = () => {
  const queryClient = useQueryClient();
  const { data: companyData } = useCompanyProfile();

  return useMutation<ProjectAssignmentResponse, Error, CreateProjectAssignmentRequest>({
    mutationFn: async (payload) => {
      if (!companyData?.id) {
        throw new Error('Company profile is not available. Please ensure you are logged in.');
      }

      return createProjectAssignment({
        companyId: companyData.id,
        data: payload,
      });
    },
    onSuccess: (newProject) => {
      // Update the company projects cache by adding the new project
      if (companyData?.id) {
        queryClient.setQueryData(
          ['companyProjects', companyData.id],
          (oldData: ProjectAssignmentResponse[] | undefined) => {
            if (!oldData) return [newProject];
            return [...oldData, newProject];
          }
        );

        // Invalidate related queries to refetch fresh data
        queryClient.invalidateQueries({ queryKey: ['companyProjects', companyData.id] });
      }

      // Also invalidate company profile in case project count changed
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
    },
    onError: (error: Error) => {
      console.error('Failed to create project assignment:', error);
    },
  });
};
