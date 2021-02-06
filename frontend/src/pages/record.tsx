import React from 'react';
import { Layout } from '../components/Layout';
import { useReactMediaRecorder } from 'react-media-recorder';
import reactAudioPlayer from 'react-audio-player';
import ReactAudioPlayer from 'react-audio-player';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { UploadRecordedFileTab } from '../components/UploadRecordedFileTab';
import { RecordAndUploadFileTab } from '../components/RecordAndUploadFileTab';

interface recordProps {}

const Record: React.FC<recordProps> = ({}) => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    resumeRecording,
    pauseRecording,
    error,
  } = useReactMediaRecorder({
    audio: true,
  });

  return (
    <Layout>
      {/* <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <ReactAudioPlayer src={mediaBlobUrl}></ReactAudioPlayer> */}
      <Tabs
        isFitted
        variant='soft-rounded'
        colorScheme='pink'
        bg=''
        color='black'
        mt={4}
      >
        <TabList mb='1em'>
          <Tab fontWeight='bold' fontSize='xl'>
            Upload an audio File
          </Tab>
          <Tab fontWeight='bold' fontSize='xl'>
            Record and Upload
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UploadRecordedFileTab />
          </TabPanel>
          <TabPanel>
            <RecordAndUploadFileTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Record;
