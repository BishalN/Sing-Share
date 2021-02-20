import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { RecordingsCard } from '../components/RecordingsCard';
import { getTopRecs, getUserByUserId } from '../store/actions/recordingsAction';

const SearchBox = (props) => {
  return (
    <InputGroup _hover={{ boxShadow: 'sm' }} alignSelf='flex-end' {...props}>
      <InputLeftElement
        pointerEvents='none'
        ml={['40px', '150px', '300px', '300px']}
        mt='10px'
        children={<SearchIcon color='gray.300' />}
      />
      <Input
        type='text'
        placeholder='search e.g memories'
        rounded='lg'
        w='sm'
        ml={['40px', '150px', '300px', '300px']}
        mt='10px'
        focusBorderColor='primaryColor'
      />
    </InputGroup>
  );
};

const HeadingTitle = (props) => {
  return (
    <Heading
      as='h1'
      fontSize={['4xl', '5xl', '6xl', '6xl']}
      mt={10}
      lineHeight='none'
      {...props}
    >
      Sing&Share your awesome voice with world
    </Heading>
  );
};

const ProfileRecordings = (props) => {
  const dispatch = useDispatch();

  const topRecordingsFromStore = useSelector((state: any) => state.getTopRecs);
  const { loading, recordings } = topRecordingsFromStore;

  const likeRecordingFromStore = useSelector(
    (state: any) => state.likeRecording
  );
  const { error } = likeRecordingFromStore;

  useEffect(() => {
    dispatch(getTopRecs());
  }, []);

  return (
    <Box>
      {loading && (
        <Box
          display='flex'
          justifyContent='center'
          minH='30vh'
          alignItems='center'
        >
          <Spinner size='lg' />
        </Box>
      )}
      {recordings?.map((recording, index) => (
        <Flex mt='6' display={['block', 'flex']}>
          <Box
            alignContent='center'
            display='flex'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
          >
            <Avatar
              name={recording.username}
              src={recording.avatar}
              size='2xl'
            />
            <Text
              mt='4'
              fontSize='sm'
              fontWeight='medium'
              color='shallowPink'
              textAlign='center'
            >
              {recording.username}
            </Text>
          </Box>
          <Box ml='4'>
            <RecordingsCard
              comments={recording.comments.length}
              commentsArry={recording.comments}
              description={recording.description}
              fileUri={recording.fileUri}
              isLiked={() => false}
              isPublic={recording.isPublic}
              likes={recording.likes.length}
              recordingId={recording._id}
              loggedInuserAvatar='username'
              tags={recording.tags}
              title={recording.title}
              username={recording.username}
              isMyRecording={false}
            />
          </Box>
          <Divider display={['block', 'none']} />
        </Flex>
      ))}
    </Box>
  );
};

const RecordingsSection = (props) => {
  return (
    <Box alignSelf='start' mt='10px' {...props}>
      <Heading as='h3' fontWeight='semibold' fontSize='2xl' color='gray.600'>
        Recordings
      </Heading>
      <ProfileRecordings />
    </Box>
  );
};

const Index = () => {
  return (
    <Layout>
      <Stack
        minHeight={['30vh', '40vh', '45vh', '45vh']}
        wrap='wrap'
        spacing='10px'
        display='flex'
        alignItems='center'
      >
        <SearchBox />
        <HeadingTitle />
      </Stack>
      <RecordingsSection />
    </Layout>
  );
};

export default Index;
