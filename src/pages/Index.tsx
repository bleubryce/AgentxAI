
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
    // Update meta tags for SEO
    document.title = "AgentX AI - AI-Powered Real Estate Automation";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Transform your real estate business with AgentX AI. Our AI-powered platform automates workflows, generates qualified leads, and helps you close deals faster.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Transform your real estate business with AgentX AI. Our AI-powered platform automates workflows, generates qualified leads, and helps you close deals faster.";
      document.head.appendChild(meta);
    }
    
    // Add keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "AI real estate, property AI, real estate automation, AI lead generation, real estate chatbot, property matching AI, real estate technology");
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "AI real estate, property AI, real estate automation, AI lead generation, real estate chatbot, property matching AI, real estate technology";
      document.head.appendChild(meta);
    }

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'AgentX AI - AI-Powered Real Estate Automation' },
      { property: 'og:description', content: 'Transform your real estate business with AgentX AI. Our AI-powered platform automates workflows, generates qualified leads, and helps you close deals faster.' },
      { property: 'og:image', content: '/og-image.png' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', tag.content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        ogTag.setAttribute('content', tag.content);
        document.head.appendChild(ogTag);
      }
    });

    // Initialize auth listener
    createAuthListener();
    
    // Preload analytics data
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
