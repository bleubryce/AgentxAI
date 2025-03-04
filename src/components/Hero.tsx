
import { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Building2, BarChart3 } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = heroElement.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      heroElement.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
      
      if (textRef.current) {
        textRef.current.style.transform = `translate(${moveX / 4}px, ${moveY / 4}px)`;
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
      className="relative min-h-screen flex items-center bg-bolt-darker pt-20 overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/a977865f-d1f5-46be-b1dc-f4716d314583.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bolt-darker/70 via-bolt-darker/90 to-bolt-dark"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-bolt-blue/20 blur-[100px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-bolt-purple/20 blur-[120px] animate-pulse-soft animation-delay-1000"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,255,239,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(10,255,239,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_60%)] opacity-30"></div>
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
            <div className="w-full lg:w-1/2 space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Zap className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">Real Estate Revolution</span>
              </div>
              
              <h1 
                ref={textRef}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash font-semibold leading-tight text-shadow"
              >
                <span className="block">AI-Powered</span>
                <span className="text-gradient">Real Estate</span>
                <span className="block">Automation</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                Transform your real estate business with our cutting-edge AI platform. Automate workflows, generate leads, and close deals faster than ever before.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#demo" 
                  className="button-glow inline-flex items-center justify-center px-8 py-4 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <span>View Features</span>
                </a>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-bolt-blue" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">3x</p>
                    <p className="text-gray-400 text-sm">Faster Closings</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-bolt-purple/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-bolt-purple" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">10k+</p>
                    <p className="text-gray-400 text-sm">Properties Managed</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">85%</p>
                    <p className="text-gray-400 text-sm">Time Saved</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 glass-card rounded-2xl p-1 animate-fade-in">
              <div className="relative bg-gradient-to-br from-bolt-darkblue to-bolt-darker rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(10,255,239,0.15)_0%,transparent_70%)]"></div>
                
                <div className="relative z-10 p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">AI Automation Demo</h3>
                      <p className="text-gray-400 text-sm">See how AgentX AI transforms your workflow</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-bolt-blue/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-bolt-blue flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-bolt-dark" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-48 bg-bolt-dark/50 rounded-lg flex items-center justify-center border border-white/5 overflow-hidden">
                      <div className="w-20 h-20 rounded-full bg-bolt-blue/20 animate-pulse-soft flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-bolt-blue/40 animate-pulse-soft flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-bolt-dark/50 rounded-lg border border-white/5"></div>
                      <div className="h-24 bg-bolt-dark/50 rounded-lg border border-white/5"></div>
                      <div className="h-24 bg-bolt-dark/50 rounded-lg border border-white/5"></div>
                    </div>
                  </div>
                  
                  <div>
                    <a 
                      href="#demo" 
                      className="block w-full button-glow text-center px-6 py-3 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                    >
                      Interactive Demo
                    </a>
                  </div>
                </div>
              </div>
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
