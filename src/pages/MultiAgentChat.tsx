
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AgentChatInterface } from "@/components/multiagent/AgentChatInterface";
import { toast } from "@/hooks/use-toast";

const MultiAgentChat = () => {
  useEffect(() => {
    // Notify the user that this is a demo interface
    toast({
      title: "Demo Mode",
      description: "This is a demo of the multi-agent chat interface. Backend integration will be required for full functionality.",
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <Helmet>
        <title>Multi-Agent Chat | AgentX AI</title>
        <meta name="description" content="Interact with multiple AI agents through a unified chat interface" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Multi-Agent Chat Interface
        </h1>
        
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground text-center mb-8">
            Interact with multiple autonomous AI agents through our unified chat interface.
            Each agent has different capabilities and specializations.
          </p>
          
          <AgentChatInterface />
        </div>
      </div>
    </div>
  );
};

export default MultiAgentChat;
