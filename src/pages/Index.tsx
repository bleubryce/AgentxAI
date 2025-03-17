import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { MultiAgentChatPromo } from "@/components/MultiAgentChatPromo";
import Navbar from "@/components/Navbar";
import SubscriptionModal from "@/components/SubscriptionModal";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [revealedSections, setRevealedSections] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { isAuthenticated } = useAuth();

  // Ensure the component is visible
  useEffect(() => {
    console.log("Index component mounted");
    document.body.style.opacity = '1';
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user came from a #subscribe link
    if (window.location.hash === '#subscribe' || window.location.hash === '#signup') {
      setShowSubscriptionModal(true);
    }
    
    // Track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
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
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#subscribe' || window.location.hash === '#signup') {
        setShowSubscriptionModal(true);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Generate particles for luxury effect
  const renderGoldParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particles.push(
        <motion.div 
          key={i}
          className="particle" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.7, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
          }}
        />
      );
    }
    return particles;
  };

  // Generate scrolling decoration
  const renderScrollIndicator = () => {
    if (scrollY < 100) {
      return (
        <motion.div 
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <p className="text-white/60 text-sm mb-2">Scroll Down</p>
          <motion.div 
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
            animate={{ 
              boxShadow: ["0 0 0 rgba(255,192,0,0)", "0 0 10px rgba(255,192,0,0.5)", "0 0 0 rgba(255,192,0,0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-gold-500 rounded-full"
              animate={{ y: [0, 13, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      );
    }
    return null;
  };

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
      
      <main className="overflow-hidden relative">
        {/* Navbar */}
        <Navbar />
        
        {/* Gold Particles */}
        <div className="fixed inset-0 pointer-events-none z-10">
          {renderGoldParticles()}
        </div>
        
        {/* Scroll Indicator */}
        {renderScrollIndicator()}
        
        <Hero />
        
        <motion.div 
          id="multi-agent-section" 
          className={`reveal-animation ${revealedSections.includes('multi-agent-section') ? 'revealed' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <MultiAgentChatPromo />
        </motion.div>
        
        <motion.div 
          id="features-section" 
          className={`reveal-animation ${revealedSections.includes('features-section') ? 'revealed' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Features />
        </motion.div>
        
        <motion.div 
          id="cta-section" 
          className={`reveal-animation ${revealedSections.includes('cta-section') ? 'revealed' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <CallToAction />
        </motion.div>
        
        <Footer />
        
        {/* Subscription Modal */}
        <SubscriptionModal 
          isOpen={showSubscriptionModal} 
          onClose={() => setShowSubscriptionModal(false)} 
        />
      </main>
    </>
  );
};

export default Index;
