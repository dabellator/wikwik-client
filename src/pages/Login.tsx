import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { RouteComponentProps } from '@reach/router';

const Login: React.FC<RouteComponentProps> = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  )
};

export default Login;
