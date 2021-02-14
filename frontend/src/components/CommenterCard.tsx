import React from 'react';
import { Avatar, Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';

interface CommenterCardProps {}

export const CommenterCard: React.FC<CommenterCardProps> = ({}) => {
  return (
    <>
      <HStack spacing='4'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Text color='black' fontWeight='bold'>
          Segun Adebayo
        </Text>
        <Text fontWeight='light' fontStyle='italic' fontSize='sm'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, iusto?
        </Text>
      </HStack>
    </>
  );
};
