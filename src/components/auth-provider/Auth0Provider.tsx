import { Auth0Provider as Auth0ProviderLib } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';
import { providerConfig } from './providerConfig';

function Auth0Provider({ children }: PropsWithChildren) {
  return <Auth0ProviderLib {...providerConfig}>{children}</Auth0ProviderLib>;
}

export default Auth0Provider;
