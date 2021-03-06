import { Button, Center, HStack, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { RecordingsCard } from '../components/RecordingsCard';
import { getPopularRecords } from '../store/actions/recordingsAction';

interface recordingsProps {}

const Recordings: React.FC<recordingsProps> = ({}) => {
  const dispatch = useDispatch();

  const getPopularRecordsFromStore = useSelector(
    (state: any) => state.getPopularRecords
  );
  const { loading, error, recordings } = getPopularRecordsFromStore;

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

  useEffect(() => {
    console.log(recordings);
    if (!recordings) {
      dispatch(getPopularRecords());
    }
  }, [recordings]);
  return (
    <Layout>
      {loading ? (
        <Center minH='80vh'>
          <Spinner thickness='5px' color='primaryColor' size='xl' />
        </Center>
      ) : (
        recordings?.map((recording, index) => (
          <RecordingsCard
            commentsArry={recording.comments}
            username={userLoginUserProfile?.username}
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
            isLiked={() => isLiked(recording)}
            key={index}
          />
        ))
      )}
    </Layout>
  );
};

export default Recordings;
