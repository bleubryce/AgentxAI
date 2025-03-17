
import { Link } from "react-router-dom";
import { ArrowRight, Bot, MessageSquare } from "lucide-react";

export const MultiAgentChatPromo = () => {
  return (
    <div className="my-16 px-4 md:px-8 py-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <MessageSquare className="h-8 w-8" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Try Our New Multi-Agent Chat Interface
        </h2>
        
        <p className="text-lg mb-8 text-slate-600 dark:text-slate-300">
          Chat with multiple specialized AI agents in a unified interface. Choose the right
          agent for your specific needs or switch between them seamlessly.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
            <Bot className="h-5 w-5 text-blue-500" />
            <span>AutoGPT</span>
          </div>
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
            <Bot className="h-5 w-5 text-green-500" />
            <span>BabyAGI</span>
          </div>
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
            <Bot className="h-5 w-5 text-purple-500" />
            <span>AgentGPT</span>
          </div>
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
            <Bot className="h-5 w-5 text-amber-500" />
            <span>Research Agent</span>
          </div>
        </div>
        
        <Link 
          to="/multi-agent-chat" 
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <span>Try Multi-Agent Chat</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
