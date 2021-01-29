import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { Layout } from '../components/Layout';

const SearchBox = (props) => {
  return (
    <InputGroup _hover={{ boxShadow: 'sm' }} alignSelf='flex-end' {...props}>
      <InputLeftElement
        pointerEvents='none'
        ml={['40px', '150px', '300px', '300px']}
        mt='10px'
        children={<SearchIcon color='gray.300' />}
      />
      <Input
        type='text'
        placeholder='search e.g memories'
        rounded='lg'
        w='sm'
        ml={['40px', '150px', '300px', '300px']}
        mt='10px'
        focusBorderColor='primaryColor'
      />
    </InputGroup>
  );
};

const HeadingTitle = (props) => {
  return (
    <Heading
      as='h1'
      fontSize={['4xl', '5xl', '6xl', '6xl']}
      mt={10}
      lineHeight='none'
      {...props}
    >
      Sing&Share your awesome voice with world
    </Heading>
  );
};

const ProfileRecordings = (props) => {
  return (
    <Flex mt='6'>
      <Avatar
        name='Segun Adebayo'
        src='https://bit.ly/sage-adebayo'
        size='2xl'
      />
      <Box>
        <Text fontSize='lg' fontWeight='medium' color='shallowPink'>
          Segun Adebayo
        </Text>
        <Text fontSize='sm' fontWeight='normal' my='2' mx='2'>
          This song is dedicated to my friend{' '}
          <Badge
            rounded='lg'
            bg='primaryColor'
            color='whitesmoke'
            textTransform='lowercase'
          >
            #memories
          </Badge>
        </Text>
        <Flex>
          <BsFillPlayFill size={60} fill='#4E7AD2' />
          <Text mt='5' fontWeight='medium'>
            Play the recording
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const RecordingsSection = (props) => {
  return (
    <Box alignSelf='start' mt='10px' {...props}>
      <Heading as='h3' fontWeight='semibold' fontSize='2xl' color='gray.600'>
        Recordings
      </Heading>
      <ProfileRecordings />
    </Box>
  );
};

const Index = () => {
  return (
    <Layout>
      <Stack
        minHeight={['30vh', '40vh', '45vh', '45vh']}
        wrap='wrap'
        spacing='10px'
        display='flex'
        alignItems='center'
      >
        <SearchBox />
        <HeadingTitle />
      </Stack>
      <RecordingsSection />
    </Layout>
  );
};

export default Index;
