
import { useRef } from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';

/**
 * Hero section component
 * Main landing section that displays at the top of the page
 */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const handleHeroRefSet = (ref: React.RefObject<HTMLDivElement>) => {
    heroRef.current = ref.current;
  };
  
  return (
    <div className="relative z-10">
      <HeroBackground onHeroRefSet={handleHeroRefSet}>
        <HeroContent />
      </HeroBackground>
    </div>
  );
};

export default Hero;
