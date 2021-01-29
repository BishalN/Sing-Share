import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';

const Index = () => {
  return (
    <Layout>
      <Flex
        minHeight={['30vh', '40vh', '45vh', '45vh']}
        wrap='wrap'
        alignItems='center'
      >
        <InputGroup _hover={{ boxShadow: 'sm' }} alignSelf='flex-end'>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
          />
          <Input
            type='text'
            placeholder='search e.g memories'
            rounded='lg'
            w='sm'
            focusBorderColor='primaryColor'
          />
        </InputGroup>
        <Heading as='h1' fontSize={['4xl', '5xl', '6xl', '6xl']} mt={10}>
          Sing&Share your awesome voice with world
        </Heading>
      </Flex>
    </Layout>
  );
};

export default Index;
