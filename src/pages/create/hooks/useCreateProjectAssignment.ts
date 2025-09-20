import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { useCompanyProfile } from '@/pages/company/hooks/useCompanyProfile';
import { CreateProjectAssignmentRequest, ProjectAssignmentResponse } from '../types';

/**
 * Creates a new Project Assignment for the current company
 */
export const useCreateProjectAssignment = () => {
  const { data: companyData, isLoading: isLoadingCompany } = useCompanyProfile();

  return useMutation<ProjectAssignmentResponse, Error, CreateProjectAssignmentRequest>({
    mutationFn: async (payload) => {
      if (isLoadingCompany || !companyData) {
        throw new Error('Company data is not available yet');
      }

      const companyId = companyData.id;
      if (!companyId) {
        throw new Error('Company ID is missing');
      }

      const response = await axiosInstance.post<ProjectAssignmentResponse>(`/g/${companyId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    },
  });
};


