
import { useState, useEffect } from 'react';
import { CheckCircle2, X, ArrowRight, Zap, Building2, MessageSquare, Calendar, FileText, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PricingPage = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  
  useEffect(() => {
    document.title = "Pricing | AgentX AI - Real Estate Automation";
  }, []);

  const tiers = [
    {
      name: 'Basic',
      description: 'For individual agents getting started with automation',
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        'AI Chatbot Assistant (1,000 messages/mo)',
        'Property Matching (100 properties/mo)',
        'Smart Scheduling',
        'Email Support',
        '1 Agent User',
      ],
      notIncluded: [
        'Market Analysis',
        'Document Automation',
        'Automated Communication',
        'Phone Support',
        'Custom Integrations',
      ],
      cta: 'Start 7-Day Trial',
      highlight: false,
      color: 'from-blue-400 to-blue-600',
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      name: 'Professional',
      description: 'For growing agents and small teams',
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        'AI Chatbot Assistant (5,000 messages/mo)',
        'Property Matching (Unlimited)',
        'Smart Scheduling',
        'Market Analysis',
        'Document Automation (Basic)',
        'Automated Communication',
        'Email & Chat Support',
        '3 Agent Users',
      ],
      notIncluded: [
        'Advanced Analytics',
        'Phone Support',
        'Custom Integrations',
      ],
      cta: 'Start 7-Day Trial',
      highlight: true,
      color: 'from-bolt-blue to-bolt-purple',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      name: 'Enterprise',
      description: 'Tailored solutions for brokerages and large teams',
      monthlyPrice: null,
      annualPrice: null,
      priceDisplay: 'Contact Us',
      features: [
        'AI Chatbot Assistant (Unlimited)',
        'Property Matching (Unlimited)',
        'Smart Scheduling',
        'Market Analysis (Advanced)',
        'Document Automation (Advanced)',
        'Automated Communication',
        'Advanced Analytics',
        'Custom Integrations',
        'Priority Support (Email, Chat, Phone)',
        'Unlimited Agent Users',
        'Dedicated Success Manager',
        'Custom Training & Onboarding',
        'SLA & Compliance Options',
      ],
      notIncluded: [],
      cta: 'Contact Us',
      highlight: false,
      color: 'from-purple-600 to-pink-600',
      icon: <BarChart3 className="w-6 h-6" />,
    }
  ];

  const calculateSavings = (monthlyPrice: number, annualPrice: number) => {
    if (monthlyPrice === null || annualPrice === null) return 0;
    const monthlyCost = monthlyPrice * 12;
    const savings = monthlyCost - annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return percentage;
  };

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
                <span className="text-sm font-medium">Simple Pricing</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-clash font-semibold mb-6">
                Choose the Perfect <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Plan</span> for Your Business
              </h1>
              <p className="text-lg text-gray-300">
                All plans include a 7-day trial with limited features. Credit card required. Try before you fully commit.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center mt-10 mb-4">
                <div className="relative inline-flex items-center p-1 bg-bolt-darker border border-white/10 rounded-full">
                  <button
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      billing === 'monthly' 
                        ? "bg-gradient-to-r from-bolt-blue to-bolt-purple text-white shadow-glow-blue" 
                        : "bg-transparent text-gray-300 hover:text-white"
                    )}
                    onClick={() => setBilling('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      billing === 'annual' 
                        ? "bg-gradient-to-r from-bolt-blue to-bolt-purple text-white shadow-glow-blue" 
                        : "bg-transparent text-gray-300 hover:text-white"
                    )}
                    onClick={() => setBilling('annual')}
                  >
                    Annual
                  </button>
                </div>
                
                {billing === 'annual' && (
                  <div className="ml-4 bg-bolt-blue/20 text-bolt-blue text-xs font-medium px-3 py-1 rounded-full">
                    Save up to 20%
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-bolt-darker relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier, index) => (
                <div 
                  key={tier.name}
                  className={cn(
                    "relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow-blue group",
                    tier.highlight && "border-bolt-blue/30 shadow-glow-blue z-10 scale-105 my-4 lg:my-0"
                  )}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bolt-blue to-bolt-purple"></div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold">{tier.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{tier.description}</p>
                      </div>
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center",
                        `bg-gradient-to-r ${tier.color}`
                      )}>
                        {tier.icon}
                      </div>
                    </div>
                    
                    <div className="mt-6 mb-8">
                      <div className="flex items-baseline">
                        {tier.monthlyPrice !== null ? (
                          <>
                            <span className="text-4xl font-bold">
                              ${billing === 'monthly' ? tier.monthlyPrice : tier.annualPrice}
                            </span>
                            <span className="text-gray-400 ml-2">
                              {billing === 'monthly' ? '/month' : '/year'}
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold">{tier.priceDisplay}</span>
                        )}
                      </div>
                      
                      {tier.monthlyPrice !== null && billing === 'annual' && (
                        <p className="text-bolt-blue text-sm mt-2">
                          Save {calculateSavings(tier.monthlyPrice, tier.annualPrice)}% with annual billing
                        </p>
                      )}
                      
                      {tier.name === 'Enterprise' && (
                        <p className="text-bolt-blue text-sm mt-2">
                          Tailored to your specific needs and scale
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-bolt-blue shrink-0 mt-0.5" />
                          <span className="ml-3 text-gray-300">{feature}</span>
                        </div>
                      ))}
                      
                      {tier.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start opacity-50">
                          <X className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                          <span className="ml-3 text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <a
                      href={tier.name === 'Enterprise' ? '/contact' : '#signup'}
                      className={cn(
                        "block w-full button-glow text-center px-6 py-3 rounded-full text-white font-medium transition-all duration-300",
                        tier.highlight
                          ? "bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue"
                          : "bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20"
                      )}
                    >
                      {tier.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Table */}
        <section className="py-20 bg-bolt-dark relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-clash font-semibold text-center mb-12">
                Compare Plan <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Features</span>
              </h2>
              
              <div className="overflow-x-auto glass-card rounded-2xl p-1">
                <table className="w-full bg-bolt-darker/80 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4">Feature</th>
                      <th className="p-4 text-center">Basic</th>
                      <th className="p-4 text-center bg-bolt-darkblue/30">Professional</th>
                      <th className="p-4 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">AI Chatbot Assistant</td>
                      <td className="p-4 text-center">1,000 messages/mo</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">5,000 messages/mo</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Property Matching</td>
                      <td className="p-4 text-center">100 properties/mo</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Unlimited</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Smart Scheduling</td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Market Analysis</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center">Advanced</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Document Automation</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Basic</td>
                      <td className="p-4 text-center">Advanced</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Automated Communication</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Analytics Dashboard</td>
                      <td className="p-4 text-center">Basic</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Standard</td>
                      <td className="p-4 text-center">Advanced</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Support Options</td>
                      <td className="p-4 text-center">Email</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Email & Chat</td>
                      <td className="p-4 text-center">Email, Chat & Phone</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Number of Agent Users</td>
                      <td className="p-4 text-center">1</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">3</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Custom Training & Onboarding</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-bolt-dark relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-clash font-semibold text-center mb-12">
                Frequently Asked <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Questions</span>
              </h2>
              
              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-3">Can I change plans later?</h3>
                  <p className="text-gray-300">Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription take effect immediately.</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-3">Is there a setup fee?</h3>
                  <p className="text-gray-300">No, there are no setup fees or hidden charges. The price you see is the price you pay.</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-3">What payment methods do you accept?</h3>
                  <p className="text-gray-300">We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. Enterprise plans can also pay via invoice.</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-3">How does the trial work?</h3>
                  <p className="text-gray-300">Our 7-day trial gives you access to a limited set of features from your selected plan. A valid credit card is required to start, but you won't be billed until the trial period ends.</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-3">Do you offer refunds?</h3>
                  <p className="text-gray-300">We offer a 30-day money-back guarantee for all plans. If you're not satisfied with our service, contact our support team within 30 days of your purchase for a full refund.</p>
                </div>
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
                Start your 7-day trial today and experience the power of AI-driven real estate automation.
              </p>
              <a 
                href="#trial" 
                className="button-glow inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
              >
                <span>Start Your Trial</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <p className="text-sm text-gray-400 mt-4">Credit card required. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
