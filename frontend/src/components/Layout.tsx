import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Container,
} from '@chakra-ui/react';
import { NavBar } from './NavBar/NavBar';
import { Nav } from './Nav';
import { Footer } from './Footer';
import Head from 'next/head';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
