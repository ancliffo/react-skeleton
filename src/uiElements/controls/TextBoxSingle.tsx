
import React, { useEffect, useState, useRef } from 'react';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Controller, useFormContext, useForm } from 'react-hook-form';
import { TextBoxSingleProps } from '../../customTypes/uiElement/control/TextBoxTypes';

// const Section: React.FC<SectionProps> = ({ pageId, apiPath, children }: PropsWithChildren<PageContainerProps>) => {
function TextBoxSingle<T>({
    name,
    callback,
    label,
    rules
  } : TextBoxSingleProps<T>) {
  
  // const { control } = useFormContext();
  // const { control } = useFormContext();
  // console.log('Context available:', !!control); // Should log: true
  
  return (
    <FormControl fullWidth>
    <TextField
      name={name}
      size="small"
      onChange={callback}
      // {...field}
      label={label}
      // error={!!fieldState.error}
      // helperText={fieldState.error?.message}
      variant="outlined"
    />
    </FormControl>
    // <Controller
    //   name={name}
    //   // control={control}
    //   rules={rules}
    //   defaultValue=""
    //   render={({ field, fieldState }) => (
    //     <TextField
    //       {...field}
    //       label={label}
    //       error={!!fieldState.error}
    //       helperText={fieldState.error?.message}
    //       fullWidth
    //       variant="outlined"
    //     />
    //   )}
    // />
  );
};

export default TextBoxSingle;