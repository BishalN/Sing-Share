import { Avatar, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout';
import { getUsersProfile } from '../../store/actions/userProfileActions';

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
        <Flex minHeight='80vh' alignItems='center' justifyContent='center'>
          <Spinner size='xl' color='primaryColor' thickness='3px' />
        </Flex>
      )}
      {userProfiles?.map((user, index) => (
        <HStack
          padding={['4', '4', '6', '8']}
          bg='gray.900'
          mt={2}
          rounded='xl'
          key={index}
          spacing='4'
        >
          <Avatar
            size='xl'
            name={`${user.fullName}`}
            src={user.profilePicture}
            _hover={{ cursor: 'pointer' }}
            onClick={() => router.push(`/users/${user.username}`)}
          />
          <VStack ml='1' alignItems='flex-start' spacing='-1px'>
            <Text
              fontSize='xl'
              fontWeight='bold'
              color='primaryColor'
              letterSpacing='1px'
              textTransform='uppercase'
            >
              {user.fullName}
            </Text>
            <Text fontWeight='light' fontStyle='italic' color='gray.200'>
              @{user.username}
            </Text>
            <Text
              fontWeight='bold'
              fontSize='lg'
              fontStyle='italic'
              textTransform='capitalize'
              py='4'
              color='gray.300'
            >
              {user.bio}
            </Text>
          </VStack>
        </HStack>
      ))}
    </Layout>
  );
};

export default Singers;
