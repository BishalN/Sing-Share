import React from 'react';
import { Box, Link, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const MenuItem = ({ children, isLast = false, to = '/', ...rest }) => {
  return (
    <Link href={to}>
      <Text display='block' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export const MenuLinks = ({ isOpen }) => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  let isLoggedIn;
  if (userInfo && userInfo.username) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
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
        {isLoggedIn && <MenuItem>Welcome {userInfo.username}!</MenuItem>}
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
