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
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert ? (
        <Alert status='info'>
          <AlertIcon />
          <Box flex='1'>
            <AlertTitle>Under Development!</AlertTitle>
            <AlertDescription display='block'>
              This site is under development and using dummy data for testing !!
            </AlertDescription>
          </Box>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      ) : (
        ''
      )}

      <NavBar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
