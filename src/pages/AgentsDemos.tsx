
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LeadGenerationDemo from "@/components/demos/LeadGenerationDemo";
import DocumentManagementDemo from "@/components/demos/DocumentManagementDemo";
import PropertyMatchingDemo from "@/components/demos/PropertyMatchingDemo";
import ClientCommunicationDemo from "@/components/demos/ClientCommunicationDemo";
import ContentCreationDemo from "@/components/demos/ContentCreationDemo";
import { Helmet } from "react-helmet";

const AgentsDemos = () => {
  const [activeTab, setActiveTab] = useState("lead-generation");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AI Agent Demos | AgentX AI";
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bolt-dark to-bolt-darker">
      <Helmet>
        <title>AI Agent Demos | AgentX AI</title>
        <meta name="description" content="Experience our AI agents in action with interactive demos for lead generation, document management, property matching, client communication, and content creation." />
      </Helmet>
      
      <Navbar />
      
      <motion.main 
        className="flex-grow container mx-auto px-4 py-12"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            AI Agent <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Demos</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-white/70 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Experience the power of our AI agents designed specifically for real estate professionals.
            Each agent is trained to handle specific tasks to boost your productivity.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              onClick={() => navigate("/agents")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              Back to Agents Overview
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          variants={tabVariants}
          initial="hidden"
          animate="visible"
        >
          <Tabs defaultValue="lead-generation" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 bg-white/5 p-1 rounded-lg">
              <TabsTrigger value="lead-generation" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Lead Generation
              </TabsTrigger>
              <TabsTrigger value="document-management" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Document Management
              </TabsTrigger>
              <TabsTrigger value="property-matching" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Property Matching
              </TabsTrigger>
              <TabsTrigger value="client-communication" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Client Communication
              </TabsTrigger>
              <TabsTrigger value="content-creation" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Content Creation
              </TabsTrigger>
            </TabsList>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {activeTab === "lead-generation" && "Lead Generation Agent"}
                  {activeTab === "document-management" && "Document Management Agent"}
                  {activeTab === "property-matching" && "Property Matching Agent"}
                  {activeTab === "client-communication" && "Client Communication Agent"}
                  {activeTab === "content-creation" && "Content Creation Agent"}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {activeTab === "lead-generation" && "Automatically qualify leads and prioritize follow-ups based on conversion potential."}
                  {activeTab === "document-management" && "Analyze and identify issues in real estate contracts and documents."}
                  {activeTab === "property-matching" && "Match buyer preferences with available properties using AI-powered recommendations."}
                  {activeTab === "client-communication" && "Generate personalized client updates and nurture campaigns."}
                  {activeTab === "content-creation" && "Create professional marketing content for properties and social media."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="lead-generation" className="mt-0">
                  <LeadGenerationDemo />
                </TabsContent>
                <TabsContent value="document-management" className="mt-0">
                  <DocumentManagementDemo />
                </TabsContent>
                <TabsContent value="property-matching" className="mt-0">
                  <PropertyMatchingDemo />
                </TabsContent>
                <TabsContent value="client-communication" className="mt-0">
                  <ClientCommunicationDemo />
                </TabsContent>
                <TabsContent value="content-creation" className="mt-0">
                  <ContentCreationDemo />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default AgentsDemos;
