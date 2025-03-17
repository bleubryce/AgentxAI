
import React from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  revealedSections: string[];
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  id, 
  children, 
  revealedSections 
}) => {
  return (
    <motion.div 
      id={id} 
      className={`reveal-animation ${revealedSections.includes(id) ? 'revealed' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
