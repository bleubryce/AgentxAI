
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const HeroFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-blue-500/10"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-white">Automated Workflows</p>
          <p className="text-sm text-gray-300">Streamline repetitive tasks</p>
        </div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-blue-500/10"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-white">Smart Recommendations</p>
          <p className="text-sm text-gray-300">AI-powered insights</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroFeatures;
