import {
  Avatar,
  AvatarBadge,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/userActions';
import NextLink from 'next/link';

const MenuItem = ({
  children,
  isLast = false,
  to = '/',
  isAvatar = false,
  ...rest
}) => {
  let component = isAvatar ? (
    <Box>{children}</Box>
  ) : (
    <NextLink href={to}>
      <Link>
        <Text display='block' {...rest}>
          {children}
        </Text>
      </Link>
    </NextLink>
  );
  return component;
};

export const MenuLinks = ({ isOpen }) => {
  const router = useRouter();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfilePicture = useSelector(
    (state: any) => state.userUpdateProfilePicture
  );
  const {
    loading: userupdateProfilePictureLoading,
    error: userUpdateProfilePictureError,
    userProfile: updatedProfilePicture,
  } = userUpdateProfilePicture;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { loading, error, userProfile } = userUpdateProfile;

  const dispatch = useDispatch();

  let isLoggedIn;
  if (userInfo && userInfo.username) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  const logoutHandler = () => {
    dispatch(logout());
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
          <MenuItem isAvatar={true}>
            <Menu>
              <MenuButton as={Avatar}>
                <Wrap>
                  <WrapItem>
                    <Avatar
                      size='lg'
                      name={userInfo.username}
                      src={
                        updatedProfilePicture?.profilePicture ||
                        userInfo?.profilePicture
                      }
                    >
                      <AvatarBadge
                        boxSize='0.75em'
                        bg='green.400'
                        border='2px'
                      />
                    </Avatar>
                  </WrapItem>
                </Wrap>
              </MenuButton>

              <MenuList color='black' p={4} maxW='20px'>
                <NextLink
                  href={`/${userUpdateProfile?.username || userInfo.username}`}
                >
                  <MenuItem>Profile</MenuItem>
                </NextLink>

                <NextLink href='/record'>
                  <MenuItem>Record</MenuItem>
                </NextLink>

                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </MenuItem>
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
