import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Logo from './Logo';
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
      p={4}
      bg={['black']}
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
        <Logo w='50px' />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavBarContainer>
    </Box>
  );
};
