import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    primaryColor: '#d543bb',
    secondaryColor: '#ba41cc',
    tertiaryColor: '#4E7AD2',
    black: '#000000',
    shallowPink: '#A28B8B',
    white: '#ffffff',
  },
  fonts: {
    body: 'poppins,system-ui, sans-serif',
    heading: 'poppins,Georgia, serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width='3000'
          height='3163'
          viewBox='0 0 3000 3163'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='3000' height='3162.95' fill='none' />
          <path
            d='M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z'
            fill='currentColor'
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
});

export default theme;