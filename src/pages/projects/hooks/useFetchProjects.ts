import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: number;
  companyId: string;
  companyName: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
  category?: string; // Adding this to maintain compatibility with existing filtering
}

/**
 * Fetches all projects from the API
 */
const fetchProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance.get('/p');
  return response.data;
};

/**
 * Hook to fetch and manage projects data
 */
export const useFetchProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
