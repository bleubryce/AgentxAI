
import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import HomeLayout from "@/components/layouts/HomeLayout";
import { MultiAgentChatPromo } from "@/components/MultiAgentChatPromo";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [revealedSections, setRevealedSections] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();

  // Ensure the component is visible
  useEffect(() => {
    console.log("Index component mounted");
    document.body.style.opacity = '1';
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    // Observe elements with the reveal-animation class
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setRevealedSections(prev => [...prev, entry.target.id]);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal-animation[id]').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HomeLayout>
      <Hero />
      
      <AnimatedSection 
        id="multi-agent-section" 
        revealedSections={revealedSections}
      >
        <MultiAgentChatPromo />
      </AnimatedSection>
      
      <AnimatedSection 
        id="features-section" 
        revealedSections={revealedSections}
      >
        <Features />
      </AnimatedSection>
      
      <AnimatedSection 
        id="cta-section" 
        revealedSections={revealedSections}
      >
        <CallToAction />
      </AnimatedSection>
    </HomeLayout>
  );
};

export default Index;
