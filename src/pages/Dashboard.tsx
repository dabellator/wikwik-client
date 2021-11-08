import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import DocumentLayout from '../components/layouts/Document';
import { AuthContext } from '../lib/authProvider';
import { GetDocument_getMyResponses, GetDocument_organization_initial_exercises } from './__generated__/GetDocument';

// Run single request with 2 queries
// Document template
// Responses
export const GET_DOCUMENT = gql`
  query GetDocument {
    organization {
      initial_exercises {
        id
        name
      }
    }
    getMyResponses {
      values {
        value
        id
      }
      exercise_id
    }
  }
`;

interface DashboardProps extends RouteComponentProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  const { data, loading } = useQuery(GET_DOCUMENT);
  const { isAuthenticated } = useContext(AuthContext);
  const [ viewContent, setViewContent ] = useState(!!isAuthenticated);
  const { loginWithRedirect } = useAuth0();

  // How to handle login? If they arrive on this page and are not authed,
  // the document pane should show a message asking them to login, but they
  // can choose not to

  const handleNoAuth = () => {
    setViewContent(true);
  };

  const handleLoginLink = () => {
    return loginWithRedirect()
  };

  return (
    <DocumentLayout>
      <Box display='flex'>
        <Box flex='1 1 auto'>{loading
          ? ( 'Loading...' )
          : data.organization.initial_exercises.map(
            (item: GetDocument_organization_initial_exercises) => (
            <Typography>{item.name}</Typography>
          ))
        }</Box>
        <Box flex='2 1 auto'>{viewContent ? loading
          ? ( 'Loading...' )
          : data.organization.initial_exercises.map(
            (
              item: GetDocument_organization_initial_exercises
            ) => (
            <Box>
              <Typography variant='h3'>{item.name}</Typography>
              {data.getMyResponses.filter(
                (response: GetDocument_getMyResponses) => (
                  response.exercise_id === item.id
                )).map(
                  (exercise: GetDocument_getMyResponses) => (
                    // @ts-ignore
                    exercise.values.map((value: GetDocument_getMyResponses_values) => (
                      <Typography>{value.value}</Typography>
                    ))
                  )
                )
              }
            </Box>
          ))
          : (
            <Box display='flex' justifyContent='center'>
              <Box>
                <Typography variant='h5'>Do you want to have access to your data?</Typography>
                <Box display='flex' justifyContent='space-between'>
                  <Button onClick={handleNoAuth}>No thanks</Button>
                  <Button onClick={handleLoginLink}>Yes, take me to login</Button>
                </Box>
              </Box>
            </Box>
          )
        }</Box>
      </Box>
    </DocumentLayout>
  );
}
 
export default Dashboard;
