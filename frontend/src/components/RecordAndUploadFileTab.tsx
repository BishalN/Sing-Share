import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { FaRecordVinyl } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { IoStopCircleSharp } from 'react-icons/io5';
import { AiFillPauseCircle } from 'react-icons/ai';

import { useReactMediaRecorder } from 'react-media-recorder';

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
    previewStream,
    resumeRecording,
    unMuteAudio,
  } = useReactMediaRecorder({ audio: true });
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='60vh'
    >
      {/* {status === 'recording' && <audio src={previewStream}></audio>} */}
      {status === 'idle' && (
        <Tooltip hasArrow label='start recording' bg='black'>
          <IconButton
            size='xl'
            colorScheme='black'
            aria-label='Start Recording'
            icon={<FaRecordVinyl size={90} color='pink' />}
            onClick={startRecording}
          ></IconButton>
        </Tooltip>
      )}
      {status === 'recording' && (
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
      )}
    </Flex>
  );
};
