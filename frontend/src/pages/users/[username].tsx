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
  HStack,
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
import EditImage from '../../components/EditImage';
import { Layout } from '../../components/Layout';
import {
  getUserProfile,
  updateProfile,
} from '../../store/actions/userProfileActions';
import {
  getMyRecordings,
  getRecordingsByUsername,
} from '../../store/actions/recordingsAction';
import { RecordingsCard } from '../../components/RecordingsCard';

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

  const isLiked = (recording) => {
    let likedOrNot = false;
    recording.likes.map((like, index) => {
      const LoggedInUserId = userLoginUserProfile?._id;
      if (like?.user === LoggedInUserId) {
        likedOrNot = true;
      }
    });
    return likedOrNot;
  };

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
        <Flex minH='80vh' alignItems='center' justifyContent='center'>
          <Spinner thickness='5px' color='primaryColor' size='xl' />
        </Flex>
      ) : (
        <Flex alignItems='center' direction='column' minH='80vh'>
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
            my='4'
            fontSize='lg'
            fontStyle='italic'
            textAlign='center'
            color='gray.800'
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
          <Box display='flex' alignItems='self-start'>
            <Text alignSelf='start' mt='4' fontWeight='bold' fontSize='xl'>
              {myRecordings?.length === 0 || recordings?.length === 0
                ? 'No recordings: '
                : 'Latest Recordings:'}
            </Text>
            {myRecordings?.length === 0 ? (
              <Button variant='ghost' mt='10px' color='primaryColor'>
                Start recording
              </Button>
            ) : null}
          </Box>

          {(loadingMyRecordings || loadingMyRecordings) && (
            <Box minHeight='50vh'>
              <Spinner thickness='5px' color='primaryColor' size='xl' />
            </Box>
          )}
          {isUserProfile
            ? myRecordings?.map((recording, index) => (
                <RecordingsCard
                  loggedInuserAvatar={userLoginUserProfile.profilePicture}
                  fileUri={recording.fileUri}
                  username={userLoginUserProfile.username}
                  title={recording.title}
                  commentsArry={recording.comments}
                  likes={recording.likes.length}
                  comments={recording.comments.length}
                  tags={recording.tags}
                  description={recording.description}
                  key={index}
                  isPublic={recording.isPublic}
                  recordingId={recording._id}
                  isMyRecording={true}
                  isLiked={() => isLiked(recording)}
                />
              ))
            : recordings?.map((recording, index) => (
                <RecordingsCard
                  commentsArry={recording.comments}
                  isLiked={() => isLiked(recording)}
                  username={userLoginUserProfile.username}
                  loggedInuserAvatar={userLoginUserProfile.profilePicture}
                  recordingId={recording._id}
                  fileUri={recording.fileUri}
                  isPublic={recording.isPublic}
                  description={recording.description}
                  title={recording.title}
                  likes={recording.likes.length}
                  comments={recording.comments.length}
                  tags={recording.tags}
                  isMyRecording={false}
                  key={index}
                />
              ))}
        </Flex>
      )}
    </Layout>
  );
};

export default UserProfile;
