
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  children: React.ReactNode;
}

const HeroBackground = ({ children }: HeroBackgroundProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = heroElement.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const moveX = (x - 0.5) * 30;
      const moveY = (y - 0.5) * 30;
      
      // Apply parallax effect to background
      heroElement.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
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
        backgroundImage: "url('https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2664&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Enhanced futuristic overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-jet-950/90 via-jet-950/80 to-jet-950/70"></div>
      
      {/* Animated glowing orbs with ocean highlights */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[150px]"
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-green-400/15 blur-[120px]"
        animate={{ 
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      {/* Cyber grid lines for futuristic effect */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
             backgroundSize: '50px 50px' 
           }}>
      </div>
      
      {children}
      
      {/* Futuristic bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-jet-950" 
           style={{ clipPath: 'ellipse(70% 100% at 50% 100%)' }}>
      </div>
    </div>
  );
};

export default HeroBackground;
