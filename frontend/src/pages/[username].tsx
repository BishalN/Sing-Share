import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  AiFillPlayCircle,
  AiOutlineComment,
  AiOutlineHeart,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import EditImage from '../components/EditImage';
import { Layout } from '../components/Layout';
import {
  getUserProfile,
  updateProfile,
} from '../store/actions/userProfileActions';
import {
  getMyRecordings,
  getRecordingsByUsername,
} from '../store/actions/recordingsAction';
import { RecordingsCard } from '../components/RecordingsCard';

const UserProfile = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const userUpdateProfilePicture = useSelector(
    (state: any) => state.userUpdateProfilePicture
  );
  const {
    loading: userupdateProfilePictureLoading,
    error: userUpdateProfilePictureError,
    userProfile: updatedProfilePicture,
  } = userUpdateProfilePicture;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const {
    loading: userupdateProfileLoading,
    error: userUpdateProfileError,
    userProfile: updatedProfile,
  } = userUpdateProfile;

  const [updateFullName, setUpdateFullName] = useState('');
  const [updateUserName, setUpdateUserName] = useState('');
  const [updateBio, setUpdateBio] = useState('');

  const [updateUsernameError, setUpdateUserNameError] = useState('');

  const handleUserUpdate = () => {
    setUpdateUserNameError('');
    dispatch(
      updateProfile({
        fullName: updateFullName,
        username: updateUserName,
        bio: updateBio,
      })
    );
    if (!userUpdateProfileError) {
      onClose();
      router.push(`${updateUserName}`);
    }
  };

  const { username } = router.query;

  const getUserProfileFromStore = useSelector(
    (state: any) => state.getUserProfile
  );
  const { loading, error, userProfile } = getUserProfileFromStore;

  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo: userLoginUserProfile,
  } = userLogin;

  const isUserProfile = userProfile?._id === userLoginUserProfile?._id;

  //conditionally selecting the state from store

  const getMyRecordingsFromStore = useSelector(
    (state: any) => state.getMyRecordings
  );
  const {
    loading: loadingMyRecordings,
    error: errorMyRecordings,
    recordings: myRecordings,
  } = getMyRecordingsFromStore;

  const getRecordingsByUsernameFromStore = useSelector(
    (state: any) => state.getRecordingsByUsername
  );
  const {
    loading: loadingRecordings,
    error: errorRecordings,
    recordings,
  } = getRecordingsByUsernameFromStore;

  useEffect(() => {
    if (!userLoginUserProfile.username) {
      router.push('/');
    }
    if (userUpdateProfileError) {
      setUpdateUserNameError('Username already in use');
    } else {
      if (!userProfile) {
        dispatch(getUserProfile(username));
      } else {
        setUpdateFullName(updatedProfile?.fullName || userProfile?.fullName);
        setUpdateUserName(updatedProfile?.username || userProfile?.username);
        setUpdateBio(updatedProfile?.bio || userProfile?.bio);
      }
    }

    if (isUserProfile) {
      if (!myRecordings) {
        dispatch(getMyRecordings());
      }
    } else {
      if (!recordings) {
        dispatch(
          getRecordingsByUsername(
            updatedProfile?.username || userProfile?.username
          )
        );
      }
    }
  }, [username, userProfile, updatedProfile, myRecordings, recordings]);

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
            src={
              updatedProfilePicture?.profilePicture ||
              userProfile?.profilePicture
            }
            border='4px solid whitesmoke'
            shadow='lg'
          >
            {isUserProfile && <EditImage />}
          </Avatar>

          <Text fontWeight='medium' fontSize='2xl' color='shallowPink'>
            {updatedProfile?.fullName || userProfile?.fullName}
          </Text>
          <Text mt='-1' fontWeight='normal' fontSize='sm' color='gray.600'>
            @{updatedProfile?.username || userProfile?.username}
          </Text>
          <Text
            mt='2'
            fontWeight='medium'
            fontSize='md'
            textAlign='center'
            color='gray.400'
          >
            {updatedProfile?.bio || userProfile?.bio}
          </Text>
          {isUserProfile && (
            <>
              <Button
                bg='primaryColor'
                color='black'
                mt='2'
                onClick={onOpen}
                ref={finalRef}
              >
                Edit Profile
              </Button>

              <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Your Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder='full name'
                        focusBorderColor='primaryColor'
                        value={updateFullName}
                        onChange={(e) => setUpdateFullName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl
                      mt={4}
                      isInvalid={updateUsernameError.length > 0}
                    >
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder='username'
                        value={updateUserName}
                        onChange={(e) => setUpdateUserName(e.target.value)}
                        focusBorderColor='primaryColor'
                      />
                      <FormErrorMessage>
                        The username that you wanted to use is already taken
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Bio</FormLabel>
                      <Input
                        value={updateBio}
                        onChange={(e) => setUpdateBio(e.target.value)}
                        focusBorderColor='primaryColor'
                        placeholder='write something about you'
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme='pink'
                      mr={3}
                      isLoading={userupdateProfileLoading}
                      onClick={() => {
                        handleUserUpdate();
                      }}
                    >
                      Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
          <Divider color='grey.700' mt='3' />
          <Text fontWeight='normal' fontSize='xl'>
            5 songs recorded
          </Text>
          <Text alignSelf='start' mt='4' fontWeight='bold' fontSize='xl'>
            Latest Recordings:
          </Text>
          {console.log(myRecordings)}
          {isUserProfile
            ? myRecordings?.map((recording, index) => (
                <RecordingsCard
                  title={recording.title}
                  likes={recording.likes.length}
                  comments={recording.comments.length}
                  tags={recording.tags}
                  key={index}
                />
              ))
            : recordings?.map((recording, index) => (
                <RecordingsCard
                  title={recording.title}
                  likes={recording.likes.length}
                  comments={recording.comments.length}
                  tags={recording.tags}
                  key={index}
                />
              ))}
        </Flex>
      )}
    </Layout>
  );
};

export default UserProfile;
