
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Bot,
  Building,
  BarChart,
  Calendar,
  MessageSquare,
  FileText,
  ArrowRight,
  Users,
  Clock,
  Settings,
  CheckCircle2
} from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: <Bot className="w-6 h-6 text-bolt-blue" />,
      title: "AI Lead Generation",
      description: "Our AI automatically identifies and qualifies potential clients, saving you countless hours of prospecting."
    },
    {
      id: 2,
      icon: <Building className="w-6 h-6 text-bolt-blue" />,
      title: "Property Matching",
      description: "Match clients with perfect properties using our advanced AI algorithms that understand preferences."
    },
    {
      id: 3,
      icon: <BarChart className="w-6 h-6 text-bolt-blue" />,
      title: "Market Analysis",
      description: "Get real-time market insights and pricing recommendations based on comprehensive data analysis."
    },
    {
      id: 4,
      icon: <Calendar className="w-6 h-6 text-bolt-blue" />,
      title: "Smart Scheduling",
      description: "Automate appointment setting and follow-ups with AI-powered calendar management."
    },
    {
      id: 5,
      icon: <MessageSquare className="w-6 h-6 text-bolt-blue" />,
      title: "Automated Communication",
      description: "Engage clients with personalized, timely messages across email, SMS, and social platforms."
    },
    {
      id: 6,
      icon: <FileText className="w-6 h-6 text-bolt-blue" />,
      title: "Document Automation",
      description: "Generate and process real estate documents with AI, reducing paperwork and errors."
    }
  ];

  const [activeFeature, setActiveFeature] = useState<number>(1);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setActiveFeature(id);
        }
      });
    }, options);

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-bolt-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bolt-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bolt-purple/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-4">
            <CheckCircle2 className="w-4 h-4 text-bolt-blue" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-clash font-semibold mb-6">
            Supercharge Your <span className="text-gradient">Real Estate</span> Business
          </h2>
          <p className="text-lg text-gray-300">
            Our AI-powered platform provides all the tools you need to automate your workflow, generate more leads, and close deals faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Feature cards on mobile, Feature list on desktop */}
          <div className="lg:hidden space-y-8">
            {features.map((feature) => (
              <div 
                key={feature.id}
                ref={(el) => (featureRefs.current[feature.id - 1] = el)}
                data-id={feature.id}
                className="glass-card rounded-2xl p-6 space-y-4 hover:border-bolt-blue/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature list on desktop */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              {features.map((feature) => (
                <div 
                  key={feature.id}
                  className={cn(
                    "glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-bolt-blue/30",
                    activeFeature === feature.id ? "border-bolt-blue/50 bg-bolt-darkblue/30" : ""
                  )}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center backdrop-blur-sm transition-all duration-300",
                      activeFeature === feature.id 
                        ? "from-bolt-blue/30 to-bolt-purple/30 shadow-glow-blue" 
                        : "from-bolt-blue/10 to-bolt-purple/10"
                    )}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                      activeFeature === feature.id ? "bg-bolt-blue text-bolt-dark" : "bg-white/10 text-white"
                    )}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature visualization */}
          <div className="relative glass-card rounded-2xl p-1 animate-fade-in">
            <div className="relative bg-gradient-to-br from-bolt-darkblue to-bolt-darker rounded-xl overflow-hidden min-h-[500px] flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(10,255,239,0.15)_0%,transparent_70%)]"></div>
              
              <div className="relative z-10 p-8 space-y-6 w-full max-w-md mx-auto">
                {activeFeature === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-full bg-bolt-blue/20 flex items-center justify-center animate-pulse-soft">
                      <Bot className="w-10 h-10 text-bolt-blue" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center">AI Lead Generation</h3>
                    <div className="space-y-4">
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Users className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Smart Lead Scoring</p>
                          <p className="text-xs text-gray-400">Automatically ranks prospects</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <MessageSquare className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Automated Outreach</p>
                          <p className="text-xs text-gray-400">Personalized communication</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <BarChart className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Conversion Analytics</p>
                          <p className="text-xs text-gray-400">Track lead performance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-full bg-bolt-blue/20 flex items-center justify-center animate-pulse-soft">
                      <Building className="w-10 h-10 text-bolt-blue" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center">Property Matching</h3>
                    <div className="space-y-4">
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <CheckCircle2 className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Preference Analysis</p>
                          <p className="text-xs text-gray-400">Understands client needs</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Building className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Inventory Matching</p>
                          <p className="text-xs text-gray-400">Finds perfect properties</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Settings className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Custom Criteria</p>
                          <p className="text-xs text-gray-400">Personalized search filters</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-full bg-bolt-blue/20 flex items-center justify-center animate-pulse-soft">
                      <BarChart className="w-10 h-10 text-bolt-blue" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center">Market Analysis</h3>
                    <div className="space-y-4">
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <BarChart className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Price Predictions</p>
                          <p className="text-xs text-gray-400">AI-based valuations</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Clock className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Market Timing</p>
                          <p className="text-xs text-gray-400">Optimal listing periods</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <FileText className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Detailed Reports</p>
                          <p className="text-xs text-gray-400">Comprehensive insights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-full bg-bolt-blue/20 flex items-center justify-center animate-pulse-soft">
                      <Calendar className="w-10 h-10 text-bolt-blue" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center">Smart Scheduling</h3>
                    <div className="space-y-4">
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Calendar className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">AI Calendar</p>
                          <p className="text-xs text-gray-400">Intelligent scheduling</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Clock className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Time Optimization</p>
                          <p className="text-xs text-gray-400">Efficient appointment planning</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <MessageSquare className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Auto Reminders</p>
                          <p className="text-xs text-gray-400">Timely notifications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 5 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-full bg-bolt-blue/20 flex items-center justify-center animate-pulse-soft">
                      <MessageSquare className="w-10 h-10 text-bolt-blue" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center">Automated Communication</h3>
                    <div className="space-y-4">
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <MessageSquare className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">AI Copywriting</p>
                          <p className="text-xs text-gray-400">Engaging messages</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Users className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Personalization</p>
                          <p className="text-xs text-gray-400">Client-specific content</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Settings className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Multi-channel</p>
                          <p className="text-xs text-gray-400">Email, SMS, social platforms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 6 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-full bg-bolt-blue/20 flex items-center justify-center animate-pulse-soft">
                      <FileText className="w-10 h-10 text-bolt-blue" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center">Document Automation</h3>
                    <div className="space-y-4">
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <FileText className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Smart Templates</p>
                          <p className="text-xs text-gray-400">Auto-populated forms</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <CheckCircle2 className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">Error Detection</p>
                          <p className="text-xs text-gray-400">Ensures compliance</p>
                        </div>
                      </div>
                      <div className="glass-card rounded-lg p-4 flex items-center space-x-4">
                        <Settings className="w-6 h-6 text-bolt-blue" />
                        <div>
                          <p className="text-sm font-medium">E-Signatures</p>
                          <p className="text-xs text-gray-400">Paperless transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
