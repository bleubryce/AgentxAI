
import { motion } from 'framer-motion';
import { Bot, BarChart3, CheckCircle2 } from 'lucide-react';

const HeroStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-gold-500" />
        </div>
        <div>
          <p className="text-xl font-medium text-white">99.9%</p>
          <p className="text-gray-300 text-sm">Accuracy</p>
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-gold-500" />
        </div>
        <div>
          <p className="text-xl font-medium text-white">10x</p>
          <p className="text-gray-300 text-sm">Productivity</p>
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-gold-500" />
        </div>
        <div>
          <p className="text-xl font-medium text-white">24/7</p>
          <p className="text-gray-300 text-sm">Availability</p>
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-gold-500" />
        </div>
        <div>
          <p className="text-xl font-medium text-white">500+</p>
          <p className="text-gray-300 text-sm">Integrations</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroStats;
