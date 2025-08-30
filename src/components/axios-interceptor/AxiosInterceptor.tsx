import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { BASE_API_URL } from '@/lib/constants';

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

function AxiosInterceptor({ children }: PropsWithChildren) {
  const { getAccessTokenSilently } = useAuth0();
  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    const reqInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
      try {
        // Get a fresh token for each request to ensure we have the latest roles
        // This is important especially after a role change during onboarding
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'http://skillbridgeapi',
            scope: 'openid profile email default:company default:candidate',
          },
        });
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        console.error('Error getting access token:', error);
        // Allow the request to proceed without a token
        // The API will handle unauthorized requests appropriately
      }
      return config;
    };

    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response.data as unknown;
        let message = 'Request failed';

        // Handle common shapes: string[], string, ProblemDetails, generic object
        if (Array.isArray(data) && data.every((d) => typeof d === 'string')) {
          message = (data as string[]).join('\n');
        } else if (typeof data === 'string') {
          message = data;
        } else if (typeof data === 'object' && data !== null) {
          const pd = data as { title?: string; detail?: string; errors?: Record<string, string[]> };
          const parts: string[] = [];
          if (pd.title) parts.push(pd.title);
          if (pd.detail) parts.push(pd.detail);
          if (pd.errors && typeof pd.errors === 'object') {
            const fieldErrors = Object.entries(pd.errors)
              .flatMap(([field, msgs]) => (Array.isArray(msgs) ? msgs.map((m) => `${field}: ${m}`) : []));
            if (fieldErrors.length) parts.push(fieldErrors.join('\n'));
          }
          message = parts.filter(Boolean).join('\n') || JSON.stringify(data);
        }

        console.error(message);
      }
      return Promise.reject(error);
    };

    const axiosReqInterceptor = axiosInstance.interceptors.request.use(reqInterceptor);
    const axiosResInterceptor = axiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    setIsSet(true);
    return () => {
      axiosInstance.interceptors.request.eject(axiosReqInterceptor);
      axiosInstance.interceptors.response.eject(axiosResInterceptor);
    };
  }, [getAccessTokenSilently]);

  return isSet && children;
}

export default AxiosInterceptor;
