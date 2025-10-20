import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { CompanyProject } from '@/pages/company/hooks/useCompanyProjects';
import { useCompanyProfile } from '@/pages/company/hooks/useCompanyProfile';

// Update request interface - omitting read-only fields
export interface UpdateProjectRequest {
  title: string;
  description: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: number;
  duration: string; // Timespan string
  status: number;
  skills: string[]; // Array of skill names as strings
}

// Response interface - reusing CompanyProject which has all the fields
export type UpdateProjectResponse = CompanyProject;

/**
 * Updates a project via PUT /api/p/{id}
 */
const updateProject = async (params: {
  id: string;
  data: UpdateProjectRequest;
}): Promise<UpdateProjectResponse> => {
  const response = await axiosInstance.put(`/p/${params.id}`, params.data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/**
 * Hook to update a project and manage cache updates
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { data: companyData } = useCompanyProfile();

  return useMutation<UpdateProjectResponse, Error, { id: string; data: UpdateProjectRequest }>({
    mutationFn: updateProject,
    onSuccess: (updatedProject, variables) => {
      // Update the specific project detail cache
      queryClient.setQueryData(['project', variables.id], updatedProject);

      // Update the company projects list cache if we have company data
      if (companyData?.id) {
        queryClient.setQueryData(
          ['companyProjects', companyData.id],
          (oldData: CompanyProject[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.map((project) =>
              project.id === variables.id ? updatedProject : project
            );
          }
        );
      }

      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
      if (companyData?.id) {
        queryClient.invalidateQueries({ queryKey: ['companyProjects', companyData.id] });
      }
    },
  });
};
