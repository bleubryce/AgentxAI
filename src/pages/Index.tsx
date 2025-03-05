
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createAuthListener } from "@/services/auth";
import { AIService } from "@/services/api";

const Index = () => {
  useEffect(() => {
    // Page title and metadata
    document.title = "AgentX AI - AI-Powered Real Estate Automation";
    
    // Add meta description for AI-related keywords
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Leverage AI-powered tools to automate real estate workflows, generate qualified leads, and close deals faster with AgentX AI platform.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Leverage AI-powered tools to automate real estate workflows, generate qualified leads, and close deals faster with AgentX AI platform.";
      document.head.appendChild(meta);
    }
    
    // Add keywords for SEO
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "AI real estate, property AI, real estate automation, AI lead generation, real estate chatbot, property matching AI");
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "AI real estate, property AI, real estate automation, AI lead generation, real estate chatbot, property matching AI";
      document.head.appendChild(meta);
    }

    // Initialize auth listener
    createAuthListener();
    
    // Preload analytics data to improve performance when users navigate to dashboard
    if (localStorage.getItem('auth_token')) {
      AIService.getAnalytics().catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
