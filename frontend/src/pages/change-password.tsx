import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import {
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
  Alert,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { changePassword } from '../store/actions/userActions';

interface changePassword {}

const ChangePassword: React.FC<changePassword> = ({}) => {
  const dispatch = useDispatch();

  const userChangePassword = useSelector(
    (state: any) => state.userChangePassword
  );
  const { loading, error, status } = userChangePassword;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = () => {
    //clearing the previous state
    setConfirmPasswordError('');
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      return;
    }
    dispatch(changePassword(password));
  };
  useEffect(() => {
    // if(error){
    // }
    // console.log(status);
  });

  return (
    <Layout>
      <Container>
        <Heading as='h1' mt='2'>
          Change Password
        </Heading>
        <Flex flexDirection='column' justifyContent='center' maxW='sm' mt={8}>
          {/* {status?.message ? (
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
          )} */}

          <FormControl id='email' isRequired mb={8}>
            <FormLabel>New Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText>Make it strong</FormHelperText>
          </FormControl>

          <FormControl
            id='email'
            isRequired
            isInvalid={confirmPasswordError.length > 0}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
            <FormHelperText>Make it strong</FormHelperText>
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

export default ChangePassword;
