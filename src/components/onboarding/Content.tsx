import { Typography } from '@mui/material';
import React from 'react';
import { Nullable } from './FieldParser';

interface ContentProps {
  label: Nullable<string>
}
 
const Content: React.FC<ContentProps> = ({
  label,
}) => {

  return (
    <Typography>{label}</Typography>
  );
}
 
export default Content;
