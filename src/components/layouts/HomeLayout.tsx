
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionModal from "@/components/SubscriptionModal";
import GoldParticles from "@/components/particles/GoldParticles";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

interface HomeLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ 
  children, 
  title = "AgentX AI - Powering the Future of AI Agents in Real Estate",
  description = "Explore the next generation of AI agents with AgentX. Automate real estate tasks, generate qualified leads, and unlock property insights with cutting-edge artificial intelligence.",
  keywords = "real estate AI, property AI, artificial intelligence real estate, AI agents, lead generation"
}) => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Check hash for subscription modal
  useEffect(() => {
    // Check if user came from a #subscribe link
    if (window.location.hash === '#subscribe' || window.location.hash === '#signup') {
      setShowSubscriptionModal(true);
    }
    
    // Track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Handle hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#subscribe' || window.location.hash === '#signup') {
        setShowSubscriptionModal(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content="AgentX AI - AI-Powered Real Estate Solutions" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agentx-ai.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <main className="overflow-hidden relative">
        {/* Navbar */}
        <Navbar />
        
        {/* Gold Particles */}
        <GoldParticles />
        
        {/* Scroll Indicator */}
        <ScrollIndicator visible={scrollY < 100} />
        
        {/* Main content */}
        {children}
        
        {/* Footer */}
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

export default HomeLayout;
