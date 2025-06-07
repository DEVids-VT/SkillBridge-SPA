import { QueryClient, QueryClientProvider as QueryClientProviderLib } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import AxiosInterceptor from '../axios-interceptor/AxiosInterceptor';

const queryClient = new QueryClient();

function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <AxiosInterceptor>
      <QueryClientProviderLib client={queryClient}>{children}</QueryClientProviderLib>
    </AxiosInterceptor>
  );
}

export default QueryClientProvider;
