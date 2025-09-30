import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { CompanyResponse, UpdateCompanyRequest } from '../types';
import {
  loadCompanyProfileFromStorage,
  saveCompanyProfileToStorage,
  mergeAndSaveCompanyProfile,
} from './companyProfileStorage';

const COMPANY_PROFILE_PATH = '/c/my';

/**
 * Fetches the company profile data from the API
 */
const fetchCompanyProfile = async (): Promise<CompanyResponse> => {
  const response = await axiosInstance.get(COMPANY_PROFILE_PATH);
  return response.data;
};

/**
 * Updates the company profile data
 */
const updateCompanyProfile = async (params: {
  id: string;
  data: UpdateCompanyRequest;
}): Promise<CompanyResponse> => {
  const response = await axiosInstance.put(`/c/${params.id}`, params.data);
  return response.data;
};

/**
 * Hook to fetch company profile data with local storage caching
 */
export const useCompanyProfile = () => {
  const cached = loadCompanyProfileFromStorage();
  return useQuery<CompanyResponse, Error>({
    queryKey: ['companyProfile'],
    queryFn: fetchCompanyProfile,
    initialData: cached ?? undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => {
      // keep storage in sync when fresh data arrives
      saveCompanyProfileToStorage(data);
      return data;
    },
  });
};

/**
 * Hook to update company profile data with local storage sync
 */
export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['companyProfile'], data);
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
      // Merge into local storage
      mergeAndSaveCompanyProfile(data);
    },
  });
};
