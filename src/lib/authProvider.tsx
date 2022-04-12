import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuid } from 'uuid';

interface AuthContextInterface {
  bearerToken: string
  isAuthenticated: boolean
  anonymousID: string
}

export const AuthContext = createContext<AuthContextInterface>({
  bearerToken: '',
  isAuthenticated: false,
  anonymousID: '',
});
 
const AuthProvider: React.FC = ({
  children
}) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  console.log(isAuthenticated)
  const [ bearerToken, setBearerToken ] = useState('');
  const [ anonymousID, setAnonymousID ] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await isAuthenticated
        ? await getAccessTokenSilently({
            audience: process.env.REACT_APP_API_AUDIENCE,
            scope: 'openid email',
          })
        : ''
      setBearerToken(token);
    }
    getToken();
  }, [getAccessTokenSilently, isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      const storedAnonKey = localStorage.getItem('anonymousID');
      if (!storedAnonKey) {
        const newUUID = uuid();
        localStorage.setItem('anonymousID', uuid());
        setAnonymousID(newUUID);
      } else {
        setAnonymousID(storedAnonKey);
      }
    }
  }, [isAuthenticated])

  return ( 
    <AuthContext.Provider value={{ bearerToken, isAuthenticated, anonymousID }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export default AuthProvider;
