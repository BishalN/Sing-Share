import {
  Alert,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { resetPassword } from '../store/actions/userActions';

interface resetPassword {}

const ResetPassword: React.FC<resetPassword> = ({}) => {
  const dispatch = useDispatch();

  const userResetPassword = useSelector(
    (state: any) => state.userResetPassword
  );
  const { loading, error, status } = userResetPassword;

  const [email, setEmail] = useState('');

  const [emailError, setEmailError] = useState('');

  const handleSubmit = () => {
    //clearing the previous state
    setEmailError('');
    dispatch(resetPassword(email));
  };
  useEffect(() => {
    if (error?.includes('User')) {
      setEmailError(error);
    }
  });

  return (
    <Layout>
      <Container>
        <Heading as='h1' mt='2'>
          Reset Password
        </Heading>
        <Flex flexDirection='column' justifyContent='center' maxW='sm' mt={8}>
          {status?.message ? (
            <Link
              href='https://mail.google.com/mail/u/0/#inbox'
              target='_blank'
            >
              <Alert mt={4} mb={4}>
                {status?.message}
              </Alert>
            </Link>
          ) : (
            ''
          )}

          <FormControl id='email' isRequired isInvalid={emailError.length > 0}>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
            <FormHelperText>Make sure thats your email address</FormHelperText>
          </FormControl>
          <Flex>
            <Button
              mt={4}
              colorScheme='blue'
              type='submit'
              maxW='100px'
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={status?.message}
            >
              Reset
            </Button>
            <NextLink href='/login'>
              <Link mt={8} ml={4} as='a' fontSize='sm'>
                Go back to Login
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
