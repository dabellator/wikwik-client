import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { navigate, RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import StandardLayout from '../components/layouts/Standard';
import { AuthContext } from '../lib/authProvider';
import { GetDocument_getMyResponses, GetDocument_organization_initial_exercises } from './__generated__/GetDocument';

export const GET_ORGANIZATION = gql`
  query GetOrganization($hostName: String) {
    getOrganization(hostName: $hostName) {
      id
      name
      host
      context_info
    }
  }
`;

interface DashboardProps extends RouteComponentProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  const { data, loading } = useQuery(GET_ORGANIZATION, {
    variables: {
      hostName: 'g2i.wikwik.co'
    }
  });
  const { isAuthenticated } = useContext(AuthContext);
  const [ viewContent, setViewContent ] = useState(!!isAuthenticated);
  const { loginWithRedirect } = useAuth0();

  // How to handle login? If they arrive on this page and are not authed,
  // the document pane should show a message asking them to login, but they
  // can choose not to

  useEffect(() => {
    setViewContent(!!isAuthenticated);
  }, [isAuthenticated]);

  const handleNoAuth = () => {
    setViewContent(true);
  };

  const handleLoginLink = () => {
    return loginWithRedirect()
  };

  return (
    <StandardLayout>
      <Box display='flex' flexDirection='column'>
        <Box flex='1 1 auto' mb={3} whiteSpace='break-spaces'>{loading
          ? ( 'Loading...' )
          : data.getOrganization.context_info.split('\n').map((para: string) => (
            <p>
              {para}
            </p>
          ))
        }</Box>
        <Box flex='1 1 auto' alignSelf={'center'}>
          {!loading && <Button variant='outlined' onClick={() => navigate('/onboarding')}>Go to first question</Button>}
        </Box>
      </Box>
    </StandardLayout>
  );
}
 
export default Dashboard;
