import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaRecordVinyl } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { IoStopCircleSharp } from 'react-icons/io5';
import { AiFillPauseCircle } from 'react-icons/ai';

import { useReactMediaRecorder } from 'react-media-recorder';
import ReactAudioPlayer from 'react-audio-player';

interface RecordAndUploadFileTabProps {}

export const RecordAndUploadFileTab: React.FC<RecordAndUploadFileTabProps> = ({}) => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
    error,
    isAudioMuted,
    muteAudio,
    pauseRecording,
    resumeRecording,
    unMuteAudio,
  } = useReactMediaRecorder({ audio: true });

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  let [time, setTime] = useState(0);

  const toast = useToast();

  const fileUploadHandler = () => {
    console.log('upload request made');
    if (title.length <= 5) {
      toast({
        title: 'Title must be at least 5 character long',
        description: 'form validation failed',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }

    if (!isPublic) {
      toast({
        title: "Your recording won't be searchable ",
        description: 'It is set to private Are you sure about that',
        status: 'info',
        isClosable: true,
        duration: 4000,
      });
    }
  };

  const startTimer = () => {
    setInterval(() => {
      setTime(time++);
    }, 1000);
  };

  const recordErrorHandler = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        startRecording();
      })
      .catch(() => {
        toast({
          title: 'Permission is required',
          description: 'To record your audio permission is required',
          isClosable: true,
          status: 'error',
        });
      });
  };

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='60vh'
    >
      {status === 'idle' && (
        <Tooltip hasArrow label='start recording' bg='black'>
          <IconButton
            size='xl'
            colorScheme='black'
            aria-label='Start Recording'
            icon={<FaRecordVinyl size={90} color='pink' />}
            onClick={() => {
              if (error) {
                recordErrorHandler();
              } else {
                startRecording();
                startTimer();
              }
            }}
          ></IconButton>
        </Tooltip>
      )}
      {status === 'recording' && (
        <Box display='flex' flexDirection='column'>
          <Text alignSelf='center' mb={6}>
            <Badge bg='primaryColor' fontSize='xl' color='white' rounded='xl'>
              {time}
            </Badge>{' '}
            seconds
          </Text>

          <Flex flexDirection='row'>
            <Tooltip hasArrow label='Cancel Recording' bg='black'>
              <IconButton
                mr={2}
                size='xl'
                colorScheme='black'
                aria-label='Cancel Recording'
                icon={<GiCancel size={60} color='pink' />}
                onClick={clearBlobUrl}
              />
            </Tooltip>

            <Tooltip hasArrow label='Stop Recording' bg='black'>
              <IconButton
                mr={2}
                size='xl'
                colorScheme='black'
                aria-label='Stop Recording'
                icon={<IoStopCircleSharp size={60} color='pink' />}
                onClick={stopRecording}
              />
            </Tooltip>

            <Tooltip hasArrow label='Pause Recording' bg='black'>
              <IconButton
                mr={2}
                size='xl'
                colorScheme='black'
                aria-label='Pause Recording'
                icon={<AiFillPauseCircle size={60} color='pink' />}
                onClick={pauseRecording}
              />
            </Tooltip>
          </Flex>
        </Box>
      )}

      {status === 'stopped' && mediaBlobUrl?.length > 0 && (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box bg='teal' alignSelf='start'>
            <FormLabel color='shallowPink'>Preview</FormLabel>
            <ReactAudioPlayer
              ref={(element) => console.log(element)}
              src={mediaBlobUrl}
              controls
              autoPlay
            />
          </Box>
          <FormControl mt={4} isRequired>
            <FormLabel color='shallowPink'>Title </FormLabel>
            <Input
              variant='outline'
              placeholder='Title to your record'
              focusBorderColor='primaryColor'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxW='sm'
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color='shallowPink'>
              Tags{' '}
              <Text
                as='span'
                color='gray.700'
                fontWeight='light'
                fontStyle='italic'
                fontSize='sm'
                ml={2}
              >
                Optional
              </Text>
            </FormLabel>
            <Input
              variant='filled'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder='some tags'
              focusBorderColor='primaryColor'
              maxW='sm'
            />
            <FormHelperText fontWeight='light' fontStyle='italic' fontSize='xs'>
              Make sure your tags are comma(,) seprated
            </FormHelperText>
          </FormControl>
          <FormControl mt={4} flexDirection='row'>
            <FormLabel color='shallowPink'>
              Description{' '}
              <Text
                as='span'
                color='gray.700'
                fontWeight='light'
                fontStyle='italic'
                fontSize='sm'
                ml={2}
              >
                Optional
              </Text>
            </FormLabel>
            <Textarea
              variant='filled'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Write something about your recording'
              type='textarea'
              focusBorderColor='primaryColor'
              maxW='sm'
            />
          </FormControl>

          <FormControl mt={4} flexDirection='row'>
            <FormLabel color='shallowPink'>Accessibility</FormLabel>
            <Switch
              size='md'
              value={String(isPublic)}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <FormHelperText fontWeight='light' fontStyle='italic' fontSize='xs'>
              {isPublic
                ? 'Your recording is public now! You can switch this setting later from your profile too'
                : 'Your recording is private now! You can switch this setting later from your profile too'}
            </FormHelperText>
          </FormControl>

          <Button
            color='primaryColor'
            bg='black'
            mt={4}
            alignSelf='start'
            onClick={fileUploadHandler}
          >
            Upload
          </Button>
        </Box>
      )}
    </Flex>
  );
};
