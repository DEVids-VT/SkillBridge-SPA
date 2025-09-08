import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { CandidateFormData } from '@/types/user/UserOnboarding';

export interface ICreateCandidateResponse {
  id: string;
}

export type ICreateCandidateData = CandidateFormData;

// Removed unused interface

const createCandidate = async (data: ICreateCandidateData): Promise<ICreateCandidateResponse> => {
  // Validate required fields
  if (!data.username || data.username.length < 3 || data.username.length > 50) {
    throw new Error('Username is required and must be between 3 and 50 characters');
  }

  if (!data.cv) {
    throw new Error('CV upload is required');
  }

  // Validate external link if provided
  if (data.externalLink && data.externalLink.trim()) {
    try {
      new URL(data.externalLink);
    } catch {
      throw new Error('External link must be a valid URL');
    }
  }

  // Prepare form data for API submission

  // Create FormData for file uploads
  const formData = new FormData();
  formData.append('username', data.username);
  if (data.externalLink) {
    formData.append('externalLink', data.externalLink);
  }
  if (data.cv) {
    formData.append('cv', data.cv);
  }
  if (data.profilePicture) {
    formData.append('profilePicture', data.profilePicture);
  }

  const response = await axiosInstance.post('/candidates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const useCreateCandidate = () => {
  return useMutation<ICreateCandidateResponse, Error, ICreateCandidateData>({
    mutationFn: (data: ICreateCandidateData) => createCandidate(data),
  });
};
