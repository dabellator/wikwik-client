import { RouteComponentProps, useNavigate } from '@reach/router';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../lib/authProvider';

interface ProtectedRouteProps extends RouteComponentProps {
  component: React.FC<RouteComponentProps>
}
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  component,
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('onboarding');
  }, [path, component, isAuthenticated, navigate])

  return (
    <>
      {component({ path })}
    </>
  );
}
 
export default ProtectedRoute;
