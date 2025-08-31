// filepath: src/pages/company/hooks/useCompanyProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';

export interface CompanyProfileData {
  id: string;
  name: string;
  about: string;
  logoUrl: string;
  bannerUrl: string;
  activities: string;
  sector: string;
  headOfficeLocation: string;
  technologies: string;
  yearEstablished: number; // Made required
  hasOfficesInBulgaria: boolean;
  bulgarianOfficeLocations?: string; // Made optional to match entity
  employeesInBulgaria?: number; // Made optional to match entity
  employeesWorldwide: number;
  whyWorkWithUs?: string; // Made optional to match entity
  websiteUrl: string;
  contactName: string; // Replaced contactInfo with separate fields
  contactEmail: string;
  contactPhone: string;
  auth0UserId: string;
  createdAt: string;
  updatedAt?: string; // Made optional to match entity
}

/**
 * Fetches the company profile data from the API
 */
const fetchCompanyProfile = async (): Promise<CompanyProfileData> => {
  const response = await axiosInstance.get('/c/my');
  return response.data;
};

/**
 * Updates the company profile data
 */
const updateCompanyProfile = async (
  data: Partial<CompanyProfileData>
): Promise<CompanyProfileData> => {
  const response = await axiosInstance.put('/c/my', data);
  return response.data;
};

/**
 * Hook to fetch company profile data
 */
export const useCompanyProfile = () => {
  return useQuery<CompanyProfileData, Error>({
    queryKey: ['companyProfile'],
    queryFn: fetchCompanyProfile,
  });
};

/**
 * Hook to update company profile data
 */
export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['companyProfile'], data);
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
    },
  });
};
