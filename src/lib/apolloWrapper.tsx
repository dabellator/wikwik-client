import React, { useContext } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  concat,
  HttpLink,
  gql
 } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from '../cache';
import { AuthContext } from './authProvider';

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { bearerToken, anonymousID } = useContext(AuthContext);
  
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GQL_URL
  })

  const authLink = setContext((_, { headers, ...rest}) => {
    return {
      ...rest,
      headers: {
        ...headers,
        ...( bearerToken && { authorization: `Bearer: ${bearerToken}` }),
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
