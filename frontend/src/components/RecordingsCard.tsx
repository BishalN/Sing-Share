import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
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
  Switch,
  Text,
  Textarea,
  toast,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineComment,
} from 'react-icons/ai';
import ReactAudioPlayer from 'react-audio-player';
import {
  deleteMyRecording,
  editMyRecording,
  getMyRecordings,
} from '../store/actions/recordingsAction';
import { useDispatch, useSelector } from 'react-redux';

interface RecordingsCardProps {
  title: string;
  tags: string;
  likes: number;
  comments: number;
  fileUri: string;
  description: string;
  isPublic: string;
  recordingId: string;
}

export const RecordingsCard: React.FC<RecordingsCardProps> = ({
  title,
  comments,
  likes,
  recordingId,
  tags,
  fileUri,
  description,
  isPublic,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  const [isOpenAlert, setIsAlertOpen] = useState(false);
  const onCloseAlert = () => setIsAlertOpen(false);
  const cancelRef = useRef();

  const [recTitle, setRecTitle] = useState(title);
  const [recTags, setRecTags] = useState(tags);
  const [recDescription, setRecDescription] = useState(description);
  const [recAccessibilityStatus, setRecAccessibilityStatus] = useState(
    Boolean(isPublic)
  );

  const editMyRecordingFromStore = useSelector(
    (state: any) => state.editMyRecording
  );
  const { loading, recordingInfo, error } = editMyRecordingFromStore;

  const deleteMyRecordingFromStore = useSelector(
    (state: any) => state.deleteMyRecording
  );
  const { loading: loadingDelete, message } = deleteMyRecordingFromStore;

  useEffect(() => {
    if (recordingInfo) {
      toast({
        title: `${recordingInfo.title} successfully updated`,
        duration: 2000,
        status: 'success',
        isClosable: true,
        position: 'bottom-left',
      });

      onClose();
    }

    if (message?.status && message?.deletedRecording) {
      toast({
        title: `${message.deletedRecording} successfully deleted`,
        duration: 3000,
        status: message.status,
        isClosable: true,
        position: 'bottom-left',
      });

      setIsAlertOpen(false);
    }
  }, [recordingInfo, message]);

  return (
    <Accordion allowToggle rounded='xl' bg='gray.400' mb={4}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as='div'
              alignSelf='start'
              mt='4'
              mb='4'
              bg='black'
              color='white'
              rounded='xl'
              boxShadow='md'
            >
              <Flex p={3} direction='row'>
                <Box maxW='10' overflow='hidden' rounded='10'>
                  <ReactAudioPlayer src={fileUri} controls />
                </Box>

                <Box>
                  <Text ml='3'>
                    {recTitle}
                    {recTags.split(',').map((tag, index) => (
                      <Badge
                        rounded='lg'
                        bg='primaryColor'
                        color='whitesmoke'
                        ml='2'
                        textTransform='lowercase'
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </Text>
                </Box>
                <Box ml='3' display='flex'>
                  <Box>
                    <AiOutlineHeart size={35} />
                    <Badge bg='primaryColor' rounded='sm' color='white'>
                      {likes}
                    </Badge>
                  </Box>
                  <Box ml={3}>
                    <AiOutlineComment size={35} />
                    <Badge bg='primaryColor' rounded='sm' color='white'>
                      {comments}
                    </Badge>
                  </Box>
                </Box>
              </Flex>
            </Box>
            <AccordionIcon ml='2' />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4} display='flex' justifyContent='space-between'>
          <Text maxW='300px' color='white'>
            {recDescription}
          </Text>
          <HStack>
            <Button bg='primaryColor' color='white' onClick={onOpen}>
              Edit
            </Button>
            <Button colorScheme='red' onClick={() => setIsAlertOpen(true)}>
              Delete
            </Button>
          </HStack>
        </AccordionPanel>
      </AccordionItem>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='primaryColor'>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tags</FormLabel>
              <Input
                value={recTags}
                onChange={(e) => setRecTags(e.target.value)}
              />
              <FormHelperText fontStyle='italic' fontWeight='light'>
                Make sure your tags are comma seprated
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={recDescription}
                onChange={(e) => setRecDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Accessibility</FormLabel>
              <Switch
                checked={recAccessibilityStatus}
                onChange={(e) =>
                  setRecAccessibilityStatus(!recAccessibilityStatus)
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='pink'
              mr={3}
              onClick={() => {
                dispatch(
                  editMyRecording({
                    recordingId,
                    title: recTitle,
                    tags: recTags,
                    description: recDescription,
                    isPublic: recAccessibilityStatus,
                  })
                );
              }}
              isLoading={loading}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Recording
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  dispatch(deleteMyRecording(recordingId));

                  dispatch(getMyRecordings());
                }}
                ml={3}
                isLoading={loadingDelete}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Accordion>
  );
};

//before the accordion
{
  /* <Box
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
  <Box maxW='10' overflow='hidden' rounded='10'>
    <ReactAudioPlayer
      src={fileUri}
      style={{ backgroundColor: 'black' }}
      controls
    />
  </Box>

  <Box>
    <Text ml='3'>
      {title}
      {tags.split(',').map((tag, index) => (
        <Badge
          rounded='lg'
          bg='primaryColor'
          color='whitesmoke'
          ml='2'
          textTransform='lowercase'
        >
          #{tag}
        </Badge>
      ))}
    </Text>
  </Box>
  <Box ml='3' display='flex'>
    <Box>
      <AiOutlineHeart size={35} />
      <Badge bg='primaryColor' rounded='sm' color='white'>
        {likes}
      </Badge>
    </Box>
    <Box ml={3}>
      <AiOutlineComment size={35} />
      <Badge bg='primaryColor' rounded='sm' color='white'>
        {comments}
      </Badge>
    </Box>
  </Box>
</Flex>
</Box> */
}
