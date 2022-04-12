import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { navigate, RouteComponentProps } from '@reach/router';
import StandardLayout from '../components/layouts/Standard';
import {
  Box,
  Button,
} from '@mui/material';
import { Transition } from 'react-transition-group';

import {
  GetOnboarding,
  GetOnboarding_getOrganization_initial_exercises_fields as OnboardingFields
} from './__generated__/GetOnboarding';
import FieldParser from '../components/onboarding/FieldParser';
import { makeStyles } from '@mui/styles';

export const duration = 2000;

const defaultStyle = {
  transition:  `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0, transition:  `opacity 100ms ease-in-out`, },
  exited:  { opacity: 0 },
};

const useStyles = makeStyles({
  '@keyframes wait': {
    '0%': { opacity: 0 },
    '100%': { opacity: 0},
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1},
  },
  navigationWrapper: {
    animation: `$wait, $fadeIn ease`,
    // @ts-ignore
    animationDuration: `${4 * 2}s, 2s`,
    // @ts-ignore
    animationDelay: `0s, ${4 * 2}s`,
  }
});

// Get whole onboarding array? That feels the best to me.
export const GET_ONBOARDING = gql`
  query GetOnboarding($hostName: String) {
    getOrganization(hostName: $hostName) {
      initial_exercises {
        id
        fields {
          label
          name
          type
          options
        }
      }
    }
    getMyResponses {
      exercise_id
      values {
        name
        value
        response_id
      }
    }
  }
`;

export const CREATE_RESPONSE = gql`
  mutation CreateResponseMutation($exercise: Int!, $values: [ResponseValueInput]) {
    createResponse(exercise: $exercise, values: $values) {
      id
      values {
        id
        name
        value
      }
    }
  }
`;

// Write exercise mutation
// Handle anonymous user state (??)
// This should be able to be handled on the front end. If there's no token set, then
// create a UUID and send it along.
// On the BE, if that is received with the message, upsert a user

const Onboarding: React.FC<RouteComponentProps> = () => {
  const { data, loading, error } = useQuery<GetOnboarding>(GET_ONBOARDING, {
    variables: {
      hostName: 'g2i.wikwik.co'
    }
  });
  const [ createResponse ] = useMutation(CREATE_RESPONSE);
  const classes = useStyles();
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ inputData, setInputData ] = useState('');
  const [ isHelp, setIsHelp ] = useState(false);
  const [ buttonsIn, setButtonsIn ] = useState(false);
  // Handle current place in the onboarding process
  // @ts-ignore
  const pages = data?.organization?.initial_exercises as GetOnboarding_organization_initial_exercises[];
  const responses = data?.getMyResponses;
  const setCurrentData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputData(newValue);
  }

  useEffect(() => {
    if (!!pages) {
      if (responses?.some(response => response?.exercise_id === pages[currentPage]?.id)) {
        return setCurrentPage(currentPage + 1);
      }
      if (currentPage >= pages.length) {
        navigate('/document');
      } else {
        setTimeout(() => {
          setButtonsIn(true)
        }, duration * (pages[currentPage].fields.length))
      }
    }
  }, [currentPage, pages])

  const submitData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentPageData = pages[currentPage];
    const valueTemplate = currentPageData?.fields.filter((field: any) => (
      field.type === 'STRING'
    ));

    const values = valueTemplate.map((val: any) => ({
      name: val.name,
      value: inputData,
    }));

    createResponse({ variables: {
      exercise: currentPageData.id,
      values
    }});
    setInputData('');
    setButtonsIn(false);
    setIsHelp(false);
    handleNext();
  }

  const handleNext = () => {
    currentPage < pages.length - 1
      ? setCurrentPage(currentPage + 1)
      : navigate('/document');
  }

  // Debounce and submit exercise
  // If value is sufficently long, allow next

  return loading
    ? (<StandardLayout skeleton />)
    : (
      <StandardLayout>
        {/* @ts-ignore */}
        {!!pages && pages[currentPage]?.fields.filter((field: OnboardingFields, i) => (
          (field.name === 'noKnow') === isHelp
        )).map((field: OnboardingFields, i: number) => (
          <FieldParser
            fieldIndex={i}
            fieldType={field.type}
            label={field.label}
            options={field.options}
            handleDataChange={setCurrentData}
            inputData={inputData}
          />
        ))}
        {/* @ts-ignore */}
        <Transition in={buttonsIn} duration={duration} timeout={10000}>
          {state => (
            <div style={{
              ...defaultStyle,
              // @ts-ignore
              ...transitionStyles[state]
            }}>
              <Box
                display='flex'
                justifyContent='space-between'
              >
                <Button onClick={() => setIsHelp(!isHelp)}>{`${isHelp ? 'Go back to answer' : 'I don\'t know'}`}</Button>
                <Button disabled={!isHelp && inputData.length < 5} onClick={submitData}>
                  {!isHelp && inputData.length < 5
                    ? 'Use the form above, or hit the button to say you don\'t know'
                    : 'Next'
                  }
                </Button>
              </Box>
            </div>
          )}
        </Transition>
      </StandardLayout>
    )
};

export default Onboarding;
