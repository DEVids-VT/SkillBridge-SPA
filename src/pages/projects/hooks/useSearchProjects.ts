import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { buildUrl } from '@/utils/page';
import { IPaginationHeader } from '@/types/pagination/IPaginationHeader';
import { IProjectAssignment } from '@/types/interfaces/projectassignment/IProjectAssignment';

export interface Skill {
  id: string;
  name: string;
  description: string;
}

const PAGE_SIZE_PARAM_KEY = 'pageSize';
export const PAGE_SEARCH_PARAM_KEY = 'pageNumber';
export const PROJECT_PAGE_SIZE = 9;

export interface IFetchProjectsResponse {
  projects: IProjectAssignment[];
  pagination: IPaginationHeader;
}

const fetchProjects = async (
  page: number,
  searchParams: URLSearchParams
): Promise<IFetchProjectsResponse> => {
  // Create a copy to avoid mutating the original
  const params = new URLSearchParams(searchParams);
  params.set(PAGE_SEARCH_PARAM_KEY, `${page}`);
  params.set(PAGE_SIZE_PARAM_KEY, `${PROJECT_PAGE_SIZE}`);

  const response = await axiosInstance.get<IProjectAssignment[]>(buildUrl('/p/search', params));
  console.log('Response Headers:', response.headers);

  const pagination: IPaginationHeader = JSON.parse(response.headers['x-pagination']);
  console.log('Pagination Metadata:', pagination);

  return {
    projects: response.data,
    pagination,
  };
};

export const useSearchProjects = (page: number, searchParams: URLSearchParams) => {
  // Convert searchParams to a stable string for query key
  const searchParamsString = searchParams.toString();

  return useQuery({
    queryKey: ['project_search', page, searchParamsString],
    queryFn: () => fetchProjects(page, searchParams),
    placeholderData: keepPreviousData,
  });
};
