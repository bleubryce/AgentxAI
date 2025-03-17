
import React from "react";
import { motion } from "framer-motion";

const GoldParticles = () => {
  // Generate particles for luxury effect
  const renderGoldParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particles.push(
        <motion.div 
          key={i}
          className="particle" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.7, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {renderGoldParticles()}
    </div>
  );
};

export default GoldParticles;
