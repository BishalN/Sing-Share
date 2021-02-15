import {
  Avatar,
  Flex,
  HStack,
  Link,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface CommenterCardProps {
  recordingId: string;
  comments;
}

export const CommenterCard: React.FC<CommenterCardProps> = ({
  recordingId,
  comments,
}) => {
  const commentRecording = useSelector((state: any) => state.commentRecording);
  const { loading, comment } = commentRecording;

  const toast = useToast();

  useEffect(() => {
    if (comment) {
      toast({
        title: 'Your comment was added',
        status: 'success',
        isClosable: true,
        position: 'bottom-left',
      });
    }
  });

  return (
    <>
      {loading && (
        <Flex justifyContent='center' alignItems='center'>
          <Spinner />
        </Flex>
      )}

      {comments?.map((comment, index) => (
        <NextLink href={`/${comment.username}`}>
          <HStack spacing='2' m='2'>
            <Link>
              <Avatar name='Segun Adebayo' src={comment.avatar} />
            </Link>
            <Link>
              <Text color='black' fontWeight='bold'>
                {comment.username}
              </Text>
            </Link>

            <Text fontWeight='light' fontStyle='italic' fontSize='sm'>
              {comment.comment}
            </Text>
          </HStack>
        </NextLink>
      ))}
    </>
  );
};
