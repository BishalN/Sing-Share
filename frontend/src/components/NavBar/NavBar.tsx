import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import NextLink from 'next/link';

import { MenuLinks } from './MenuLinks';
import { MenuToggle } from './MenuToggleButton';

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justifyContent='space-between'
      wrap='wrap'
      w='100%'
      mb={1}
      mx='auto'
      p={4}
      bg={['gray.800']}
      color={['white']}
      {...props}
    >
      {children}
    </Flex>
  );
};

export const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const isLoggedIn = userInfo?.username ? true : false;

  const userFaceBookLogin = useSelector(
    (state: any) => state.userFacebookLogin
  );
  const {} = userFaceBookLogin;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Box>
      <NavBarContainer {...props}>
        <NextLink href='/'>
          <Link>
            <Logo w='50px' />
          </Link>
        </NextLink>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavBarContainer>
    </Box>
  );
};
