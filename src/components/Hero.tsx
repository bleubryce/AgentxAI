
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Bot, BarChart3, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

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
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bolt-darker/80 via-bolt-darker/70 to-bolt-dark"></div>
      
      {/* Animated glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-bolt-blue/20 blur-[120px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-bolt-purple/30 blur-[150px] animate-pulse-soft animation-delay-1000"></div>
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12 space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">AI-Powered Platform</span>
              </div>
              
              <h1 
                ref={textRef}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash font-semibold leading-tight text-shadow-lg"
              >
                <span className="block mb-2">The Future of</span>
                <span className="text-gradient bg-blue-purple-gradient animate-text-shimmer bg-[length:200%_auto]">AI is Here</span>
                <span className="block mt-2">Supercharge Your Workflow</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                Leverage the power of artificial intelligence to automate your workflow, generate more qualified leads, and close deals faster.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full px-8 hover:shadow-glow-blue transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-white/20 hover:bg-white/10 transition-colors duration-300"
                  onClick={() => navigate('/agents-demos')}
                  aria-label="Watch demo of AI agents"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-bolt-blue" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">99.9%</p>
                    <p className="text-gray-400 text-sm">Accuracy</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-bolt-purple" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">10x</p>
                    <p className="text-gray-400 text-sm">Productivity</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">24/7</p>
                    <p className="text-gray-400 text-sm">Availability</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-bolt-blue" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">500+</p>
                    <p className="text-gray-400 text-sm">Integrations</p>
                  </div>
                </div>
              </div>
              
              {/* Social proof */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Trusted by industry leaders</p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">Google</div>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">Microsoft</div>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">Amazon</div>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">Apple</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-5/12 animate-fade-in">
              <Card className="bg-gradient-to-br from-bolt-darkblue/70 to-bolt-darker/90 border border-white/10 backdrop-blur-md overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center mx-auto">
                      <Bot className="w-8 h-8 text-bolt-blue" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-semibold">AgentX AI Assistant</h3>
                      <p className="text-gray-400">Your personal AI-powered workflow assistant</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-bolt-blue/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Automated Workflows</p>
                          <p className="text-sm text-gray-400">Streamline repetitive tasks and processes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-bolt-purple/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Smart Recommendations</p>
                          <p className="text-sm text-gray-400">Get AI-powered insights and suggestions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-bolt-blue/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Advanced Analytics</p>
                          <p className="text-sm text-gray-400">Monitor performance with real-time data</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full">
                      Try It Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-bolt-dark" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}></div>
    </div>
  );
};

export default Hero;
