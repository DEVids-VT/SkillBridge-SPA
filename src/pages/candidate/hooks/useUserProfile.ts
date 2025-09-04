import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import type { UpdateUserProfileRequest, UserProfileResponse } from '@/pages/candidate/types';
import { loadUserProfileFromStorage, saveUserProfileToStorage, mergeAndSaveUserProfile } from './userProfileStorage';

const USER_PROFILE_PATH = '/u';

const fetchUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await axiosInstance.get(USER_PROFILE_PATH);
  return response.data as UserProfileResponse;
};

export const useUserProfile = () => {
  const cached = loadUserProfileFromStorage();
  return useQuery<UserProfileResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    initialData: cached ?? undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => {
      // keep storage in sync when fresh data arrives
      saveUserProfileToStorage(data);
      return data;
    },
  });
};

const putUserProfile = async (data: UpdateUserProfileRequest): Promise<UserProfileResponse> => {
  const formData = new FormData();
  if (data.profilePicture) {
    formData.append('ProfilePicture', data.profilePicture);
  }
  if (data.cvUpload) {
    formData.append('CVUpload', data.cvUpload);
  }
  if (typeof data.gitHubConnection === 'string') {
    formData.append('GitHubConnection', data.gitHubConnection);
  }
  const response = await axiosInstance.put(USER_PROFILE_PATH, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data as UserProfileResponse;
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putUserProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['userProfile'], data);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      // Merge into local storage while ignoring empty-string URLs
      mergeAndSaveUserProfile({
        id: data.id,
        profilePicture: data.profilePicture ?? undefined,
        cvUpload: data.cvUpload ?? undefined,
        gitHubConnection: data.gitHubConnection ?? undefined,
      });
    },
  });
};


