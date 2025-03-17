
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroHeading = ({ textRef }: { textRef: React.RefObject<HTMLHeadingElement> }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center space-x-2 bg-jet-900/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-500/20"
      >
        <CheckCircle2 className="w-4 h-4 text-gold-500" />
        <span className="text-sm font-medium text-white">AI-Powered Platform</span>
      </motion.div>
      
      <motion.h1 
        ref={textRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash font-semibold leading-tight text-shadow-lg"
      >
        <span className="block mb-2 text-white text-shadow-enhance">The Future of</span>
        <span className="text-gradient bg-gold-gradient font-playfair">AI is Here</span>
        <span className="block mt-2 text-white text-shadow-enhance">Supercharge Your Workflow</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-100 max-w-xl"
      >
        Leverage the power of artificial intelligence to automate your workflow, generate more qualified leads, and close deals faster.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        <Button size="lg" className="premium-button">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="outline-button"
          onClick={() => navigate('/agents-demos')}
          aria-label="Watch demo of AI agents"
        >
          Watch Demo
        </Button>
      </motion.div>
    </>
  );
};

export default HeroHeading;
