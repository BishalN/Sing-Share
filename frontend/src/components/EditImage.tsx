import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  IconButton,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Alert,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfilePicture } from '../store/actions/userProfileActions';

const EditImage = ({}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [fileError, SetFileError] = useState('');
  const [uploading, setUploading] = useState(false);

  const userUpdateProfilePicture = useSelector(
    (state: any) => state.userUpdateProfilePicture
  );
  const {
    loading: uploadLoading,
    userProfile: updatedProfile,
    error: uploadError,
  } = userUpdateProfilePicture;

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
  } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const getUserProfileFromStore = useSelector(
    (state: any) => state.getUserProfile
  );
  const { loading, error, userProfile } = getUserProfileFromStore;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const uploadProfileHandler = (file: File) => {
    const formdata = new FormData();
    formdata.append('image', file);
    dispatch(updateProfilePicture(formdata));
    if (!uploadLoading && !(fileRejections.length > 0)) {
      onClose();
    }
  };
  return (
    <>
      <AvatarBadge boxSize='1.3em' border='none'>
        <IconButton
          rounded='xl'
          bg='gray.600'
          aria-label='button'
          onClick={onOpen}
          _hover={{ bg: 'black' }}
          icon={<AiFillCamera color='white' size={25} />}
        />
      </AvatarBadge>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            alignItems='center'
            justifyContent='center'
            display='flex'
            flexDirection='column'
            mt={-5}
          >
            {fileRejections.length > 0 && (
              <Alert>Please upload a valid image file</Alert>
            )}
            <Avatar
              mt='4'
              size='2xl'
              alignSelf='center'
              name={`${userProfile?.username}`}
              src={files[0]?.preview || userProfile?.profilePicture}
              border='4px solid whitesmoke'
              shadow='lg'
            />
            <Box bg='gray.200' rounded='xl' p='4' mt={4} boxShadow='lg'>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input name='image' {...getInputProps()} />
                {/* {acceptedFileItems ? <acceptedFileItems/> : } */}
                <Box p='4'>
                  {acceptedFiles.length > 0 ? (
                    <Alert>
                      Your new Profile is in preview mode! Click on update to
                      make it your new profile or select new one
                    </Alert>
                  ) : (
                    <Text></Text>
                  )}

                  <Box border='dashed' p='4' mt={4}>
                    Drag 'n' drop Image your profile picture, or click to select
                    files
                  </Box>
                </Box>
              </div>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg='primaryColor'
              color='white'
              mr={3}
              onClick={() => uploadProfileHandler(acceptedFiles[0])}
              isLoading={uploading}
            >
              Update
            </Button>
            <Button onClick={onClose} variant='ghost'>
              cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditImage;
