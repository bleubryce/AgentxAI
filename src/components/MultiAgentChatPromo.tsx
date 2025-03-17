
import React, { useEffect, useState } from 'react';
import { ArrowRight, Bot, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AgentTypingIndicator } from '@/components/multiagent/AgentTypingIndicator';

export const MultiAgentChatPromo = () => {
  const navigate = useNavigate();
  const [currentAgent, setCurrentAgent] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const agents = [
    { id: 'data-analyst', name: 'Data Analyst', emoji: '📊', color: 'text-green-400' },
    { id: 'marketing-expert', name: 'Marketing Expert', emoji: '📈', color: 'text-blue-400' },
    { id: 'property-advisor', name: 'Property Advisor', emoji: '🏠', color: 'text-purple-400' }
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
    <section className={`py-24 relative transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-4">
              <Users className="w-4 h-4 text-bolt-blue" />
              <span className="text-sm font-medium">Multi-Agent Chat</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-semibold leading-tight text-shadow">
              <span className="block">Let AI Agents Work</span>
              <span className="text-gradient">Together For You</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Our innovative multi-agent system combines specialized AI experts that collaborate to solve complex real estate challenges.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2">
              <Card className="premium-card overflow-hidden bg-gradient-to-br from-bolt-darkblue/70 to-bolt-darker/90 border border-white/10 backdrop-blur-md scale-animation">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-bolt-blue" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Multi-Agent Chat</h3>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Live Demo</div>
                    </div>
                    
                    <div className="space-y-4 min-h-[300px] bg-bolt-darker/50 p-4 rounded-lg border border-white/5">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-600/30 flex items-center justify-center flex-shrink-0">
                          <span>👤</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-sm">
                          <p>I'm looking for an investment property in Austin with good rental yield potential.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center flex-shrink-0">
                          <span>📊</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-sm">
                          <p>Based on my analysis of the Austin market, the East Downtown area has shown a 12% average annual appreciation with median rental yields of 7.2% over the past 3 years.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0">
                          <span>📈</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-sm">
                          <p>Looking at market trends, Austin's East Downtown is experiencing increased demand from young professionals, with rental listings spending 32% less time on market compared to last year.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-fuchsia-600/30 flex items-center justify-center flex-shrink-0">
                          <span>🏠</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-sm">
                          <p>I can recommend 3 specific properties in East Downtown that match your investment criteria, with cap rates ranging from 6.8% to 8.2%. Would you like me to provide more details on these options?</p>
                        </div>
                      </div>
                      
                      {isTyping && (
                        <AgentTypingIndicator agent={agents[currentAgent]} />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <h3 className="text-2xl md:text-3xl font-clash font-semibold leading-tight text-shadow">
                Supercharge Your Real Estate Decisions with
                <span className="text-gradient block mt-2">Collaborative AI Intelligence</span>
              </h3>
              
              <p className="text-lg text-gray-300">
                Our multi-agent system brings together specialized AI experts that collaborate to solve your most complex real estate challenges, providing comprehensive insights no single AI could deliver.
              </p>
              
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                      <span className="text-xl">{agent.emoji}</span>
                    </div>
                    <div>
                      <h4 className={`font-medium ${agent.color}`}>{agent.name}</h4>
                      <p className="text-sm text-gray-400">Specialized in real estate {agent.id.replace('-', ' ')} insights</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => navigate('/multi-agent-chat')} 
                className="premium-button group mt-4"
              >
                Try Multi-Agent Chat
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated gradient blob */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-bolt-purple/10 blur-[150px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-bolt-blue/10 blur-[120px] animate-pulse-soft"></div>
    </section>
  );
};
