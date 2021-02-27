import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

interface PaginateProps {}

export const Paginate: React.FC<PaginateProps> = ({}) => {
  return (
    <HStack mt='2'>
      <Button variant='ghost'>Previous</Button>
      <Button variant='ghost'>Next</Button>
    </HStack>
  );
};
