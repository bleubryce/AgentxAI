
import { motion } from 'framer-motion';

const HeroClients = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <div className="h-8 w-auto text-white font-semibold">Google</div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <div className="h-8 w-auto text-white font-semibold">Microsoft</div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <div className="h-8 w-auto text-white font-semibold">Amazon</div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <div className="h-8 w-auto text-white font-semibold">Apple</div>
      </motion.div>
    </div>
  );
};

export default HeroClients;
