import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  facebookLogin,
  googleLogin,
  register,
} from '../store/actions/userActions';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userRegister = useSelector((state: any) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading: loginLoading,
    error: errorLogin,
    userInfo: loginUserInfo,
  } = userLogin;

  const userGoogleLogin = useSelector((state: any) => state.userGoogleLogin);
  const {
    loading: googleSignInLoading,
    error: googleError,
    userInfo: userGoogleInfo,
  } = userGoogleLogin;

  const userFacebookLogin = useSelector(
    (state: any) => state.userFacebookLogin
  );
  let {
    loading: facebookSignInLoading,
    error: facebookError,
    userInfo: userFacebookInfo,
  } = userFacebookLogin;

  if (userFacebookInfo?.username || userGoogleInfo?.username) {
    router.push('/');
  }

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    //Clearing the previous submission error and starting with new data
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    dispatch(register(fullName, username, email, password));
  };
  useEffect(() => {
    if (userInfo?.username || loginUserInfo?.username) {
      router.push('/');
    }
    if (error?.includes('Username')) {
      setUsernameError(error);
    } else if (error?.includes('Email')) {
      setEmailError(error);
    }
  }, [userInfo, error, loginUserInfo, facebookError]);

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
      <Container>
        <Flex
          flexDirection='column'
          justifyContent='center'
          maxW='sm'
          mx='auto'
          mt={['30px', '40px', '50px']}
        >
          <Heading as='h1' mt='4'>
            Register
          </Heading>
          <FormControl
            id='fullname'
            mt={4}
            isRequired
            isInvalid={usernameError.length > 0}
          >
            <FormLabel>Full Name</FormLabel>
            <Input
              type='text'
              focusBorderColor='primaryColor'
              isRequired
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>

          <FormControl
            id='usrename'
            mt={4}
            isRequired
            isInvalid={usernameError.length > 0}
          >
            <FormLabel>Username</FormLabel>
            <Input
              type='username'
              focusBorderColor='primaryColor'
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
              focusBorderColor='primaryColor'
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
              focusBorderColor='primaryColor'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl
            id='confirmpassword'
            mt={4}
            focusBorderColor='primaryColor'
            isRequired
            isInvalid={passwordError.length > 0}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              focusBorderColor='primaryColor'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>

          <Flex>
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
              Signup
            </Button>
            <NextLink href='/login'>
              <Link mt={8} ml={4} as='a' fontSize='sm'>
                Already have an account?
              </Link>
            </NextLink>
          </Flex>

          <Button
            mt={8}
            borderColor='black'
            colorScheme='facebook'
            minW={['xs', 'sm']}
            leftIcon={<FaFacebook />}
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
              textButton='Signup with facebook'
            />
          </Button>

          <Box mt={4} maxWidth='sm' mb={8}>
            <GoogleLogin
              clientId='1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  leftIcon={<FaGoogle />}
                  onClick={renderProps.onClick}
                  minW={['xs', 'sm']}
                >
                  Signup with google
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
      </Container>
    </Layout>
  );
};

export default Register;
