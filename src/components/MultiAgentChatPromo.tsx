
import React, { useEffect, useState } from 'react';
import { ArrowRight, Bot, Sparkles, Zap, Brain, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AgentTypingIndicator } from '@/components/multiagent/AgentTypingIndicator';
import { AvailableAgent } from '@/types/agent';

export const MultiAgentChatPromo = () => {
  const navigate = useNavigate();
  const [currentAgent, setCurrentAgent] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  
  const agents: AvailableAgent[] = [
    { 
      id: 'data-analyst', 
      name: 'Data Analyst', 
      emoji: '📊', 
      description: 'Analyzes real estate market data and trends',
      capabilities: ['data-analysis', 'market-trends', 'visualization'],
      model: 'gpt-4o'
    },
    { 
      id: 'marketing-expert', 
      name: 'Marketing Expert', 
      emoji: '📈', 
      description: 'Provides marketing strategies for real estate',
      capabilities: ['content-creation', 'audience-targeting', 'campaign-optimization'],
      model: 'gpt-4o'
    },
    { 
      id: 'property-advisor', 
      name: 'Property Advisor', 
      emoji: '🏠', 
      description: 'Offers insights on property selection and investment',
      capabilities: ['property-valuation', 'investment-analysis', 'location-assessment'],
      model: 'gpt-4o'
    }
  ];
  
  const chatMessages = [
    {
      sender: 'user',
      text: 'I'm looking for an investment property in Austin with good rental yield potential.',
      icon: '👤'
    },
    {
      sender: 'data-analyst',
      text: 'Based on my analysis of the Austin market, the East Downtown area has shown a 12% average annual appreciation with median rental yields of 7.2% over the past 3 years.',
      icon: '📊'
    },
    {
      sender: 'marketing-expert',
      text: 'Looking at market trends, Austin's East Downtown is experiencing increased demand from young professionals, with rental listings spending 32% less time on market compared to last year.',
      icon: '📈'
    },
    {
      sender: 'property-advisor',
      text: 'I can recommend 3 specific properties in East Downtown that match your investment criteria, with cap rates ranging from 6.8% to 8.2%. Would you like me to provide more details on these options?',
      icon: '🏠'
    }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const typingTimer = setInterval(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setCurrentAgent((prev) => (prev + 1) % agents.length);
      }, 3000);
    }, 5000);
    
    return () => clearInterval(typingTimer);
  }, []);
  
  return (
    <section className={`relative min-h-screen py-20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} overflow-hidden bg-gradient-to-b from-bolt-darker via-bolt-darkblue/50 to-bolt-darker`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-bolt-blue/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-bolt-purple/5 blur-[80px]"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-bolt-blue/20 to-transparent"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Sparkles className="text-bolt-blue w-8 h-8" />
      </div>
      <div className="absolute bottom-40 right-20 animate-float opacity-20">
        <Network className="text-bolt-purple w-12 h-12" />
      </div>
      <div className="absolute top-1/2 left-5 animate-float opacity-20">
        <Brain className="text-bolt-blue w-10 h-10" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hexagonal section header */}
          <div className="relative flex justify-center mb-16">
            <div className="absolute w-24 h-24 bg-bolt-blue/10 rotate-45 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-4 py-1 rounded-full border border-bolt-blue/30 bg-bolt-darker mb-4">
                <Zap className="w-4 h-4 mr-2 text-bolt-blue" />
                <span className="text-sm font-medium">AI Collaboration</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold leading-none mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue via-white to-bolt-purple">
                  AI Symphony
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Multiple specialized AI agents working in harmony to solve your complex real estate challenges
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Agent visualization - Left side */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-bolt-darker/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 overflow-hidden">
                {/* Central agent hub visualization */}
                <div className="relative flex justify-center items-center h-[400px]">
                  {/* Central node */}
                  <div className="absolute z-20 w-20 h-20 rounded-full bg-gradient-to-br from-bolt-blue to-bolt-purple p-1">
                    <div className="w-full h-full rounded-full bg-bolt-darker flex items-center justify-center">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Connecting lines */}
                  {agents.map((agent, index) => {
                    const angle = (index * (360 / agents.length)) * (Math.PI / 180);
                    const x = Math.cos(angle) * 120;
                    const y = Math.sin(angle) * 120;
                    
                    return (
                      <React.Fragment key={agent.id}>
                        <div 
                          className="absolute w-px bg-gradient-to-b from-bolt-blue/30 to-bolt-purple/30" 
                          style={{
                            left: 'calc(50% + 0px)',
                            top: 'calc(50% + 0px)',
                            height: '120px',
                            transformOrigin: 'top',
                            transform: `rotate(${angle + Math.PI/2}rad)`,
                          }}
                        ></div>
                      </React.Fragment>
                    );
                  })}
                  
                  {/* Agent nodes */}
                  {agents.map((agent, index) => {
                    const angle = (index * (360 / agents.length)) * (Math.PI / 180);
                    const x = Math.cos(angle) * 120;
                    const y = Math.sin(angle) * 120;
                    
                    const isSelected = selectedAgentIndex === index;
                    
                    return (
                      <div 
                        key={agent.id}
                        className={`absolute z-10 flex items-center justify-center w-16 h-16 rounded-full cursor-pointer transition-all duration-500 ${
                          isSelected ? 'scale-110 bg-gradient-to-br from-bolt-blue to-bolt-purple' : 'bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20'
                        }`}
                        style={{
                          left: `calc(50% + ${x}px - 30px)`,
                          top: `calc(50% + ${y}px - 30px)`,
                        }}
                        onClick={() => setSelectedAgentIndex(index)}
                      >
                        <div className={`w-14 h-14 rounded-full ${isSelected ? 'bg-bolt-darker/90' : 'bg-bolt-darker/50'} flex items-center justify-center`}>
                          <span className="text-xl">{agent.emoji}</span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Pulse animations */}
                  <div className="absolute w-40 h-40 rounded-full bg-bolt-blue/5 animate-pulse-soft"></div>
                  <div className="absolute w-80 h-80 rounded-full bg-bolt-purple/5 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute w-120 h-120 rounded-full bg-bolt-blue/3 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                </div>
                
                {/* Selected agent info */}
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-semibold text-bolt-blue mb-2">{agents[selectedAgentIndex].name}</h3>
                  <p className="text-gray-300">{agents[selectedAgentIndex].description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {agents[selectedAgentIndex].capabilities.map((capability) => (
                      <span 
                        key={capability} 
                        className="inline-block px-3 py-1 text-xs rounded-full bg-bolt-blue/10 border border-bolt-blue/20"
                      >
                        {capability.split('-').join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat simulation - Right side */}
            <div className="lg:col-span-7">
              <div className="relative bg-gradient-to-br from-bolt-darkblue/50 to-bolt-darker/90 rounded-2xl border border-white/10 p-6 overflow-hidden backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      {agents.map((agent, index) => (
                        <div key={agent.id} className="w-8 h-8 rounded-full bg-bolt-darker flex items-center justify-center border-2 border-bolt-darker">
                          <span className="text-sm">{agent.emoji}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Multi-Agent Collaboration</h3>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-bolt-blue/10 text-xs border border-bolt-blue/20">
                    Live Preview
                  </div>
                </div>
                
                <div className="space-y-4 p-4 bg-bolt-darker/70 rounded-xl border border-white/5 h-[400px] overflow-y-auto">
                  {chatMessages.map((message, index) => {
                    const agent = agents.find(a => a.id === message.sender);
                    const isUser = message.sender === 'user';
                    
                    return (
                      <div 
                        key={index}
                        className={`flex items-start space-x-3 ${isUser ? '' : 'animate-fade-in'}`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${
                          isUser 
                            ? 'bg-white/10' 
                            : 'bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20'
                        }`}>
                          <span>{message.icon}</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-sm backdrop-blur-sm flex-1">
                          {!isUser && (
                            <div className="text-xs text-bolt-blue mb-1">{agent?.name}</div>
                          )}
                          <p>{message.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <AgentTypingIndicator agent={agents[currentAgent]} />
                  )}
                </div>
                
                <div className="flex mt-6">
                  <div className="w-full relative">
                    <input 
                      type="text" 
                      placeholder="Ask the AI agents..." 
                      className="w-full bg-bolt-darker/70 border border-white/10 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-bolt-blue/50"
                      disabled
                    />
                    <Button className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple hover:opacity-90 transition-opacity" disabled>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center p-5 bg-bolt-blue/5 backdrop-blur-sm rounded-xl border border-bolt-blue/10">
                <h3 className="text-2xl font-clash font-semibold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue to-bolt-purple">
                    Experience the full power of collaborative AI
                  </span>
                </h3>
                <p className="text-gray-300 mb-6">
                  Tap into the collective intelligence of specialized AI agents working together to solve your real estate challenges
                </p>
                <Button 
                  onClick={() => navigate('/multi-agent-chat')} 
                  className="bg-gradient-to-r from-bolt-blue to-bolt-purple hover:opacity-90 transition-opacity group"
                >
                  Launch Multi-Agent Experience
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
