
import { useRef } from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const handleHeroRefSet = (ref: React.RefObject<HTMLDivElement>) => {
    heroRef.current = ref.current;
  };
  
  return (
    <HeroBackground onHeroRefSet={handleHeroRefSet}>
      <HeroContent />
    </HeroBackground>
  );
};

export default Hero;
