import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  AiFillPlayCircle,
  AiOutlineComment,
  AiOutlineHeart,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { useRouter } from 'next/router';

import { getUserProfile } from '../store/actions/userProfileActions';

interface usernameProps {}

const AudioPlayer = (props) => {
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

const UserProfile = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { username } = router.query;

  const getUserProfileFromStore = useSelector(
    (state: any) => state.getUserProfile
  );
  const { loading, error, userProfile } = getUserProfileFromStore;

  useEffect(() => {
    if (userProfile) {
    } else {
      dispatch(getUserProfile(username));
    }
  }, [username]);

  return (
    <Layout>
      {loading ? (
        <Flex minH='50vh' alignItems='center' justifyContent='center'>
          <Spinner thickness='5px' color='primaryColor' size='xl' />
        </Flex>
      ) : (
        <Flex alignItems='center' direction='column'>
          <Avatar
            mt='4'
            size='2xl'
            name={`${userProfile?.username}`}
            src={`${userProfile?.profilePicture}`}
          />{' '}
          <Text fontWeight='medium' fontSize='2xl' color='shallowPink'>
            {userProfile?.username}
          </Text>
          <Text mt='-1' fontWeight='normal' fontSize='sm' color='gray.600'>
            @{userProfile?.username}
          </Text>
          <Text
            mt='2'
            fontWeight='medium'
            fontSize='md'
            textAlign='center'
            color='gray.400'
          >
            {userProfile?.bio}
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
      )}
    </Layout>
  );
};

export default UserProfile;
