import React, { useContext, useEffect, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  concat,
  gql,
  HttpLink,
 } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from '../cache';
import { AuthContext } from './authProvider';
import { useAuth0 } from '@auth0/auth0-react';

const UPDATE_IDENTITY_AUTHENTICATION = gql`
  mutation UpdateIdentityAuthentication($authToken: String!, $anonID: String!) {
    updateIdentityAuthentication(authToken: $authToken, anonID: $anonID) {
      id
    }
  }
`;

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { anonymousID } = useContext(AuthContext);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ token, setToken ] = useState("");
  
  useEffect(() => {
    if (!!anonymousID && isAuthenticated) {
      const updateIdentityAuthentication = async () => {
        const token = await getAccessTokenSilently();
        setToken(token);
        client.mutate({mutation: UPDATE_IDENTITY_AUTHENTICATION, variables: {authToken: token, anonID: anonymousID}})
      };
      updateIdentityAuthentication();
    }
  }, [isAuthenticated, anonymousID])

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GQL_URL
  })

  const authLink = setContext(async (_, { headers, ...rest}) => {
    return {
      ...rest,
      headers: {
        ...headers,
        ...( token && { authorization: `Bearer: ${token}` }),
        ...( anonymousID && { 'X-ANON-ID': anonymousID }),
      },
    };
  })
  
  const client = new ApolloClient({
    link: concat(authLink, httpLink),  
		cache,
	});

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
