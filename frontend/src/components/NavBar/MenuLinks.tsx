import React from 'react';
import { Box, Link, Stack, Text } from '@chakra-ui/react';

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
        <MenuItem to='/'>Signup</MenuItem>
        <MenuItem to='/how'>Login</MenuItem>
        <MenuItem to='/'>Singers</MenuItem>
        <MenuItem to='/'>Recordings</MenuItem>
      </Stack>
    </Box>
  );
};
