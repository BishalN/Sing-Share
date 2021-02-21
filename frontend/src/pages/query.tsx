import { Alert, Box, Heading, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const fetchRecordings = async (title, tags) => {
  return axios
    .get(
      `http://localhost:4000/api/recordings/search/?title=${title}&tags=${tags}`
    )
    .then((res) => res.data);
};

export const getServerSideProps = async (title = '', tags = '') => {
  const recordings = await fetchRecordings(title, tags);
  return {
    props: { recordings },
  };
};

const Query = ({ recordings }) => {
  console.log(recordings);
  const [title, setTitle] = useState('this');
  const [tags, setTags] = useState('');
  const queryInfo = useQuery('recordings', () => fetchRecordings(title, tags), {
    initialData: recordings,
  });
  return (
    <Box>
      Welcome to the react query home page
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      {queryInfo.isLoading && <Spinner />}
      {queryInfo.error && <Alert>{queryInfo.error}</Alert>}
      {queryInfo.data.map((recording, index) => (
        <Heading>{recording.title}</Heading>
      ))}
    </Box>
  );
};

export default Query;
