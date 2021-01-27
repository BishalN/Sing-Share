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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../store/actions/userActions';
import { useRouter } from 'next/router';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [usrenameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const [credentialsError, setCredentialsError] = useState('');

  const handleSubmit = () => {
    //Clearing the previous state errors
    setCredentialsError('');
    dispatch(login(usrenameOrEmail, password));
  };

  useEffect(() => {
    if (userInfo && userInfo.username) {
      router.push('/');
    }
    if (error?.includes('Invalid Credentials')) {
      setCredentialsError(error);
    }
  });

  return (
    <Layout>
      <Container>
        <Heading as='h1' mt='2'>
          Login
        </Heading>
        <Flex flexDirection='column' justifyContent='center' maxW='sm'>
          <FormControl
            id='usrenameOrEmail'
            mt={4}
            isRequired
            isInvalid={credentialsError.length > 0}
          >
            <FormLabel>Username Or Email</FormLabel>
            <Input
              type='text'
              isRequired
              value={usrenameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <FormHelperText>An email will contain @</FormHelperText>
            <FormErrorMessage>{credentialsError}</FormErrorMessage>
          </FormControl>

          <FormControl
            id='password'
            mt={4}
            isRequired
            isInvalid={credentialsError.length > 0}
          >
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{credentialsError}</FormErrorMessage>

            <NextLink href='/password-reset'>
              <Link>
                <FormHelperText>Forgot password?</FormHelperText>
              </Link>
            </NextLink>
          </FormControl>

          <Flex>
            <Button
              mt={4}
              colorScheme='blue'
              type='submit'
              maxW='100px'
              onClick={handleSubmit}
              isLoading={loading}
            >
              Login
            </Button>
            <NextLink href='/register'>
              <Link mt={8} ml={4} as='a' fontSize='sm'>
                Don't have an account?
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Login;
