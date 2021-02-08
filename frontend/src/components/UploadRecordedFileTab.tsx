import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { uploadRecording } from '../store/actions/recordingsAction';

export const UploadRecordedFileTab = ({}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  let [isPublic, setIsPublic] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
  } = useDropzone({
    accept: 'audio/*', //allow all audio type files
    maxSize: 100000000, // maximum size of 100mb
    maxFiles: 1, //only one file at a time
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

  const fileUploadHandler = () => {
    if (title.length <= 5) {
      toast({
        title: 'Title must be at least 5 character long',
        description: 'form validation failed',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }

    if (title.length > 5) {
      const formdata = new FormData();
      formdata.append('title', title);
      formdata.append('description', description);
      formdata.append('isPublic', String(isPublic));
      formdata.append('tags', tags);
      formdata.append('recording', files[0]);

      dispatch(uploadRecording(formdata));
    }
  };

  const userUploadRecording = useSelector(
    (state: any) => state.userUploadRecording
  );
  const { loading, error, recordingInfo, success } = userUploadRecording;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (recordingInfo && recordingInfo.fileUri) {
      toast({
        title: 'File successfully uploaded',
        description: `${recordingInfo.title} is successfully uploaded to our server `,
        isClosable: true,
        status: 'success',
      });
    }
    if (success) {
      onOpen();
    }
  }, [recordingInfo, success]);

  const router = useRouter();

  return (
    <>
      {files.length === 0 && (
        <Box
          {...getRootProps({ className: 'dropzone' })}
          border='dashed'
          p='4'
          m={4}
        >
          <input {...getInputProps()} />{' '}
          <Text>Drag 'n' drop audio files here, or click to select files</Text>
        </Box>
      )}
      {files.length > 0 && (
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
              src={files[0].preview}
              controls
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
              isChecked={isPublic}
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
            onClick={() => {
              fileUploadHandler();
            }}
            isLoading={loading}
            disabled={recordingInfo?.fileUri}
          >
            Upload
          </Button>
        </Box>
      )}

      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader color='primaryColor'>
            Share it to your social media{' '}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <HStack mt={4} spacing={4}>
              <FacebookShareButton
                url={`${recordingInfo?.fileUri}`}
                quote={`${recordingInfo?.title}`}
              >
                <FacebookIcon round />
              </FacebookShareButton>

              <LinkedinShareButton url={`${recordingInfo?.fileUri}`}>
                <LinkedinIcon round />
              </LinkedinShareButton>

              <TwitterShareButton url={`${recordingInfo?.fileUri}`}>
                <TwitterIcon round />
              </TwitterShareButton>
            </HStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              color='white'
              bg='primaryColor'
              ref={cancelRef}
              onClick={() => {
                onClose();
                router.push(`/${userInfo?.username}`);
              }}
            >
              Go back to Profile
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
