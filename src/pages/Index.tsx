import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { MultiAgentChatPromo } from "@/components/MultiAgentChatPromo";

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>AgentX AI - Powering the Future of AI Agents</title>
        <meta name="description" content="Explore the next generation of AI agents with AgentX. Automate tasks, generate leads, and more." />
      </Helmet>
      
      <Hero />
      <MultiAgentChatPromo />
      <Features />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Index;
