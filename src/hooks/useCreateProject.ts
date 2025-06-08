import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { ProjectRequest, ProjectResponse } from '@/types/project/project';
import { CompanyProfileData } from '@/pages/company/hooks/useCompanyProfile';

// Fetch company profile data to get the company ID
const fetchCompanyProfile = async (): Promise<CompanyProfileData> => {
  const response = await axiosInstance.get('/c/my');
  return response.data;
};

export const useCreateProject = () => {
  // Fetch the company data to get the real company ID
  const { data: companyData, isLoading: isLoadingCompany } = useQuery<CompanyProfileData, Error>({
    queryKey: ['companyProfile'],
    queryFn: fetchCompanyProfile,
    staleTime: 60 * 1000, // 1 minute
  });

  return useMutation<ProjectResponse, Error, ProjectRequest>({
    mutationFn: async (projectData) => {
      // Make sure we have the company data
      if (isLoadingCompany || !companyData) {
        throw new Error('Company data is not available yet');
      }

      const companyId = companyData.id;
      
      if (!companyId) {
        throw new Error('Company ID is missing');
      }

      console.log('Creating project for company ID:', companyId);
      
      const response = await axiosInstance.post<ProjectResponse>(
        `/g/${companyId}`,
        projectData
      );
      
      return response.data;
    }
  });
};
