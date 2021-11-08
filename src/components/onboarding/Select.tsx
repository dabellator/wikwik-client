import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ExerciseFieldType } from "../../../__generated__/globalTypes";
import { Nullable } from "./FieldParser";

interface SelectProps {
  label: Nullable<string>
  fieldType: ExerciseFieldType
  handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputData: string
  options: any
}
 
const Select: React.FC<SelectProps> = ({
  label,
  fieldType,
  handleDataChange,
  inputData,
  options,
}) => {
  return (
    <Box mt={6}>
      <Box mt={6}>
        <Box display='flex' justifyContent='center' mt={6}>
          <Typography variant='h5' component='div'>{label}</Typography>
        </Box>
      </Box>
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
        value={inputData}
        onChange={handleDataChange}
      >
        {options && options.map((option: string) => (
          <FormControlLabel value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </Box>
  );
}
 
export default Select;