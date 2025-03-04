
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Bot, Building, BarChart, Calendar, MessageSquare, FileText, Users, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc?: string;
  reverse?: boolean;
}

const FeatureCard = ({ icon, title, description, imageSrc, reverse = false }: FeatureCardProps) => {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
      reverse ? "lg:flex-row-reverse" : ""
    )}>
      <div className="space-y-6 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="text-gray-300 text-lg">{description}</p>
        <a 
          href="#" 
          className="inline-flex items-center text-bolt-blue hover:text-white transition-colors duration-200"
        >
          <span>Learn more</span>
          <ChevronRight className="ml-1 w-4 h-4" />
        </a>
      </div>
      
      <div className="glass-card rounded-2xl p-1 animate-fade-in">
        <div className="bg-gradient-to-br from-bolt-darkblue to-bolt-darker rounded-xl overflow-hidden aspect-video flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-bolt-blue/20 animate-pulse-soft flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-bolt-blue/40 animate-pulse-soft flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesPage = () => {
  useEffect(() => {
    document.title = "Features | BoltAI - AI-Powered Real Estate Automation";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bolt-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bolt-purple/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-4">
                <CheckCircle2 className="w-4 h-4 text-bolt-blue" />
                <span className="text-sm font-medium">Powerful Features</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-semibold mb-6">
                Revolutionize Your <span className="text-gradient">Real Estate</span> Business
              </h1>
              <p className="text-lg text-gray-300">
                Explore our powerful AI-driven features designed specifically for real estate professionals. Automate workflows, generate leads, and close deals faster than ever before.
              </p>
            </div>
          </div>
        </section>
        
        {/* Features detail */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-24">
              <FeatureCard 
                icon={<Bot className="w-6 h-6 text-bolt-blue" />}
                title="AI Lead Generation"
                description="Our AI automatically identifies and qualifies potential clients, saving you countless hours of prospecting. Get high-quality leads delivered to your dashboard every day, with detailed insights and personalized conversation starters."
              />
              
              <FeatureCard 
                icon={<Building className="w-6 h-6 text-bolt-blue" />}
                title="Property Matching"
                description="Match clients with perfect properties using our advanced AI algorithms that understand preferences. Our system analyzes hundreds of data points to find the ideal matches, learning from your clients' feedback to continuously improve recommendations."
                reverse={true}
              />
              
              <FeatureCard 
                icon={<BarChart className="w-6 h-6 text-bolt-blue" />}
                title="Market Analysis"
                description="Get real-time market insights and pricing recommendations based on comprehensive data analysis. Our AI monitors market trends, comparable sales, and economic indicators to provide you with actionable intelligence for pricing strategies and investment opportunities."
              />
              
              <FeatureCard 
                icon={<Calendar className="w-6 h-6 text-bolt-blue" />}
                title="Smart Scheduling"
                description="Automate appointment setting and follow-ups with AI-powered calendar management. Our system optimizes your schedule, reduces no-shows with automated reminders, and intelligently groups appointments by location to maximize your productivity."
                reverse={true}
              />
              
              <FeatureCard 
                icon={<MessageSquare className="w-6 h-6 text-bolt-blue" />}
                title="Automated Communication"
                description="Engage clients with personalized, timely messages across email, SMS, and social platforms. Our AI crafts messages that sound like you, maintains consistent follow-ups, and knows when to escalate conversations that need your personal touch."
              />
              
              <FeatureCard 
                icon={<FileText className="w-6 h-6 text-bolt-blue" />}
                title="Document Automation"
                description="Generate and process real estate documents with AI, reducing paperwork and errors. Our system pre-fills forms, detects missing information, facilitates e-signatures, and maintains a secure digital archive of all your transaction documents."
                reverse={true}
              />
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-bolt-darker relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bolt-blue/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-bolt-purple/5 rounded-full blur-[100px]"></div>
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-card rounded-2xl p-1 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-bolt-darkblue to-bolt-darker rounded-xl overflow-hidden p-10 text-center">
                <h2 className="text-3xl md:text-4xl font-clash font-semibold mb-6">
                  Ready to Experience the <span className="text-gradient">Power of AI</span>?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                  Join thousands of real estate professionals who are saving time, increasing productivity, and closing more deals with BoltAI.
                </p>
                <a 
                  href="#" 
                  className="button-glow inline-flex items-center justify-center px-8 py-4 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
