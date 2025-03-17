
import React from "react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  visible: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <motion.div 
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <p className="text-white/60 text-sm mb-2">Scroll Down</p>
      <motion.div 
        className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
        animate={{ 
          boxShadow: ["0 0 0 rgba(255,192,0,0)", "0 0 10px rgba(255,192,0,0.5)", "0 0 0 rgba(255,192,0,0)"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-gold-500 rounded-full"
          animate={{ y: [0, 13, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
