
import { motion } from 'framer-motion';
import { Bot, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Animated border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-blue-500/20 blur-md -z-10"></div>
      
      {/* Card with glassmorphism effect */}
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-2xl">
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500 to-teal-500"
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-5"
           style={{ 
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '20px 20px' 
           }}>
        </div>
        
        <div className="relative p-8 z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">AgentX AI</h3>
                <p className="text-blue-200 text-sm">Next-Gen Platform</p>
              </div>
            </div>
            <motion.div 
              className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <Zap className="w-5 h-5 text-green-400" />
            </motion.div>
          </div>
          
          <div className="space-y-6">
            <div className="relative py-4">
              <div className="absolute left-2.5 top-0 w-px h-full bg-gradient-to-b from-blue-500/50 via-teal-500/50 to-blue-500/0"></div>
              <ul className="space-y-4 ml-6">
                {[
                  "AI-powered workflow automation",
                  "Smart lead generation & qualification",
                  "Real-time market analytics",
                  "Advanced document processing",
                ].map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    className="flex items-start"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur transition duration-300 group-hover:opacity-100 group-hover:blur-md opacity-75"></div>
                <Button className="relative w-full bg-gradient-to-r from-blue-600 to-teal-600 border-0 h-12 font-medium text-white">
                  Deploy Your First AI Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
