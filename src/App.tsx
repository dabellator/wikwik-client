import React from 'react';
import Pages from './pages';
import Auth0Provider from './lib/auth0Provider';
import AuthProvider from './lib/authProvider';
import AuthorizedApolloProvider from './lib/apolloWrapper';
import ThemeProvider from './lib/themeProvider';

const App: React.FC = () => {
  return (
    <Auth0Provider>
      <AuthProvider>
        <AuthorizedApolloProvider>
          <ThemeProvider>
            <Pages/>
          </ThemeProvider>
        </AuthorizedApolloProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}

export default App;
