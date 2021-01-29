import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';

interface usernameProps {}

const Username: React.FC<usernameProps> = ({}) => {
  return (
    <Layout>
      <Flex alignItems='center' direction='column'>
        <Avatar
          mt='4'
          size='2xl'
          name='Segun Adebayo'
          src='https://bit.ly/sage-adebayo'
        />{' '}
        <Text fontWeight='medium' fontSize='2xl' color='shallowPink'>
          Segun Adebayo
        </Text>
        <Text mt='-1' fontWeight='normal' fontSize='sm' color='gray.600'>
          @segunadebayo
        </Text>
        <Text
          mt='2'
          fontWeight='medium'
          fontSize='md'
          textAlign='center'
          color='gray.400'
        >
          This is segun adebayo designer and developer of chakra ui
        </Text>
        <Divider color='grey.700' mt='3' />
        <Text fontWeight='medium' fontSize='xl'>
          Total 5 recordings
        </Text>
      </Flex>
    </Layout>
  );
};

export default Username;
