
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search, Home, MapPin, DollarSign, Building2, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [searchType, setSearchType] = useState('buy');
  
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
        backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop')",
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
            <div className="w-full lg:w-1/2 space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Home className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">Find Your Dream Home</span>
              </div>
              
              <h1 
                ref={textRef}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash font-semibold leading-tight text-shadow-lg"
              >
                <span className="block mb-2">Your Journey</span>
                <span className="text-gradient bg-blue-purple-gradient animate-text-shimmer bg-[length:200%_auto]">Home Starts Here</span>
                <span className="block mt-2">AI-Powered Real Estate</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                Find, buy, or sell your perfect property with our cutting-edge AI platform. Get instant valuations, automated workflows, and personalized recommendations.
              </p>
              
              {/* Property search bar */}
              <div className="w-full bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <div className="flex flex-wrap gap-4 mb-4">
                  <button 
                    className={`px-4 py-2 rounded-full font-medium transition-all ${searchType === 'buy' ? 'bg-bolt-blue text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                    onClick={() => setSearchType('buy')}
                  >
                    Buy
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full font-medium transition-all ${searchType === 'rent' ? 'bg-bolt-blue text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                    onClick={() => setSearchType('rent')}
                  >
                    Rent
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full font-medium transition-all ${searchType === 'sell' ? 'bg-bolt-blue text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                    onClick={() => setSearchType('sell')}
                  >
                    Sell
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                    <Input 
                      type="text" 
                      placeholder="City, Neighborhood, or ZIP" 
                      className="pl-10 bg-white/20 border-white/10 text-white placeholder:text-gray-400" 
                    />
                  </div>
                  <div className="relative w-full md:w-48">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                    <Input 
                      type="text" 
                      placeholder="Max Price" 
                      className="pl-10 bg-white/20 border-white/10 text-white placeholder:text-gray-400" 
                    />
                  </div>
                  <button className="flex items-center justify-center py-2 px-6 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300">
                    <Search className="mr-2" size={18} />
                    Find Homes
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-bolt-blue" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">10k+</p>
                    <p className="text-gray-400 text-sm">Properties</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-bolt-purple" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">8,500+</p>
                    <p className="text-gray-400 text-sm">Closings</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">98%</p>
                    <p className="text-gray-400 text-sm">Satisfaction</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-bolt-blue" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">$2.3B</p>
                    <p className="text-gray-400 text-sm">Sales Volume</p>
                  </div>
                </div>
              </div>
              
              {/* Social proof */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Trusted by leading real estate companies</p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">CENTURY 21</div>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">RE/MAX</div>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">Keller Williams</div>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-8 w-auto text-white font-semibold">Coldwell Banker</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-bolt-darkblue/70 to-bolt-darker/90 border border-white/10 backdrop-blur-md overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Featured Property</h3>
                  
                  <div className="rounded-lg overflow-hidden mb-4 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
                      alt="Luxury Modern Home" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-bolt-blue/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      $1,250,000
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-lg">Luxury Modern Home</h4>
                    <div className="flex items-center text-gray-300">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">123 Sunset Blvd, Beverly Hills, CA</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-lg font-medium">4</div>
                      <div className="text-xs text-gray-400">Bedrooms</div>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-lg font-medium">3.5</div>
                      <div className="text-xs text-gray-400">Bathrooms</div>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-lg font-medium">3,200</div>
                      <div className="text-xs text-gray-400">Sq Ft</div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple">
                    View Property
                    <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-bolt-darkblue/70 to-bolt-darker/90 border border-white/10 backdrop-blur-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">AI-Powered Tools</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-bolt-blue/30 flex items-center justify-center flex-shrink-0">
                        <Home className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Property Matching</p>
                        <p className="text-sm text-gray-400">AI matches you with properties based on your preferences</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-bolt-purple/30 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Market Analysis</p>
                        <p className="text-sm text-gray-400">Real-time market data and pricing recommendations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-bolt-blue/30 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Instant Valuation</p>
                        <p className="text-sm text-gray-400">Get accurate home value estimates in seconds</p>
                      </div>
                    </div>
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
