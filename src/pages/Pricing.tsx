import { useState, useEffect } from 'react';
import { CheckCircle2, X, ArrowRight, Zap, Building2, MessageSquare, Calendar, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link as RouterLink } from 'react-router-dom';

const PricingPage = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [showAddOns, setShowAddOns] = useState(false);
  
  useEffect(() => {
    document.title = "Pricing | AgentX AI - Real Estate Automation";
  }, []);

  const tiers = [
    {
      name: 'Starter',
      description: 'New agents/small teams needing basic automation and entry-level leads',
      monthlyPrice: 299,
      annualPrice: 3299,
      features: [
        '10 General Inquiries (non-exclusive, minimal vetting)',
        'AI Chatbot Assistant (Unlimited)',
        'Property Matching (Unlimited)',
        'Basic Market Analysis',
        'Automated Communication (5 campaigns/month)',
        'Email & Chat Support (24-hour response)',
        '2 Agent Users',
      ],
      notIncluded: [
        'Smart Scheduling',
        'Document Automation',
        'Advanced Market Analysis',
        'Custom Integrations',
        'SLA Options',
      ],
      cta: 'Start 7-Day Trial',
      highlight: false,
      color: 'from-blue-400 to-blue-600',
      icon: <MessageSquare className="w-6 h-6" />,
      valueProposition: 'Affordable automation + leads to kickstart your pipeline'
    },
    {
      name: 'Pro',
      description: 'Established agents wanting pre-vetted leads and advanced automation',
      monthlyPrice: 899,
      annualPrice: 9699,
      features: [
        '15 Pre-Vetted Leads (budget/timeline-qualified)',
        'AI Chatbot Assistant (Unlimited)',
        'Property Matching (Unlimited)',
        'Smart Scheduling',
        'Document Automation (Basic)',
        'Advanced Market Analysis',
        'Custom Integrations (1 platform)',
        'Priority Support (Email/Chat, 12-hour response)',
        '5 Agent Users',
        'SLA optional (+$99/month)',
      ],
      notIncluded: [
        'Advanced Analytics',
        'Unlimited Custom Integrations',
        'Dedicated Success Manager',
      ],
      cta: 'Start 7-Day Trial',
      highlight: true,
      color: 'from-bolt-blue to-bolt-purple',
      icon: <Building2 className="w-6 h-6" />,
      valueProposition: 'High-quality leads + time-saving tools to scale your business'
    },
    {
      name: 'Elite',
      description: 'Top-performing agents/teams requiring exclusive leads and full automation',
      monthlyPrice: 1999,
      annualPrice: 21599,
      features: [
        '10 Exclusive Leads (high-intent, 1:1 matching)',
        'All Pro features included',
        'Advanced Analytics (Predictive Insights)',
        'Document Automation (Advanced, e.g., e-signature)',
        'Unlimited Custom Integrations (CRM, MLS, etc.)',
        'Dedicated Success Manager',
        'Custom Training & Onboarding',
        'SLA & Compliance Guarantee (included)',
        'Priority Phone Support (4-hour response)',
        'Unlimited Agent Users',
      ],
      notIncluded: [],
      cta: 'Start 7-Day Trial',
      highlight: false,
      color: 'from-purple-600 to-pink-600',
      icon: <BarChart3 className="w-6 h-6" />,
      valueProposition: 'White-glove service + elite leads to dominate your market'
    }
  ];

  const addOns = [
    {
      name: 'Extra Leads',
      options: [
        { name: 'General', price: 25, unit: 'per lead' },
        { name: 'Pre-Vetted', price: 60, unit: 'per lead' },
        { name: 'Exclusive', price: 150, unit: 'per lead' },
      ]
    },
    {
      name: 'Additional Users',
      options: [
        { name: 'Extra Users (Starter/Pro)', price: 50, unit: 'per user/month' },
      ]
    },
    {
      name: 'Hybrid Pricing',
      options: [
        { name: 'Basic + Commission', price: 199, unit: 'per month + 10% closed commission' },
        { name: 'Description', price: null, unit: 'Combines Tier 1 leads + AI tools' },
      ]
    },
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-4"
              >
                <Zap className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">Premium AI Solutions</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-clash font-semibold mb-6"
              >
                Choose the Perfect <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Plan</span> for Your Business
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-300"
              >
                Save 15+ hours/month with our AI-powered automation tools and get high-quality leads.
              </motion.p>
              
              {/* Billing Toggle */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center mt-10 mb-4"
              >
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
                    Save up to 10%
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-bolt-darker relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier, index) => (
                <motion.div 
                  key={tier.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className={cn(
                    "relative glass-card rounded-2xl overflow-hidden transition-all duration-300 group",
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
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className={cn(
                          "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center",
                          `bg-gradient-to-r ${tier.color}`
                        )}>
                        {tier.icon}
                      </motion.div>
                    </div>
                    
                    <div className="mt-6 mb-4">
                      <div className="flex items-baseline">
                        {tier.monthlyPrice !== null ? (
                          <>
                            <span className="text-4xl font-bold">
                              ${billing === 'monthly' ? tier.monthlyPrice : (tier.annualPrice / 12).toFixed(0)}
                            </span>
                            <span className="text-gray-400 ml-2">
                              /month
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold">Custom Pricing</span>
                        )}
                      </div>
                      
                      {billing === 'annual' && (
                        <p className="text-bolt-blue text-sm mt-2">
                          ${tier.annualPrice} billed annually (save {calculateSavings(tier.monthlyPrice, tier.annualPrice)}%)
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-3 mb-6">
                      <p className="text-sm text-bolt-blue font-medium">{tier.valueProposition}</p>
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
                    
                    <motion.a
                      href="#signup"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "block w-full button-glow text-center px-6 py-3 rounded-full text-white font-medium transition-all duration-300",
                        tier.highlight
                          ? "bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue"
                          : "bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20"
                      )}
                    >
                      {tier.cta}
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add-ons section */}
            <div className="max-w-7xl mx-auto mt-16">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <button 
                  onClick={() => setShowAddOns(!showAddOns)}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-8 hover:bg-white/15 transition-colors"
                >
                  <span>{showAddOns ? 'Hide Add-Ons' : 'View Add-Ons & Extras'}</span>
                  <motion.span
                    animate={{ rotate: showAddOns ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </button>
              </motion.div>
              
              {showAddOns && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-2xl p-8 mt-4"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-center">Flexible Add-Ons</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {addOns.map((category, index) => (
                      <div key={index} className="rounded-xl bg-white/5 p-6">
                        <h4 className="text-xl font-medium mb-4 text-white">{category.name}</h4>
                        <div className="space-y-4">
                          {category.options.map((option, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-gray-300">{option.name}</span>
                              {option.price !== null ? (
                                <span className="font-semibold text-white">${option.price} <span className="text-sm text-gray-400">{option.unit}</span></span>
                              ) : (
                                <span className="text-sm text-gray-400 italic">{option.unit}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-bolt-blue/10 border border-bolt-blue/20 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-bolt-blue shrink-0 mt-0.5" />
                      <p className="ml-3 text-sm text-gray-300">
                        All add-ons can be purchased at any time from your account dashboard. For enterprise options and custom packages for brokerages, please <RouterLink to="/contact" className="text-bolt-blue hover:underline">contact us</RouterLink>.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Table */}
        <section className="py-20 bg-bolt-dark relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-clash font-semibold text-center mb-12"
              >
                Compare Plan <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Features</span>
              </motion.h2>
              
              <div className="overflow-x-auto glass-card rounded-2xl p-1">
                <table className="w-full bg-bolt-darker/80 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4">Feature</th>
                      <th className="p-4 text-center">Starter</th>
                      <th className="p-4 text-center bg-bolt-darkblue/30">Pro</th>
                      <th className="p-4 text-center">Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Lead Quality</td>
                      <td className="p-4 text-center">General Inquiries</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Pre-Vetted</td>
                      <td className="p-4 text-center">Exclusive (High-Intent)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Number of Leads</td>
                      <td className="p-4 text-center">10/month</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">15/month</td>
                      <td className="p-4 text-center">10 exclusive/month</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">AI Chatbot Assistant</td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Property Matching</td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Market Analysis</td>
                      <td className="p-4 text-center">Basic</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Advanced</td>
                      <td className="p-4 text-center">Predictive Insights</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Smart Scheduling</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Document Automation</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Basic</td>
                      <td className="p-4 text-center">Advanced (e-signatures)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Automated Communication</td>
                      <td className="p-4 text-center">5 campaigns/month</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Custom Integrations</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">1 platform</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Support Level</td>
                      <td className="p-4 text-center">Email & Chat (24h)</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Priority (12h)</td>
                      <td className="p-4 text-center">Priority Phone (4h)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Number of Agent Users</td>
                      <td className="p-4 text-center">2</td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">5</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 font-medium">Dedicated Success Manager</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center"><CheckCircle2 className="inline w-5 h-5 text-bolt-blue" /></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">SLA & Compliance</td>
                      <td className="p-4 text-center"><X className="inline w-5 h-5 text-gray-500" /></td>
                      <td className="p-4 text-center bg-bolt-darkblue/30">Optional (+$99/mo)</td>
                      <td className="p-4 text-center">Included</td>
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
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-clash font-semibold text-center mb-12"
              >
                Frequently Asked <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple">Questions</span>
              </motion.h2>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3 className="text-xl font-medium mb-3">How are your leads different from competitors?</h3>
                  <p className="text-gray-300">Our leads are categorized by quality and intent. General inquiries are introductory leads, Pre-Vetted leads are qualified by budget and timeline, and Exclusive leads are high-intent prospects matched specifically to your service area and specialization.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3 className="text-xl font-medium mb-3">Can I change plans or add features later?</h3>
                  <p className="text-gray-300">Yes, you can upgrade, downgrade, or add features at any time. Changes to your subscription take effect immediately, and your billing will be prorated accordingly.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3 className="text-xl font-medium mb-3">Is there a minimum contract length?</h3>
                  <p className="text-gray-300">We offer both monthly and annual billing options. While annual plans provide significant savings, there's no long-term commitment required for monthly plans, which you can cancel at any time.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3 className="text-xl font-medium mb-3">How does the hybrid pricing option work?</h3>
                  <p className="text-gray-300">Our hybrid pricing option ($199/month + 10% commission) gives you access to basic AI tools and Tier 1 leads at a lower monthly cost. When you close a deal with a lead we provide, we receive a 10% referral fee on your commission. This is ideal for agents who prefer a lower upfront cost.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="glass-card rounded-xl p-6 hover:border-bolt-blue/20 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3 className="text-xl font-medium mb-3">Do you offer refunds?</h3>
                  <p className="text-gray-300">We offer a 30-day money-back guarantee for all plans. If you're not satisfied with our service, contact our support team within 30 days of your purchase for a full refund.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enterprise Options */}
        <section className="py-20 bg-bolt-darker relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bolt-blue/5 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bolt-purple/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto glass-card rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-3xl font-clash font-semibold mb-4">Custom Enterprise Solutions</h3>
                    <p className="text-gray-300 mb-6">
                      Managing a brokerage or large team? We offer custom enterprise packages with volume discounts, tailored onboarding, and bespoke features designed specifically for your business needs.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-bolt-blue shrink-0 mt-0.5" />
                        <span className="ml-3 text-gray-300">Volume discounts for 50+ agents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-bolt-blue shrink-0 mt-0.5" />
                        <span className="ml-3 text-gray-300">Custom AI training for your specific market</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-bolt-blue shrink-0 mt-0.5" />
                        <span className="ml-3 text-gray-300">Dedicated implementation team</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-bolt-blue shrink-0 mt-0.5" />
                        <span className="ml-3 text-gray-300">Advanced analytics dashboard for team leaders</span>
                      </li>
                    </ul>
                    <RouterLink to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="button-glow inline-flex items-
