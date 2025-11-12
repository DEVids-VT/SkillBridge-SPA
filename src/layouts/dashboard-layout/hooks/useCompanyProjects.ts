// filepath: src/pages/company/hooks/useCompanyProjects.ts
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { IProjectAssignment } from '@/types/interfaces/projectassignment/IProjectAssignment';
import { ITask } from '@/types/interfaces/task/ITask';

export type CompanyProject = IProjectAssignment & {
  tasks?: ITask[];
};

/**
 * Fetches company projects from the API
 */
const fetchCompanyProjects = async (companyId: string): Promise<CompanyProject[]> => {
  const response = await axiosInstance.get(`/p/mine/${companyId}`);
  return response.data;
};

/**
 * Hook to fetch and manage company projects data
 */
export const useCompanyProjects = (companyId: string | undefined) => {
  return useQuery<CompanyProject[], Error>({
    queryKey: ['companyProjects', companyId],
    queryFn: () => {
      if (!companyId) throw new Error('Company ID is required');
      return fetchCompanyProjects(companyId);
    },
    enabled: !!companyId, // Only run the query if we have a company ID
  });
};
