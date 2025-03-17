
import { motion } from 'framer-motion';
import { ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Card className="premium-card overflow-hidden shadow-glow-gold">
        <CardContent className="p-8">
          <div className="space-y-6">
            
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                boxShadow: [
                  "0 0 0 rgba(255,192,0,0.3)",
                  "0 0 20px rgba(255,192,0,0.6)",
                  "0 0 0 rgba(255,192,0,0.3)"
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mx-auto border border-gold-500/30"
            >
              <Bot className="w-8 h-8 text-gold-500" />
            </motion.div>
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold text-white">AgentX AI Assistant</h3>
              <p className="text-gray-300">Your personal AI-powered workflow assistant</p>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-gold-500/10"
              >
                <div className="w-8 h-8 rounded-full bg-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Automated Workflows</p>
                  <p className="text-sm text-gray-300">Streamline repetitive tasks and processes</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-gold-500/10"
              >
                <div className="w-8 h-8 rounded-full bg-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Smart Recommendations</p>
                  <p className="text-sm text-gray-300">Get AI-powered insights and suggestions</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-gold-500/10"
              >
                <div className="w-8 h-8 rounded-full bg-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Advanced Analytics</p>
                  <p className="text-sm text-gray-300">Monitor performance with real-time data</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full premium-button">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroCard;
