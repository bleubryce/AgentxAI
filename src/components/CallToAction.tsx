
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bot, Building, Calendar, CheckCircle, XCircle, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth';
import { AIService, ChatMessage as AIChatMessage } from '@/services/api';
import AuthModal from './AuthModal';

type ChatMessage = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const CallToAction = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // AI chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your AI assistant. How can I help you with AgentX AI today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Auth state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const cachedResponses = useRef<Record<string, string>>({});
  const conversationId = useRef<string | undefined>(undefined);
  
  // Check authentication status on mount
  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());
    // Set up auth listener
    const handleStorageChange = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
  
  // Pre-fill form if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const user = AuthService.getCurrentUser();
      if (user) {
        setName(user.name || '');
        setEmail(user.email || '');
      }
    }
  }, [isAuthenticated]);
  
  // Generate lead with AI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !company) return;
    
    setIsSubmitting(true);
    
    try {
      // If not authenticated, show auth modal
      if (!isAuthenticated) {
        setShowAuthModal(true);
        setIsSubmitting(false);
        return;
      }
      
      // Call AI lead generation API
      const response = await AIService.generateLead({
        name,
        email,
        company
      });
      
      if (response.success && response.data) {
        // Success handling
        toast({
          title: "Lead Generated",
          description: `Your trial request has been processed with score: ${response.data.score}/100`,
        });
        
        setSuccess(true);
        
        // Reset form after delay
        setTimeout(() => {
          setName('');
          setEmail('');
          setCompany('');
          setSuccess(false);
        }, 3000);
      } else {
        // Error handling
        toast({
          title: "Error",
          description: response.error || "Failed to process your request",
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error('Error generating lead:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Send chat message to AI
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    // Add user message to chat
    const userMessageId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: userMessageId,
      text: currentMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);
    
    try {
      // Check cache for identical queries
      const lowerCaseMessage = currentMessage.toLowerCase();
      if (cachedResponses.current[lowerCaseMessage]) {
        // Short delay to simulate thinking
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Add cached response
        const botMessageId = (Date.now() + 1).toString();
        const botMessage: ChatMessage = {
          id: botMessageId,
          text: cachedResponses.current[lowerCaseMessage],
          isBot: true,
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        return;
      }
      
      // Call AI chat API
      const response = await AIService.getChatResponse(currentMessage, conversationId.current);
      
      if (response.success && response.data) {
        // Store conversation ID for context
        if (response.data.id && !conversationId.current) {
          conversationId.current = response.data.id;
        }
        
        // Cache the response
        cachedResponses.current[lowerCaseMessage] = response.data.text;
        
        // Add bot response
        const botMessageId = (Date.now() + 1).toString();
        const botMessage: ChatMessage = {
          id: botMessageId,
          text: response.data.text,
          isBot: true,
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, botMessage]);
      } else {
        // Handle error
        const errorMessageId = (Date.now() + 1).toString();
        const errorMessage: ChatMessage = {
          id: errorMessageId,
          text: 'Sorry, I encountered an error. Please try again.',
          isBot: true,
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessageId = (Date.now() + 1).toString();
      const errorMessage: ChatMessage = {
        id: errorMessageId,
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Use existing UI template but with our new service functions
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-bolt-dark to-bolt-darker"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bolt-blue/5 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bolt-purple/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Bot className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">Try AgentX AI Today</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-clash font-semibold leading-tight">
                Ready to <span className="text-gradient">Transform</span> Your Real Estate Business?
              </h2>
              
              <p className="text-lg text-gray-300 max-w-xl">
                Start your 7-day trial today and experience the power of AI-driven real estate automation. Credit card required.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Limited access to main features during trial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Basic lead generation and property matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Online onboarding and support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Cancel anytime before trial ends</span>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href="#signup" 
                  className="button-glow inline-flex items-center justify-center px-8 py-4 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                >
                  <span>Start 7-Day Trial</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-5/12 animate-fade-in">
              <div className="glass-card rounded-2xl p-1 relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-bolt-blue/10 blur-[30px]"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-bolt-purple/10 blur-[30px]"></div>
                
                <div className="relative bg-gradient-to-br from-bolt-darkblue to-bolt-darker rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(10,255,239,0.15)_0%,transparent_70%)]"></div>
                  
                  <div className="relative z-10 p-8 space-y-6">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold">Get Started</h3>
                      
                      {success ? (
                        <div className="text-center py-8 space-y-4">
                          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                          </div>
                          <h4 className="text-xl font-medium">Trial Request Sent!</h4>
                          <p className="text-gray-300">
                            Our AI has processed your information. Check your email for next steps.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Smith"
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium mb-2">Company / Brokerage</label>
                            <input
                              type="text"
                              id="company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Your Real Estate Company"
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                          
                          <div className="pt-2">
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className={cn(
                                "button-glow w-full px-6 py-4 bg-blue-purple-gradient rounded-full text-white font-medium transition-all duration-300",
                                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-glow-blue"
                              )}
                            >
                              {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing
                                </span>
                              ) : (
                                <span>Start Your 7-Day Trial</span>
                              )}
                            </button>
                            <p className="text-center text-sm text-gray-400 mt-4">
                              Credit card required. 7-day limited feature trial.
                            </p>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Bubble Button */}
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center shadow-lg hover:shadow-glow-blue transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </button>
        )}
        
        {/* Chat Panel */}
        {chatOpen && (
          <div className="w-80 sm:w-96 h-[500px] bg-bolt-darker border border-white/10 rounded-2xl shadow-xl flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">AgentX AI Assistant</h3>
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.isBot 
                        ? 'bg-bolt-darkblue/50 border border-bolt-blue/20 rounded-tl-none' 
                        : 'bg-bolt-purple/20 border border-bolt-purple/20 rounded-tr-none'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <Bot className="w-5 h-5 text-bolt-blue mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!message.isBot && (
                        <User className="w-5 h-5 text-bolt-purple mt-0.5 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-xl bg-bolt-darkblue/50 border border-bolt-blue/20 rounded-tl-none">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible div to scroll to */}
              <div ref={chatEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about features, pricing, etc..."
                  className="flex-1 py-2 px-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-bolt-blue/50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || !currentMessage.trim()}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentMessage.trim() && !isTyping
                      ? "bg-gradient-to-r from-bolt-blue to-bolt-purple"
                      : "bg-white/10 cursor-not-allowed"
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                AI responses powered by advanced natural language processing
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-bolt-dark" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}></div>
    </section>
  );
};

export default CallToAction;
