
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroHeading = ({ textRef }: { textRef: React.RefObject<HTMLHeadingElement> }) => {
  const navigate = useNavigate();
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)"
    },
    tap: { 
      scale: 0.98
    }
  };
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-lg px-4 py-2 rounded-full border border-purple-500/30"
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-purple-100">Next-Gen AI Platform</span>
      </motion.div>
      
      <motion.h1 
        ref={textRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash font-semibold leading-tight"
      >
        <span className="block mb-2 text-white text-shadow-lg">The Future of</span>
        <motion.span 
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 font-playfair"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Artificial Intelligence
        </motion.span>
        <span className="block mt-2 text-white text-shadow-lg">Has Arrived</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-100 max-w-xl"
      >
        Leverage the power of next-generation AI to automate workflows, generate qualified leads, and revolutionize your business operations.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 rounded-full px-8 hover:shadow-glow-purple">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="border border-purple-500/30 text-white rounded-full px-8 hover:bg-purple-500/10"
            onClick={() => navigate('/agents-demos')}
            aria-label="Watch demo of AI agents"
          >
            <Bot className="mr-2 h-5 w-5" />
            Meet Our AI
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroHeading;
