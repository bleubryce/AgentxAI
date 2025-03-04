
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  CheckCircle2,
  Zap,
  BrainCircuit,
  LineChart
} from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  caseStudy?: {
    company: string;
    result: string;
    metric: string;
    quote: string;
    author: string;
    role: string;
  };
}

const Features = () => {
  // Feature data
  const features: Feature[] = [
    {
      id: 1,
      icon: <Bot className="w-6 h-6 text-bolt-blue" />,
      title: "AI Chatbot Assistant",
      description: "Our AI chatbot engages potential clients, qualifies leads, and provides instant responses 24/7, ensuring you never miss an opportunity.",
      details: [
        {
          icon: <BrainCircuit className="w-5 h-5 text-bolt-blue" />,
          title: "Smart Lead Qualification",
          description: "Automatically identifies high-value prospects based on conversation patterns and intent analysis."
        },
        {
          icon: <MessageSquare className="w-5 h-5 text-bolt-blue" />,
          title: "Personalized Responses",
          description: "Tailors messaging based on client preferences, behavior history, and engagement patterns."
        },
        {
          icon: <Clock className="w-5 h-5 text-bolt-blue" />,
          title: "24/7 Availability",
          description: "Provides instant responses at any time, capturing leads even while you sleep."
        }
      ],
      caseStudy: {
        company: "Premier Properties",
        result: "Lead conversion increase",
        metric: "47%",
        quote: "The AgentX AI chatbot transformed our lead capture process. We're now converting nearly twice as many website visitors into qualified leads.",
        author: "Sarah Johnson",
        role: "Marketing Director"
      }
    },
    {
      id: 2,
      icon: <Building className="w-6 h-6 text-bolt-blue" />,
      title: "Property Matching",
      description: "Match clients with perfect properties using our advanced AI algorithms that understand preferences and predict satisfaction.",
      details: [
        {
          icon: <CheckCircle2 className="w-5 h-5 text-bolt-blue" />,
          title: "Preference Analysis",
          description: "Analyzes client communications to build detailed preference profiles that evolve over time."
        },
        {
          icon: <Building className="w-5 h-5 text-bolt-blue" />,
          title: "Inventory Matching",
          description: "Algorithmically ranks available properties against client preferences for perfect matches."
        },
        {
          icon: <Settings className="w-5 h-5 text-bolt-blue" />,
          title: "Custom Criteria",
          description: "Allows for detailed search parameters beyond standard filters to find hidden gems."
        }
      ],
      caseStudy: {
        company: "Luxury Homes Group",
        result: "Time savings per client",
        metric: "6hrs",
        quote: "The property matching algorithm consistently recommends properties our clients love. It's like having a mind-reading assistant who knows exactly what each client wants.",
        author: "Michael Chen",
        role: "Senior Agent"
      }
    },
    {
      id: 3,
      icon: <BarChart className="w-6 h-6 text-bolt-blue" />,
      title: "Market Analysis",
      description: "Get real-time market insights and pricing recommendations based on comprehensive data analysis and predictive modeling.",
      details: [
        {
          icon: <LineChart className="w-5 h-5 text-bolt-blue" />,
          title: "Price Predictions",
          description: "Uses historical data and market trends to suggest optimal listing prices for maximum value."
        },
        {
          icon: <Clock className="w-5 h-5 text-bolt-blue" />,
          title: "Market Timing",
          description: "Identifies the best times to list properties based on seasonal trends and market conditions."
        },
        {
          icon: <FileText className="w-5 h-5 text-bolt-blue" />,
          title: "Detailed Reports",
          description: "Generates comprehensive market analysis reports for clients with visualizations and insights."
        }
      ],
      caseStudy: {
        company: "Metro Realty Partners",
        result: "Higher sale prices",
        metric: "8.3%",
        quote: "The market analysis tools have given us a competitive edge. Our listings sell faster and at better prices because we can precisely position them in the current market.",
        author: "David Rodriguez",
        role: "Broker/Owner"
      }
    },
    {
      id: 4,
      icon: <Calendar className="w-6 h-6 text-bolt-blue" />,
      title: "Smart Scheduling",
      description: "Automate appointment setting and follow-ups with AI-powered calendar management that optimizes your time.",
      details: [
        {
          icon: <Calendar className="w-5 h-5 text-bolt-blue" />,
          title: "AI Calendar",
          description: "Intelligently schedules appointments accounting for travel time and client preferences."
        },
        {
          icon: <Clock className="w-5 h-5 text-bolt-blue" />,
          title: "Time Optimization",
          description: "Groups appointments by location to minimize travel time and maximize efficiency."
        },
        {
          icon: <MessageSquare className="w-5 h-5 text-bolt-blue" />,
          title: "Auto Reminders",
          description: "Sends personalized reminders to clients via their preferred communication channel."
        }
      ],
      caseStudy: {
        company: "Urban Real Estate",
        result: "More client meetings",
        metric: "35%",
        quote: "Smart Scheduling has eliminated the back-and-forth of booking appointments. I'm seeing more clients each week without feeling more rushed.",
        author: "Jennifer Park",
        role: "Residential Agent"
      }
    },
    {
      id: 5,
      icon: <MessageSquare className="w-6 h-6 text-bolt-blue" />,
      title: "Automated Communication",
      description: "Engage clients with personalized, timely messages across email, SMS, and social platforms, nurturing relationships automatically.",
      details: [
        {
          icon: <MessageSquare className="w-5 h-5 text-bolt-blue" />,
          title: "AI Copywriting",
          description: "Creates personalized messages that sound authentically human for higher engagement."
        },
        {
          icon: <Users className="w-5 h-5 text-bolt-blue" />,
          title: "Personalization",
          description: "Customizes communication based on client history, preferences, and engagement patterns."
        },
        {
          icon: <Settings className="w-5 h-5 text-bolt-blue" />,
          title: "Multi-channel",
          description: "Coordinates messaging across email, SMS, and social media for consistent communication."
        }
      ],
      caseStudy: {
        company: "Coastal Properties",
        result: "Client retention increase",
        metric: "52%",
        quote: "Our clients feel valued and informed through every step of their journey. The personalized follow-ups have dramatically improved our retention rates.",
        author: "Thomas Wilson",
        role: "Client Relations Manager"
      }
    },
    {
      id: 6,
      icon: <FileText className="w-6 h-6 text-bolt-blue" />,
      title: "Document Automation",
      description: "Generate and process real estate documents with AI, reducing paperwork and errors while ensuring compliance.",
      details: [
        {
          icon: <FileText className="w-5 h-5 text-bolt-blue" />,
          title: "Smart Templates",
          description: "Auto-populates forms with client and property data, eliminating manual entry errors."
        },
        {
          icon: <CheckCircle2 className="w-5 h-5 text-bolt-blue" />,
          title: "Error Detection",
          description: "Automatically reviews documents for errors or missing information before submission."
        },
        {
          icon: <Settings className="w-5 h-5 text-bolt-blue" />,
          title: "E-Signatures",
          description: "Streamlines the signing process with secure, legally-binding electronic signatures."
        }
      ],
      caseStudy: {
        company: "National Realty Group",
        result: "Processing time reduction",
        metric: "73%",
        quote: "Document automation has transformed our back office. Contracts that used to take days are completed in hours, with fewer errors and compliance issues.",
        author: "Patricia Miller",
        role: "Operations Director"
      }
    }
  ];

  const [activeFeature, setActiveFeature] = useState<number>(1);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState<boolean[]>(Array(features.length).fill(false));

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setActiveFeature(id);
          
          // Update visibility state
          setIsVisible(prev => {
            const newState = [...prev];
            newState[id - 1] = true;
            return newState;
          });
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

  useEffect(() => {
    document.title = "Features | AgentX AI - Real Estate Automation";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-bolt-dark relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bolt-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bolt-purple/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-4">
                <Zap className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">AI-Powered Features</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-clash font-semibold mb-6">
                Supercharge Your <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Real Estate</span> Business
              </h1>
              <p className="text-lg text-gray-300">
                Our AI-powered platform provides all the tools you need to automate your workflow, generate more leads, and close deals faster.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-bolt-darker relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Feature cards on mobile, Feature list on desktop */}
              <div className="lg:hidden space-y-12">
                {features.map((feature, index) => (
                  <div 
                    key={feature.id}
                    ref={(el) => (featureRefs.current[feature.id - 1] = el)}
                    data-id={feature.id}
                    className={cn(
                      "glass-card rounded-2xl p-8 space-y-6 transition-all duration-500 transform",
                      isVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                    
                    <div className="space-y-4 pt-4">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-bolt-darkblue/50 flex items-center justify-center flex-shrink-0 mt-1">
                            {detail.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{detail.title}</h4>
                            <p className="text-sm text-gray-400">{detail.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {feature.caseStudy && (
                      <div className="mt-8 glass-card p-6 rounded-xl bg-gradient-to-br from-bolt-darkblue/30 to-transparent border border-white/10">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-400">{feature.caseStudy.company}</p>
                            <div className="flex items-baseline space-x-2 my-2">
                              <span className="text-3xl font-semibold text-bolt-blue">{feature.caseStudy.metric}</span>
                              <span className="text-sm text-gray-300">{feature.caseStudy.result}</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-bolt-blue" />
                          </div>
                        </div>
                        <p className="text-sm italic text-gray-300 mt-3">"{feature.caseStudy.quote}"</p>
                        <div className="mt-3">
                          <p className="text-sm font-medium">{feature.caseStudy.author}</p>
                          <p className="text-xs text-gray-400">{feature.caseStudy.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Feature list on desktop */}
              <div className="hidden lg:block">
                <div className="space-y-6 sticky top-28">
                  {features.map((feature) => (
                    <div 
                      key={feature.id}
                      className={cn(
                        "glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-bolt-blue/30 group",
                        activeFeature === feature.id ? "border-bolt-blue/50 bg-bolt-darkblue/30 shadow-glow-blue" : ""
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
                          activeFeature === feature.id ? "bg-gradient-to-r from-bolt-blue to-bolt-purple text-bolt-dark" : "bg-white/10 text-white"
                        )}>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature visualization */}
              <div className="relative hidden lg:block">
                {features.map((feature) => (
                  <div 
                    key={feature.id}
                    className={cn(
                      "glass-card rounded-2xl p-1 absolute inset-0 transition-all duration-500",
                      activeFeature === feature.id 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-8 pointer-events-none"
                    )}
                  >
                    <div className="relative bg-gradient-to-br from-bolt-darkblue to-bolt-darker rounded-xl overflow-hidden min-h-[600px] flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(10,255,239,0.15)_0%,transparent_70%)]"></div>
                      
                      <div className="relative z-10 p-8 space-y-8 w-full max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center animate-pulse-soft">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-center">{feature.title}</h3>
                        
                        <div className="space-y-4">
                          {feature.details.map((detail, idx) => (
                            <div key={idx} className="glass-card rounded-lg p-4 flex items-start space-x-3 hover:border-bolt-blue/30 transition-all duration-300">
                              <div className="w-10 h-10 rounded-full bg-bolt-darkblue/50 flex items-center justify-center flex-shrink-0 mt-1">
                                {detail.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{detail.title}</p>
                                <p className="text-xs text-gray-400">{detail.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {feature.caseStudy && (
                          <div className="mt-6 glass-card p-6 rounded-xl bg-gradient-to-br from-bolt-darkblue/30 to-transparent border border-white/10">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm text-gray-400">{feature.caseStudy.company}</p>
                                <div className="flex items-baseline space-x-2 my-2">
                                  <span className="text-3xl font-semibold text-bolt-blue">{feature.caseStudy.metric}</span>
                                  <span className="text-sm text-gray-300">{feature.caseStudy.result}</span>
                                </div>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-bolt-blue" />
                              </div>
                            </div>
                            <p className="text-sm italic text-gray-300 mt-3">"{feature.caseStudy.quote}"</p>
                            <div className="mt-3">
                              <p className="text-sm font-medium">{feature.caseStudy.author}</p>
                              <p className="text-xs text-gray-400">{feature.caseStudy.role}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="pt-6">
                          <a 
                            href="/pricing" 
                            className="block w-full button-glow text-center px-6 py-3 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                          >
                            See Pricing Options
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-bolt-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bolt-blue/5 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bolt-purple/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
          
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-clash font-semibold mb-6">
                Ready to <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Transform</span> Your Real Estate Business?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of successful agents who are saving time, closing more deals, and growing their business with AgentX AI.
              </p>
              <a 
                href="/pricing" 
                className="button-glow inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
              >
                <span>View Pricing Plans</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
