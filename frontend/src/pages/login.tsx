import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import {
  facebookLogin,
  googleLogin,
  login,
} from '../store/actions/userActions';

const Login = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const toast = useToast();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userGoogleLogin = useSelector((state: any) => state.userGoogleLogin);
  const {
    loading: googleSignInLoading,
    error: googleError,
    userInfo: userGoogleInfo,
  } = userGoogleLogin;

  const userFacebookLogin = useSelector(
    (state: any) => state.userFacebookLogin
  );
  const {
    loading: facebookSignInLoading,
    error: facebookError,
    userInfo: userFacebookInfo,
  } = userFacebookLogin;

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const [credentialsError, setCredentialsError] = useState('');

  const handleSubmit = () => {
    //Clearing the previous state errors
    setCredentialsError('');
    dispatch(login(usernameOrEmail, password));
  };

  if (userFacebookInfo?.username || userGoogleInfo?.username) {
    router.push('/');
  }

  useEffect(() => {
    if (userInfo?.username) {
      router.push('/');
    }
    if (error?.includes('Invalid Credentials')) {
      console.log('object');
      setCredentialsError(error);
    }
  }, [userGoogleInfo, userInfo, userFacebookInfo, error]);

  const [showAlert, setShowAlert] = useState(true);

  return (
    <Layout>
      {facebookError && showAlert && (
        <Alert status='error' variant='solid' mt={4}>
          <AlertIcon />
          {facebookError}
          <CloseButton
            position='absolute'
            right='-5px'
            top='8px'
            color='black'
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      )}

      <Flex
        mx='auto'
        mt={['40px', '50px', '60px']}
        alignItems='center'
        direction='column'
        maxW='sm'
      >
        <Heading as='h1' mt='2' alignSelf='self-start' mb='sm'>
          Login
        </Heading>
        <FormControl
          id='usernameOrEmail'
          mt={4}
          isRequired
          isInvalid={credentialsError.length > 0}
        >
          <FormLabel>Username Or Email</FormLabel>
          <Input
            type='text'
            isRequired
            focusBorderColor='primaryColor'
            value={usernameOrEmail}
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
            focusBorderColor='primaryColor'
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>{credentialsError}</FormErrorMessage>

          <NextLink href='/reset-password'>
            <Link>
              <FormHelperText>Forgot password?</FormHelperText>
            </Link>
          </NextLink>
        </FormControl>
        <Flex alignSelf='self-start'>
          <Button
            mt={4}
            p={4}
            colorScheme='pink'
            borderRadius='15px'
            type='submit'
            maxW='200px'
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
        <Button
          mt={8}
          colorScheme='facebook'
          leftIcon={<FaFacebook />}
          minW={['xs', 'sm']}
          rounded='xl'
        >
          <FacebookLogin
            appId='508027223494006'
            autoLoad={false}
            onClick={() => console.log('button clicked')}
            callback={(response: any) => {
              console.log(response);
              dispatch(facebookLogin(response.userID, response.accessToken));
            }}
            cssClass=''
          />
        </Button>

        <Box mt={4} maxW='sm'>
          <GoogleLogin
            clientId='1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                leftIcon={<FaGoogle />}
                onClick={renderProps.onClick}
                rounded='xl'
                minW={['xs', 'sm']}
              >
                Login with google
              </Button>
            )}
            onSuccess={(responseGoogle: any) =>
              dispatch(googleLogin(responseGoogle.tokenObj.id_token))
            }
            onFailure={(responseGoogle) => console.log(responseGoogle)}
            cookiePolicy={'single_host_origin'}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Login;
