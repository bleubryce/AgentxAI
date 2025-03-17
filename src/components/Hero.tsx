
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Bot, BarChart3, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = heroElement.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const moveX = (x - 0.5) * 30;
      const moveY = (y - 0.5) * 30;
      
      heroElement.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
      
      if (textRef.current) {
        textRef.current.style.transform = `translate(${moveX / 3}px, ${moveY / 3}px)`;
      }
    };
    
    heroElement.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center pt-20 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2664&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Premium navigation */}
      <div className="container relative z-50 mx-auto px-4 lg:px-8 py-4">
        <NavigationMenu className="mx-auto max-w-screen-2xl">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gold-500/10 text-white font-medium">Solutions</NavigationMenuTrigger>
              <NavigationMenuContent className="premium-card">
                <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a href="/features" className="group flex h-full w-full flex-col justify-between rounded-md border border-gold-500/20 bg-jet-900/60 p-4 hover:border-gold-500/40 transition-all duration-300">
                        <div className="mb-2 text-lg font-medium text-white">AI Agents</div>
                        <div className="text-sm text-gray-300">Autonomous agents that handle your workflow</div>
                        <div className="mt-4">
                          <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="premium-card w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white">AI Agents</h4>
                        <p className="text-sm text-gray-300">
                          Our AI agents work autonomously to streamline your workflow and increase productivity.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a href="/multi-agent-chat" className="group flex h-full w-full flex-col justify-between rounded-md border border-gold-500/20 bg-jet-900/60 p-4 hover:border-gold-500/40 transition-all duration-300">
                        <div className="mb-2 text-lg font-medium text-white">Multi-Agent Chat</div>
                        <div className="text-sm text-gray-300">Multiple AI experts collaborate in real-time</div>
                        <div className="mt-4">
                          <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="premium-card w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white">Multi-Agent Chat</h4>
                        <p className="text-sm text-gray-300">
                          Experience the power of multiple AI experts working together to solve complex problems.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a href="/agents-demos" className="group flex h-full w-full flex-col justify-between rounded-md border border-gold-500/20 bg-jet-900/60 p-4 hover:border-gold-500/40 transition-all duration-300">
                        <div className="mb-2 text-lg font-medium text-white">Demos</div>
                        <div className="text-sm text-gray-300">See our AI systems in action</div>
                        <div className="mt-4">
                          <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="premium-card w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white">Interactive Demos</h4>
                        <p className="text-sm text-gray-300">
                          Explore our interactive demos to see how our AI solutions can transform your business.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a href="/agent-deployment" className="group flex h-full w-full flex-col justify-between rounded-md border border-gold-500/20 bg-jet-900/60 p-4 hover:border-gold-500/40 transition-all duration-300">
                        <div className="mb-2 text-lg font-medium text-white">Custom Deployment</div>
                        <div className="text-sm text-gray-300">Deploy custom AI solutions</div>
                        <div className="mt-4">
                          <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="premium-card w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white">Custom Deployment</h4>
                        <p className="text-sm text-gray-300">
                          We offer custom AI deployment tailored to your specific business needs and requirements.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gold-500/10 text-white font-medium">Resources</NavigationMenuTrigger>
              <NavigationMenuContent className="premium-card">
                <div className="grid grid-cols-1 gap-3 p-4 w-[300px]">
                  <a href="/about" className="group flex items-center space-x-2 rounded-md border border-gold-500/20 bg-jet-900/60 p-3 hover:border-gold-500/40 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-white">About Us</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                  <a href="/blog" className="group flex items-center space-x-2 rounded-md border border-gold-500/20 bg-jet-900/60 p-3 hover:border-gold-500/40 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-white">Blog</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                  <a href="/careers" className="group flex items-center space-x-2 rounded-md border border-gold-500/20 bg-jet-900/60 p-3 hover:border-gold-500/40 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-white">Careers</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a href="/pricing" className="text-white font-medium hover:text-gold-500 transition-colors">
                Pricing
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a href="/contact" className="text-white font-medium hover:text-gold-500 transition-colors">
                Contact
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Stronger overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-jet-950/95 via-jet-950/85 to-jet-950/75"></div>
      
      {/* Animated glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-gold-500/15 blur-[150px] animate-pulse-soft animation-delay-1000"></div>
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12 space-y-8 animate-fade-in content-overlay">
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
              
              {/* Feature tabs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-6"
              >
                <Tabs defaultValue="stats" className="w-full">
                  <TabsList className="bg-jet-900/40 border border-gold-500/10 p-1">
                    <TabsTrigger value="stats" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-white">
                      Statistics
                    </TabsTrigger>
                    <TabsTrigger value="clients" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-white">
                      Our Clients
                    </TabsTrigger>
                    <TabsTrigger value="features" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-white">
                      Key Features
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="stats" className="pt-4">
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
                  </TabsContent>
                  <TabsContent value="clients" className="pt-4">
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
                  </TabsContent>
                  <TabsContent value="features" className="pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-gold-500/10"
                      >
                        <div className="w-8 h-8 rounded-full bg-gold-500/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Automated Workflows</p>
                          <p className="text-sm text-gray-300">Streamline repetitive tasks</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start space-x-3 p-3 bg-jet-800/50 rounded-lg border border-gold-500/10"
                      >
                        <div className="w-8 h-8 rounded-full bg-gold-500/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Smart Recommendations</p>
                          <p className="text-sm text-gray-300">AI-powered insights</p>
                        </div>
                      </motion.div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
            
            <div className="lg:w-5/12 animate-fade-in">
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-jet-950" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}></div>
    </div>
  );
};

export default Hero;
