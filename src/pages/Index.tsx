
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { MultiAgentChatPromo } from "@/components/MultiAgentChatPromo";

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [revealedSections, setRevealedSections] = useState<string[]>([]);

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
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>AgentX AI - Powering the Future of AI Agents in Real Estate</title>
        <meta name="description" content="Explore the next generation of AI agents with AgentX. Automate real estate tasks, generate qualified leads, and unlock property insights with cutting-edge artificial intelligence." />
        <meta name="keywords" content="real estate AI, property AI, artificial intelligence real estate, AI agents, lead generation" />
        <meta property="og:title" content="AgentX AI - AI-Powered Real Estate Solutions" />
        <meta property="og:description" content="Revolutionize your real estate business with AI agents that automate tasks, generate leads, and provide deep market insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agentx-ai.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <main className="overflow-hidden">
        <Hero />
        
        <div id="multi-agent-section" className={`reveal-animation ${revealedSections.includes('multi-agent-section') ? 'revealed' : ''}`}>
          <MultiAgentChatPromo />
        </div>
        
        <div id="features-section" className={`reveal-animation ${revealedSections.includes('features-section') ? 'revealed' : ''}`}>
          <Features />
        </div>
        
        <div id="cta-section" className={`reveal-animation ${revealedSections.includes('cta-section') ? 'revealed' : ''}`}>
          <CallToAction />
        </div>
        
        <Footer />
      </main>
    </>
  );
};

export default Index;
