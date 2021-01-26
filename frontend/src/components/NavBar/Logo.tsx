import React from 'react';
import { Box } from '@chakra-ui/react';

export default function Logo(props) {
  return (
    <Box {...props}>
      <svg width='200' height='40' viewBox='0 0 302 71'>
        <text
          id='Sing_Share'
          data-name='Sing&amp;Share'
          transform='translate(0 53)'
          fill='#d543b8'
          fontSize='50'
          fontFamily='Poppins-ExtraBold, Poppins'
          fontWeight='800'
        >
          <tspan x='0' y='0'>
            Sing&amp;Share
          </tspan>
        </text>
      </svg>
    </Box>
  );
}
