import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';

// Response interfaces
export interface IBecomeCandidateResponse {
  id: number;
  success: boolean;
}

export interface IBecomeCompanyResponse {
  id: number;
  success: boolean;
}

// Simple payload for becoming a candidate or company
interface RolePayload {
  userId?: string; // May be extracted from auth token on the server
}

/**
 * API call to become a candidate
 */
const becomeCandidate = async (): Promise<IBecomeCandidateResponse> => {
  const response = await axiosInstance.post('/r/become-candidate', {}, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/**
 * API call to become a company
 */
const becomeCompany = async (): Promise<IBecomeCompanyResponse> => {
  const response = await axiosInstance.post('/r/become-company', {}, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/**
 * Hook for making the API call to become a candidate
 */
export const useBecomeCandidate = () => {
  return useMutation<IBecomeCandidateResponse, Error>({
    mutationFn: becomeCandidate,
  });
};

/**
 * Hook for making the API call to become a company
 */
export const useBecomeCompany = () => {
  return useMutation<IBecomeCompanyResponse, Error>({
    mutationFn: becomeCompany,
  });
};
