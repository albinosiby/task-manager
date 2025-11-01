import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ParticleEffect.css';

const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 25 + 15,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `linear-gradient(45deg, 
              hsl(${Math.random() * 360}, 100%, 70%), 
              hsl(${Math.random() * 360}, 100%, 50%))`
          }}
          initial={{ 
            scale: 0, 
            opacity: 1,
            rotate: 0 
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
            rotate: 360,
            y: [-100, 100]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;