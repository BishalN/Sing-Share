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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const EditImage = ({}) => {
  const [files, setFiles] = useState([]);
  const [fileError, SetFileError] = useState('');

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
  } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    maxFiles: 5,
    maxSize: 5000000,
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

  if (fileRejections.length > 0) {
    SetFileError('Please upload an image file');
  }

  const getUserProfileFromStore = useSelector(
    (state: any) => state.getUserProfile
  );
  const { loading, error, userProfile } = getUserProfileFromStore;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {console.log(fileError)}
      {fileError && <Alert>{fileError}</Alert>}
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
                <input {...getInputProps()} />
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
            <Button bg='primaryColor' color='white' mr={3} onClick={onClose}>
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
