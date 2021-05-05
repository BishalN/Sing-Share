import React from 'react';
import { motion } from 'framer-motion';

const Animate = () => {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
      <h1>this is the animation heading</h1>
      <h1>hello of deals out here</h1>
    </motion.div>
  );
};

export default Animate;
