import { AppState, Auth0ProviderOptions, User } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import { getConfig } from './config';

const config = getConfig();

const onRedirectCallback: Auth0ProviderOptions['onRedirectCallback'] = (
  appState?: AppState,
  _?: User
) => {
  createBrowserHistory().push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

export const providerConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  cacheLocation: 'localstorage',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'http://skillbridgeapi',
    scope: 'openid profile email default:company default:candidate',
  },
};
