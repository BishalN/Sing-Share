import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import { useSpring, animated } from 'react-spring';

const Test = () => {
  const props = useSpring({ x: 100, from: { x: 0 } });
  return (
    <animated.svg
      strokeDashoffset={props}
      width='3000'
      viewBox='0 0 3000 3163'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='3000' height='3162.95' fill='none' />
      <path
        d='M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z'
        fill='currentColor'
      />
    </animated.svg>
  );
};

export default Test;
