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
import { useRouter } from 'next/router';

import { register } from '../store/actions/userActions';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userRegister = useSelector((state: any) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  console.log(usernameError, emailError, passwordError);

  const handleSubmit = () => {
    //Clearing the previous submission error and starting with new data
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      console.log(passwordError);
      return;
    }

    dispatch(register(username, email, password));
  };
  useEffect(() => {
    if (userInfo && userInfo.username) {
      router.push('/');
    }
    if (error?.includes('Username')) {
      setUsernameError(error);
    } else if (error?.includes('Email')) {
      setEmailError(error);
    }
  }, [userInfo, error]);

  return (
    <Layout>
      <Container>
        <Heading as='h1' mt='2'>
          Register
        </Heading>
        <Flex flexDirection='column' justifyContent='center' maxW='sm'>
          <FormControl
            id='usrename'
            mt={4}
            isRequired
            isInvalid={usernameError.length > 0}
          >
            <FormLabel>Username</FormLabel>
            <Input
              type='username'
              isRequired
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>{usernameError}</FormErrorMessage>
          </FormControl>

          <FormControl
            id='email'
            mt={4}
            isRequired
            isInvalid={emailError.length > 0}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>

          <FormControl
            id='password'
            mt={4}
            isRequired
            isInvalid={passwordError.length > 0}
          >
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl
            id='confirmpassword'
            mt={4}
            isRequired
            isInvalid={passwordError.length > 0}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormErrorMessage>{passwordError}</FormErrorMessage>
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
              Signup
            </Button>
            <NextLink href='/login'>
              <Link mt={8} ml={4} as='a' fontSize='sm'>
                Already have an account?
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Register;
