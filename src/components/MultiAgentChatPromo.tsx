
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Bot, MessageSquare, Users, Sparkles, Brain, Cpu, Zap } from 'lucide-react';
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
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  
  // Define our agents with all required properties
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
    },
    { 
      id: 'legal-consultant', 
      name: 'Legal Consultant', 
      emoji: '⚖️', 
      description: 'Provides guidance on real estate legal matters',
      capabilities: ['contract-review', 'legal-compliance', 'regulation-updates'],
      model: 'gpt-4o'
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
  }, [agents.length]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!animationRef.current) return;
      
      const { left, top, width, height } = animationRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = document.querySelectorAll('.agent-orbit');
      elements.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${x * 20 * (i + 1)}px, ${y * 20 * (i + 1)}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const handleAgentHover = (index: number) => {
    setActiveAgent(index);
  };
  
  const handleAgentLeave = () => {
    setActiveAgent(null);
  };
  
  return (
    <section ref={animationRef} className={`py-24 relative transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-jet-800/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-medium">Next-Gen AI Collaboration</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-semibold leading-tight text-shadow">
              <span className="block">Experience</span>
              <span className="text-gradient font-playfair">Multi-Agent Intelligence</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Our revolutionary multi-agent system brings together specialized AI experts that collaborate to deliver unparalleled insights for real estate success.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-clash font-semibold leading-tight text-shadow">
                  <span className="text-white">Transform Your Decision-Making with</span>
                  <span className="text-gradient block mt-2">Collaborative AI Intelligence</span>
                </h3>
                
                <p className="text-lg text-gray-300">
                  Our multi-agent system delivers comprehensive insights no single AI could provide. Watch as specialized AI experts work together in real-time to solve complex real estate challenges.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {agents.map((agent, index) => (
                      <div 
                        key={agent.id} 
                        className={`flex items-center space-x-4 p-4 bg-jet-900/60 rounded-xl border ${activeAgent === index ? 'border-gold-500' : 'border-white/10'} hover:border-gold-500/50 transition-all duration-300 cursor-pointer`}
                        onMouseEnter={() => handleAgentHover(index)}
                        onMouseLeave={handleAgentLeave}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-jet-800 to-jet-900 flex items-center justify-center border border-gold-500/30">
                          <span className="text-xl">{agent.emoji}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gold-500">{agent.name}</h4>
                          <p className="text-sm text-gray-400 line-clamp-1">{agent.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/multi-agent-chat')} 
                  className="premium-button group mt-4 w-full sm:w-auto"
                >
                  Experience Multi-Agent Chat
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <Card className="premium-card overflow-hidden bg-gradient-to-br from-jet-800/70 to-jet-950/90 border border-gold-500/20 backdrop-blur-md scale-animation">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-jet-800/40 flex items-center justify-center border border-gold-500/30">
                            <MessageSquare className="w-5 h-5 text-gold-500" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">Multi-Agent Chat</h3>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 bg-jet-800/50 px-2 py-1 rounded-full border border-gold-500/10">Live Demo</div>
                      </div>
                      
                      <div className="space-y-4 min-h-[320px] bg-jet-900/50 p-4 rounded-lg border border-white/5">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-800 to-jet-900 flex items-center justify-center flex-shrink-0 border border-white/20">
                            <span>👤</span>
                          </div>
                          <div className="bg-jet-800/70 rounded-lg p-3 text-sm border border-white/10">
                            <p>I'm looking for an investment property in Austin with good rental yield potential.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-800 to-jet-900 flex items-center justify-center flex-shrink-0 border border-gold-500/30">
                            <span>📊</span>
                          </div>
                          <div className="bg-jet-800/70 rounded-lg p-3 text-sm border border-gold-500/10">
                            <p>Based on my analysis of the Austin market, the East Downtown area has shown a 12% average annual appreciation with median rental yields of 7.2% over the past 3 years.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-800 to-jet-900 flex items-center justify-center flex-shrink-0 border border-gold-500/30">
                            <span>📈</span>
                          </div>
                          <div className="bg-jet-800/70 rounded-lg p-3 text-sm border border-gold-500/10">
                            <p>Looking at market trends, Austin's East Downtown is experiencing increased demand from young professionals, with rental listings spending 32% less time on market compared to last year.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-800 to-jet-900 flex items-center justify-center flex-shrink-0 border border-gold-500/30">
                            <span>🏠</span>
                          </div>
                          <div className="bg-jet-800/70 rounded-lg p-3 text-sm border border-gold-500/10">
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
                
                {/* Decorative elements */}
                <div className="absolute -top-12 -left-12 w-24 h-24 agent-orbit">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 flex items-center justify-center animate-pulse-soft">
                    <Brain className="w-8 h-8 text-gold-500/70" />
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 w-20 h-20 agent-orbit">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 flex items-center justify-center animate-pulse-soft" style={{animationDelay: '1s'}}>
                    <Cpu className="w-6 h-6 text-gold-500/70" />
                  </div>
                </div>
                
                <div className="absolute top-1/3 -right-10 w-16 h-16 agent-orbit">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 flex items-center justify-center animate-pulse-soft" style={{animationDelay: '0.5s'}}>
                    <Zap className="w-5 h-5 text-gold-500/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated gradient blobs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-[150px] animate-pulse-soft"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-gold-500/5 blur-[120px] animate-pulse-soft"></div>
    </section>
  );
};
