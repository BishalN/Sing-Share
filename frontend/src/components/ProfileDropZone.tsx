import { Box, Text, Image, Avatar, AvatarBadge, Badge } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsX } from 'react-icons/bs';

function ProfileDropZone(props) {
  const [files, setFiles] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    maxFiles: 1,
    maxSize: 5000000,
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

  return (
    <Box>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {/* {acceptedFileItems ? <acceptedFileItems/> : } */}
        <Box p='4'>
          {acceptedFiles.length > 0 ? (
            <>
              <Avatar size='2xl' name='Username' src={files[0]?.preview}>
                <AvatarBadge
                  boxSize='1.25em'
                  bg='gray'
                  borderColor='papayawhip'
                >
                  <Badge rounded='xl' color='white' p='1' bg='primaryColor'>
                    New
                  </Badge>
                </AvatarBadge>
              </Avatar>
            </>
          ) : (
            <Box border='dashed' p='4'>
              Drag 'n' drop Image your profile picture, or click to select files
            </Box>
          )}
        </Box>
      </div>
    </Box>
  );
}

export default ProfileDropZone;
