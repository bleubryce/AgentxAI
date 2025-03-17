
import { useRef } from 'react';
import { motion } from 'framer-motion';
import HeroHeading from './HeroHeading';
import HeroFeatureTab from './HeroFeatureTab';
import HeroCard from './HeroCard';

const HeroContent = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  return (
    <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-7/12 space-y-8 animate-fade-in content-overlay">
            <HeroHeading textRef={textRef} />
            <HeroFeatureTab />
          </div>
          
          <div className="lg:w-5/12 animate-fade-in">
            <HeroCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
