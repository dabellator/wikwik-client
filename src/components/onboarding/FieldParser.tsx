import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, FC, useState } from 'react';
import { ExerciseFieldType } from '../../../__generated__/globalTypes';
import {
  Title,
  Content,
  Question,
  Select,
} from '.';
import { Transition } from 'react-transition-group';

const duration = 5000;

export type Nullable<T> = T | null;

interface FieldParserProps {
  fieldIndex: number
  label: Nullable<string>
  options: any
  fieldType: Nullable<ExerciseFieldType>
  handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputData: string
}

const defaultStyle = {
  transition:  `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

// fix timing and handle fade
const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0, transition:  `opacity 100ms ease-in-out`,},
  exited:  { opacity: 0 },
};
 
const FieldParser: React.FC<FieldParserProps> = ({
  fieldIndex,
  label,
  options,
  fieldType,
  handleDataChange,
  inputData,
}) => {
  const [ currentIn, setCurrentIn ] = useState(false);

  useEffect(() => {
    setCurrentIn(false);
    setTimeout(() => {
      setCurrentIn(true);
    }, fieldIndex * duration)
  }, [fieldIndex, label])

  return (
    // @ts-ignore
    <Transition in={currentIn} duration={duration}>
      {state => (
        <div style={{
          ...defaultStyle,
          // @ts-ignore
          ...transitionStyles[state],
        }}>
          <Box>
            {fieldType === 'CONTENT' && (
              <Content label={label} />
            )}
            {fieldType === 'STRING' && (
              <Question
                label={label}
                fieldType={fieldType}
                handleDataChange={handleDataChange}
                inputData={inputData}
              />
            )}
            {fieldType === 'SELECT' && (
              <Select
                label={label}
                fieldType={fieldType}
                options={options}
                handleDataChange={handleDataChange}
                inputData={inputData}
              />
            )}
          </Box>
        </div>
      )}
    </Transition>
  );
}
 
export default FieldParser;
