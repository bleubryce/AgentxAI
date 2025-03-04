
import { ArrowRight, Bot, Building, Calendar, CheckCircle } from 'lucide-react';

const CallToAction = () => {
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
                <span className="text-sm font-medium">Try Bolt AI Today</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-clash font-semibold leading-tight">
                Ready to <span className="text-gradient">Transform</span> Your Real Estate Business?
              </h2>
              
              <p className="text-lg text-gray-300 max-w-xl">
                Start your free 14-day trial today and experience the power of AI-driven real estate automation. No credit card required.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Full access to all features during trial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Unlimited lead generation and property matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Dedicated onboarding and support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-bolt-blue flex-shrink-0" />
                  <span>Cancel anytime, no commitment</span>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href="#signup" 
                  className="button-glow inline-flex items-center justify-center px-8 py-4 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                >
                  <span>Start Free Trial</span>
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
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            placeholder="John Smith"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">Company / Brokerage</label>
                          <input
                            type="text"
                            id="company"
                            placeholder="Your Real Estate Company"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button 
                          type="button" 
                          className="button-glow w-full px-6 py-4 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                        >
                          Start Your Free Trial
                        </button>
                        <p className="text-center text-sm text-gray-400 mt-4">
                          No credit card required. 14-day free trial.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
