import React from 'react';
import { Layout } from '../components/Layout';
import { Container, Flex, Heading } from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../store/actions/userActions';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  //  const dispatch = useDispatch()
  //  const register = useSelector(state => state.register)

  return (
    <Layout>
      <Container>
        <Heading as='h1' mt='2'>
          Register
        </Heading>
        <Flex flexDirection='column' justifyContent='center'>
          <InputField
            label='Username'
            isRquired
            helperText='comeup with unique username'
            placeholder='username'
            type='text'
            id='username'
          />
          <InputField
            label='Email'
            isRquired
            placeholder='email'
            type='email'
            id='email'
          />
          <InputField
            label='Password'
            isRquired
            placeholder='password'
            type='password'
            id='password'
          />

          <InputField
            label='Confirm Password'
            isRquired
            placeholder='confirm password'
            type='password'
            id='confirmPassword'
          />
        </Flex>
      </Container>
    </Layout>
  );
};

export default Register;
