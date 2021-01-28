import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import {
  Box,
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
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import {
  login,
  facebookLogin,
  googleLogin,
} from '../store/actions/userActions';

const Login = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userGoogleLogin = useSelector((state: any) => state.userGoogleLogin);
  const {
    loading: googleSignInLoading,
    error: googleError,
    userInfo: userGoogleInfo,
  } = userGoogleLogin;

  console.log(userGoogleInfo);

  const [usrenameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const [credentialsError, setCredentialsError] = useState('');

  const handleSubmit = () => {
    //Clearing the previous state errors
    setCredentialsError('');
    dispatch(login(usrenameOrEmail, password));
  };

  useEffect(() => {
    if (userInfo?.username || userGoogleInfo?.username) {
      router.push('/');
    }
    if (error?.includes('Invalid Credentials')) {
      setCredentialsError(error);
    }
  }, [userGoogleInfo, userInfo]);

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
              p={4}
              colorScheme='pink'
              borderRadius='100px'
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
          <Box mt={4} p={-4} maxWidth='sm'>
            <FacebookLogin
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
              autoLoad={false}
              onClick={() => console.log('button clicked')}
              callback={(response: any) => {
                console.log(response);
                dispatch(facebookLogin(response.userID, response.accessToken));
              }}
              icon='fa-facebook'
            />
          </Box>
          <Box mt={4}>
            <GoogleLogin
              clientId='1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com'
              buttonText='Login with google'
              onSuccess={(responseGoogle: any) =>
                dispatch(googleLogin(responseGoogle.tokenObj.id_token))
              }
              onFailure={(responseGoogle) => console.log(responseGoogle)}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Login;
