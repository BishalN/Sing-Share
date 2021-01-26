import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Logo from './Logo';
import { MenuToggle } from './MenuToggleButton';
import { MenuLinks } from './MenuLinks';

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={1}
      p={8}
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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <NavBarContainer {...props}>
        <Logo w='50px' />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavBarContainer>
    </>
  );
};
