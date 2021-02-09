import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineComment,
} from 'react-icons/ai';

interface RecordingsCardProps {
  title: string;
  tags: string;
  likes: number;
  comments: number;
}

export const RecordingsCard: React.FC<RecordingsCardProps> = ({
  title,
  comments,
  likes,
  tags,
  children,
}) => {
  return (
    <Box
      as='div'
      alignSelf='start'
      mt='4'
      bg='black'
      color='white'
      rounded='xl'
      boxShadow='md'
      _hover={{ boxShadow: 'lg' }}
    >
      <Flex alignItems='center' p={3} direction='row'>
        <AiFillPlayCircle size={70} />
        <Box>
          <Text ml='3'>
            {title}
            {tags.split(',').map((tag, index) => (
              <Badge
                rounded='lg'
                bg='primaryColor'
                color='whitesmoke'
                ml='2'
                textTransform='lowercase'
              >
                #{tag}
              </Badge>
            ))}
          </Text>
        </Box>
        <Box ml='3' display='flex'>
          <Box>
            <AiOutlineHeart size={35} />
            <Badge bg='primaryColor' rounded='sm' color='white'>
              {likes}
            </Badge>
          </Box>
          <Box ml={3}>
            <AiOutlineComment size={35} />
            <Badge bg='primaryColor' rounded='sm' color='white'>
              {comments}
            </Badge>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
