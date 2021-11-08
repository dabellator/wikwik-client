import { Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ExerciseFieldType } from '../../../__generated__/globalTypes';
import { Nullable } from './FieldParser';

interface QuestionProps {
  label: Nullable<string>
  fieldType: ExerciseFieldType
  handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputData: string
}
 
const Question: React.FC<QuestionProps> = ({
  label,
  handleDataChange,
  inputData,
}) => {
  return (
    <Box mt={6}>
      <Box mt={6}>
        <Box display='flex' justifyContent='center' mt={6}>
          <Typography variant='h5' component='div'>{label}</Typography>
        </Box>
      </Box>
      <Input
        autoFocus
        multiline
        sx={{
          marginTop: 6,
          width: '100%',
        }}
        value={inputData}
        onChange={handleDataChange}
      />
    </Box>
  );
}
 
export default Question;
