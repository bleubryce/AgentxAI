
import { useEffect, useRef } from 'react';

interface HeroBackgroundProps {
  children: React.ReactNode;
  onHeroRefSet: (ref: React.RefObject<HTMLDivElement>) => void;
}

const HeroBackground = ({ children, onHeroRefSet }: HeroBackgroundProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Share heroRef with parent component
    onHeroRefSet(heroRef);
    
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
  }, [onHeroRefSet]);
  
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
      {/* Stronger overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-jet-950/95 via-jet-950/85 to-jet-950/75"></div>
      
      {/* Animated glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-gold-500/15 blur-[150px] animate-pulse-soft animation-delay-1000"></div>
      
      {children}
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-jet-950" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}></div>
    </div>
  );
};

export default HeroBackground;
