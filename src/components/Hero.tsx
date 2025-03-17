
import { useRef } from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';

/**
 * Hero section component
 * Main landing section that displays at the top of the page
 */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <HeroBackground>
        <HeroContent />
      </HeroBackground>
    </div>
  );
};

export default Hero;
