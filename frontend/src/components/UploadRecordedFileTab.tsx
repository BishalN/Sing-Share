import {
  Box,
  Input,
  Text,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Switch,
  FormHelperText,
  Heading,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactAudioPlayer from 'react-audio-player';

export const UploadRecordedFileTab = ({}) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const toast = useToast();

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

  useEffect(() => {});

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
    </>
  );
};
