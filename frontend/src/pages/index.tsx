import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormHelperText,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { RecordingsCard } from '../components/RecordingsCard';
import { getTopRecs, getUserByUserId } from '../store/actions/recordingsAction';
import { QueryClient, useQuery, QueryCache } from 'react-query';
import axios from 'axios';
import { Paginate } from '../components/Paginate';
import Query from './query';

const HeadingTitle = (props) => {
  return (
    <Heading
      as='h1'
      fontSize={['4xl', '5xl', '6xl', '6xl']}
      mt={10}
      lineHeight='none'
      {...props}
    >
      <span>Sing&Share</span> your awesome voice with world
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

  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo,
  } = userLogin;

  const isLiked = (recording) => {
    let likedOrNot = false;
    recording.likes.map((like, index) => {
      const LoggedInUserId = userInfo?._id;
      if (like?.user === LoggedInUserId) {
        likedOrNot = true;
      }
    });
    return likedOrNot;
  };

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
              isLiked={() => isLiked(recording)}
              isPublic={recording.isPublic}
              likes={recording.likes.length}
              recordingId={recording._id}
              loggedInuserAvatar={userInfo?.profilePicture}
              tags={recording.tags}
              title={recording.title}
              username={userInfo?.username}
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

const SearchResults = ({ searchTerm, setSearchTerm }) => {
  let isTag = searchTerm.startsWith('#');
  const [page, setPage] = useState(1);

  const fetchRecording = async (title, tags, pageNumber) => {
    return axios
      .get(
        `http://localhost:4000/api/recordings/search/?title=${title}&tags=${tags}&pageNumber=${pageNumber}`
      )
      .then((res) => res.data);
  };

  const { isLoading, data, isPreviousData, isFetching } = useQuery(
    ['recordings', { searchTerm, page }],
    () =>
      fetchRecording(isTag ? '' : searchTerm, isTag ? searchTerm : '', page),
    { keepPreviousData: true }
  );

  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo: userLoginUserProfile,
  } = userLogin;

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
  return (
    <Box>
      <Button
        onClick={() => setSearchTerm('')}
        mr='2'
        bg='black'
        color='primaryColor'
      >
        Go back
      </Button>
      <Text fontWeight='medium' mr='3' fontStyle='italic' display='inline'>
        SearchTerm:
      </Text>
      <Badge color='white' background='gray.600' fontStyle='italic'>
        {searchTerm}
      </Badge>
      <Text fontStyle='italic' fontWeight='light' my='2' fontSize='sm'>
        Search using tags eg. #tagname in the search field
      </Text>
      {isFetching && <Progress size='xs' isIndeterminate colorScheme='pink' />}
      {isLoading ? (
        <Flex minHeight='50vh' justifyContent='center' alignItems='center'>
          <Spinner />
        </Flex>
      ) : (
        <Box>
          {data?.recordings?.length === 0 ? (
            <Flex
              justifyContent='center'
              minHeight='30vh'
              alignItems='center'
              background='gray.600'
              rounded='lg'
              color='white'
              flexDirection='column'
              my='4'
            >
              <Text my='2'>oops</Text>
              <Text
                color='primaryColor'
                fontWeight='bold'
                fontSize='20px'
                textAlign='center'
                p='3'
              >
                No recording found named {searchTerm}{' '}
              </Text>
            </Flex>
          ) : (
            ''
          )}
          {data?.recordings?.map((recording, index) => {
            return (
              <RecordingsCard
                loggedInuserAvatar={userLoginUserProfile?.profilePicture}
                fileUri={recording.fileUri}
                username={userLoginUserProfile?.username}
                title={recording.title}
                commentsArry={recording.comments}
                likes={recording.likes.length}
                comments={recording.comments.length}
                tags={recording.tags}
                description={recording.description}
                key={index}
                isPublic={recording.isPublic}
                recordingId={recording._id}
                isLiked={() => isLiked(recording)}
              />
            );
          })}
        </Box>
      )}
      {data?.recordings?.length === 0 ? (
        ''
      ) : (
        <HStack>
          <Button
            mx='1'
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            bg='black'
            color='primaryColor'
          >
            Previous Page
          </Button>
          <Button
            onClick={() => {
              if (!isPreviousData && data?.pages > page) {
                setPage((old) => old + 1);
              }
            }}
            disabled={data?.pages === page}
            bg='secondaryColor'
            color='white'
          >
            Next Page
          </Button>
        </HStack>
      )}
    </Box>
  );
};

const Index = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      <Stack
        minHeight={['30vh', '40vh', '45vh', '45vh']}
        wrap='wrap'
        spacing='10px'
        display='flex'
        alignItems='center'
      >
        <InputGroup _hover={{ boxShadow: 'sm' }} alignSelf='flex-end'>
          <InputLeftElement
            pointerEvents='none'
            ml={['40px', '150px', '300px', '300px']}
            mt='10px'
            children={<SearchIcon color='gray.300' />}
          />
          <Input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='search e.g memories'
            rounded='lg'
            w='sm'
            ml={['40px', '150px', '300px', '300px']}
            mt='10px'
            focusBorderColor='primaryColor'
          />
        </InputGroup>
        <HeadingTitle display={searchTerm.length > 0 ? 'none' : 'block'} />
        {searchTerm && (
          <SearchResults
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </Stack>
      <RecordingsSection display={searchTerm.length > 0 ? 'none' : 'block'} />
    </Layout>
  );
};

export default Index;
