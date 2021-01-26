import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';

interface InputFieldProps {
  label: string;
  helperText?: string;
  type?: string;
  placeholder?: string;
  isRquired: boolean;
  id?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText = '',
  type,
  placeholder,
  isRquired = false,
  id,
}) => {
  return (
    <FormControl id={id} isRequired={isRquired} mt='5' maxW='sm'>
      <FormLabel>{label}</FormLabel>
      <Input type={type} placeholder={placeholder} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
