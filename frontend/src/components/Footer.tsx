import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        py='40px'
        mt='100px'
        color='white'
        background='gray.800'
      >
        <Text letterSpacing='5px' textAlign='center'>
          All the data used here are just for demo purpose
        </Text>
        <Text letterSpacing='5px' fontWeight='bold' textAlign='center'>
          &copy;2021 Sing&Share
        </Text>
      </Box>
    </footer>
  );
};
