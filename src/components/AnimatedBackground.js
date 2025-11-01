import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <motion.div
        className="floating-shape shape-1"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="floating-shape shape-2"
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="floating-shape shape-3"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
          rotate: [180, 360, 180],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="floating-shape shape-4"
        animate={{
          y: [0, 60, 0],
          x: [0, 40, 0],
          rotate: [0, 270, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="gradient-overlay" />
    </div>
  );
};

export default AnimatedBackground;