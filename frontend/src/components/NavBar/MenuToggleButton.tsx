import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuIcon } from '../Icon/MenuIcon';
import { CloseIcon } from '@chakra-ui/icons';

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};
