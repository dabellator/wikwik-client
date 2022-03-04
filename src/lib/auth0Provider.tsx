import React from 'react';
import { navigate } from '@reach/router';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;

const Auth0ProviderWrapper: React.FC = ({ children }) => {
  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={process.env.REACT_APP_API_AUDIENCE}
      responseType='token id_token'
      scope='openid email'
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
