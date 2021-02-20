import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      py='70px'
      mt='4'
      color='white'
      background='black'
    >
      <Text letterSpacing='5px' fontWeight='bold' textAlign='center'>
        &copy;2021 Sing&Share
      </Text>
    </Box>
  );
};
