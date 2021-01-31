import React from 'react';
import { Box } from '@chakra-ui/react';

interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  return (
    <Box bg='black' w='100px' display='block'>
      Hello
    </Box>
  );
};
