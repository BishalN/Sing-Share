import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Badge,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiOutlineHeart, AiTwotoneAudio } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../components/Layout';
import { getUsersProfile } from '../store/actions/userProfileActions';

const Singers = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUsersProfileFromStore = useSelector(
    (state: any) => state.getUsersProfile
  );
  const { loading, error, userProfiles } = getUsersProfileFromStore;

  useEffect(() => {
    if (!userProfiles) {
      dispatch(getUsersProfile());
    }
    console.log(userProfiles);
  }, [userProfiles]);

  return (
    <Layout>
      {loading && (
        <Flex minHeight='50vh' alignItems='center' justifyContent='center'>
          <Spinner size='xl' color='primaryColor' thickness='3px' />
        </Flex>
      )}
      {userProfiles?.map((user, index) => (
        <Box
          padding='6'
          boxShadow='lg'
          bg='black'
          mt={2}
          borderColor='black'
          display='flex'
          rounded='xl'
          key={index}
          _hover={{ boxShadow: 'xl' }}
        >
          <Avatar
            size='xl'
            name={`${user.fullName}`}
            src={user.profilePicture}
            _hover={{ cursor: 'pointer' }}
            onClick={() => router.push(`/${user.username}`)}
          />
          <Box>
            <Text color='white' fontSize='xl' ml='4'>
              {user.fullName}
            </Text>
            <Text color='white' ml='4' fontWeight='light'>
              @{user.username}
            </Text>
          </Box>
          <Box ml='3'>
            <AiOutlineHeart size={35} color='white' />
            <Badge bg='primaryColor' rounded='sm' color='white'>
              1000
            </Badge>
          </Box>
          <Box ml='3'>
            <AiTwotoneAudio size={35} color='white' />
            <Badge bg='primaryColor' rounded='sm' color='white'>
              5
            </Badge>
          </Box>
        </Box>
      ))}
    </Layout>
  );
};

export default Singers;
