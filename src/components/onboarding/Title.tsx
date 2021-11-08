import { Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
  label: string
}
 
const Title: React.FC<TitleProps> = ({
  label
}) => {
  return (
    <Typography>{label}</Typography>
  );
}
 
export default Title;
