import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Link,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Router from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';

const MenuItem = ({ children, isLast = false, to = '/', ...rest }) => {
  return (
    <NextLink href={to}>
      <Link>
        <Text display='block' {...rest}>
          {children}
        </Text>
      </Link>
    </NextLink>
  );
};

export const MenuLinks = ({ isOpen }) => {
  const router = useRouter();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  let isLoggedIn;
  if (userInfo && userInfo.username) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    router.reload();
  };

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {isLoggedIn && (
          <Wrap>
            <WrapItem>
              <Avatar
                size='lg'
                name={userInfo.username}
                src={userInfo.profilePicture}
              />
            </WrapItem>
          </Wrap>
        )}

        {!isLoggedIn && <MenuItem to='/register'>Signup</MenuItem>}
        {!isLoggedIn && <MenuItem to='/login'>Login</MenuItem>}
        {isLoggedIn && <MenuItem to='/singers'>Singers</MenuItem>}
        {isLoggedIn && <MenuItem to='/recordings'>Recordings</MenuItem>}
        {isLoggedIn && (
          <Box onClick={logoutHandler}>
            <MenuItem>Logout</MenuItem>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
