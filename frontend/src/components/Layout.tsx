import React from 'react';
import { Container } from '@chakra-ui/react';
import { NavBar } from './NavBar/NavBar';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
    </>
  );
};
