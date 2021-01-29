import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';

interface singersProps {}

const Singers: React.FC<singersProps> = ({}) => {
  return (
    <Layout>
      <Heading>Hello singers</Heading>
    </Layout>
  );
};

export default Singers;
