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
import {
  AiFillPlayCircle,
  AiOutlineComment,
  AiOutlineHeart,
} from 'react-icons/ai';

interface usernameProps {}

const AudioPlayer = (porps) => {
  return (
    <>
      <Box
        as='div'
        alignSelf='start'
        mt='4'
        bg='black'
        color='white'
        rounded='xl'
        boxShadow='md'
        _hover={{ boxShadow: 'lg' }}
      >
        <Flex alignItems='center' p={3} direction='row'>
          <AiFillPlayCircle size={70} />
          <Box>
            <Text ml='3'>
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
          </Box>
          <Box ml='3' display='flex'>
            <Box>
              <AiOutlineHeart size={35} />
              <Badge bg='primaryColor' rounded='sm' color='white'>
                1000
              </Badge>
            </Box>
            <Box ml={3}>
              <AiOutlineComment size={35} />
              <Badge bg='primaryColor' rounded='sm' color='white'>
                50
              </Badge>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

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
        <Text fontWeight='normal' fontSize='xl'>
          5 songs recorded
        </Text>
        <Text alignSelf='start' mt='4' fontWeight='bold' fontSize='xl'>
          Latest Recordings:
        </Text>
        <AudioPlayer />
      </Flex>
    </Layout>
  );
};

export default Username;
