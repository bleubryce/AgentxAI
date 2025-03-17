
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Computer, HandCoins, Heart, Zap, Building2, DollarSign, Sparkles, MessageSquare, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResumeDialog from '../components/ResumeDialog';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define job categories
type JobCategory = "sales" | "marketing" | "technical" | "operations";

// Job interface
interface Job {
  id: number;
  title: string;
  category: JobCategory;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured?: boolean;
}

const CareersPage = () => {
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | "all">("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number }>>([]);
  
  useEffect(() => {
    document.title = "Careers at AgentX | Join Our Team";
    
    // Generate floating particles effect
    const particlesArray = [];
    for (let i = 0; i < 20; i++) {
      particlesArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    setParticles(particlesArray);
    
    // Simulate fetching jobs
    setJobs([
      {
        id: 1,
        title: "Senior Sales Representative",
        category: "sales",
        location: "Remote, California",
        type: "1099 Commission-Based",
        description: "Join our dynamic sales team and enjoy unlimited earning potential. As a Senior Sales Representative, you'll connect real estate professionals with our cutting-edge AI tools that transform their business. Our top performers earn six-figure incomes working flexible hours from the comfort of their home.",
        requirements: [
          "2+ years of sales experience, preferably in SaaS or real estate tech",
          "Self-motivated with excellent communication skills",
          "Personal computer with reliable internet connection",
          "Passion for technology and helping others succeed"
        ],
        benefits: [
          "Unlimited commission potential - no earnings cap",
          "Flexible schedule - work when you want",
          "Comprehensive sales training and support",
          "Be part of the AI revolution in real estate"
        ],
        featured: true
      },
      {
        id: 2,
        title: "Digital Marketing Specialist",
        category: "marketing",
        location: "Remote, California",
        type: "1099 Commission-Based",
        description: "Drive growth and earn exceptional commissions by promoting our revolutionary real estate AI platform. You'll develop and execute digital marketing strategies that generate qualified leads, working independently while receiving guidance from industry experts.",
        requirements: [
          "Experience with digital marketing campaigns and lead generation",
          "Strong understanding of social media marketing and content creation",
          "Analytical mindset with ability to optimize campaigns based on data",
          "Personal computer, reliable internet, and phone"
        ],
        benefits: [
          "Performance-based compensation - earn what you're worth",
          "Remote work flexibility - no commuting",
          "Cutting-edge marketing tools and resources",
          "Professional growth in the emerging AI real estate sector"
        ]
      },
      {
        id: 3,
        title: "Real Estate AI Consultant",
        category: "sales",
        location: "Remote, California",
        type: "1099 Commission-Based",
        description: "Transform how real estate professionals operate by introducing them to our game-changing AI platform. In this highly rewarding role, you'll demonstrate our suite of AI agents and help clients implement these tools to dramatically increase their productivity and profits.",
        requirements: [
          "Strong understanding of real estate industry challenges and workflows",
          "Excellent presentation and demonstration skills",
          "Tech-savvy with ability to explain complex features simply",
          "Home office setup with reliable internet and phone"
        ],
        benefits: [
          "Highly competitive commission structure",
          "Work from anywhere in California",
          "Be at the forefront of AI innovation in real estate",
          "Flexible hours that fit your lifestyle"
        ]
      },
      {
        id: 4,
        title: "Machine Learning Engineer",
        category: "technical",
        location: "Remote or San Francisco, CA",
        type: "Full-Time",
        description: "Join our AI development team to build and refine the machine learning models that power our real estate automation platform. You'll work on creating predictive algorithms that help real estate professionals identify market opportunities, optimize pricing strategies, and enhance client targeting.",
        requirements: [
          "BS/MS in Computer Science, Machine Learning, or related field",
          "3+ years experience building and deploying ML models",
          "Proficiency in Python, TensorFlow, PyTorch, and related ML tools",
          "Experience with NLP and large language models preferred"
        ],
        benefits: [
          "Competitive salary + equity package",
          "Premium health, dental, and vision benefits",
          "Flexible remote work policy",
          "Professional development stipend"
        ],
        featured: true
      },
      {
        id: 5,
        title: "Product Manager - AI Solutions",
        category: "operations",
        location: "San Francisco, CA (Hybrid)",
        type: "Full-Time",
        description: "Lead the vision and execution of our AI-powered real estate solutions. You'll work directly with engineering, sales, and customer success teams to define product strategy, roadmap, and feature prioritization based on market research and customer feedback.",
        requirements: [
          "5+ years of product management experience",
          "Background in SaaS and AI/ML products",
          "Understanding of real estate industry workflows and pain points",
          "Strong analytical skills and data-driven decision making"
        ],
        benefits: [
          "Competitive salary + equity package",
          "Influence the direction of cutting-edge AI technology",
          "Collaborative and innovative work environment",
          "Comprehensive benefits package"
        ]
      }
    ]);
  }, []);
  
  const filteredJobs = selectedCategory === "all" 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);
  
  const featuredJobs = jobs.filter(job => job.featured);
  
  const handleApply = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsResumeDialogOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Helper function for icon selection based on job category
  const getCategoryIcon = (category: JobCategory) => {
    switch(category) {
      case "sales":
        return <DollarSign className="h-5 w-5 text-bolt-blue" />;
      case "marketing":
        return <Sparkles className="h-5 w-5 text-bolt-purple" />;
      case "technical":
        return <Brain className="h-5 w-5 text-emerald-500" />;
      case "operations":
        return <Building2 className="h-5 w-5 text-amber-500" />;
      default:
        return <Briefcase className="h-5 w-5 text-bolt-blue" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white relative overflow-hidden">
      <Navbar />
      
      {/* Animated particles in the background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-bolt-blue/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.2,
            }}
          />
        ))}
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-20 z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-4">
            <Zap className="w-4 h-4 text-bolt-blue" />
            <span className="text-sm font-medium">We're Hiring</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-clash font-bold bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue to-bolt-purple mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Be part of the AI revolution in real estate. We're looking for ambitious, self-driven professionals who want unlimited earning potential and work-life flexibility.
          </p>
        </motion.div>
        
        {/* Featured Jobs Section (if any) */}
        {featuredJobs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-bolt-blue" />
              Featured Opportunities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredJobs.map((job) => (
                <motion.div 
                  key={`featured-${job.id}`}
                  whileHover="hover"
                  variants={cardVariants}
                  className="relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bolt-blue to-bolt-purple"></div>
                  <Card className="bg-gradient-to-b from-bolt-darkblue/30 to-zinc-900 border border-white/10 h-full">
                    <div className="absolute top-3 right-3 bg-bolt-blue/20 text-bolt-blue text-xs font-medium px-3 py-1 rounded-full">
                      Featured
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {getCategoryIcon(job.category)}
                        <span className="text-sm font-medium ml-2 text-gray-400">
                          {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-semibold text-white">{job.title}</CardTitle>
                      <CardDescription className="flex flex-col gap-2 text-gray-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-bolt-blue" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Computer className="h-4 w-4 text-bolt-blue" />
                          <span>{job.type}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-gray-300 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.slice(0, 2).map((req, idx) => (
                          <span key={idx} className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-300">
                            {req.split(" ").slice(0, 3).join(" ")}...
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleApply(job.title)}
                        className="w-full button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
                      >
                        <Briefcase className="mr-2 h-5 w-5" />
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Job Categories & Listings */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold mb-6"
          >
            Current Openings
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSelectedCategory(value as JobCategory | "all")}>
              <TabsList className="grid grid-cols-5 bg-bolt-darker w-full max-w-3xl mx-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                  All Jobs
                </TabsTrigger>
                <TabsTrigger value="sales" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                  Sales
                </TabsTrigger>
                <TabsTrigger value="marketing" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                  Marketing
                </TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                  Technical
                </TabsTrigger>
                <TabsTrigger value="operations" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                  Operations
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900 border border-white/10 hover:border-bolt-blue/50 transition-all duration-300 flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {getCategoryIcon(job.category)}
                      <span className="text-sm font-medium ml-2 text-gray-400">
                        {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-white">{job.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-2 text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-bolt-blue" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Computer className="h-4 w-4 text-bolt-blue" />
                        <span>{job.type.includes("Remote") ? "Remote Work" : job.type}</span>
                      </div>
                      {job.type.includes("Commission") && (
                        <div className="flex items-center gap-2">
                          <HandCoins className="h-4 w-4 text-bolt-blue" />
                          <span>Commission-Based</span>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium text-white mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block mr-2 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleApply(job.title)}
                      className="w-full button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
                    >
                      <Briefcase className="mr-2 h-5 w-5" />
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center p-12 glass-card rounded-xl">
              <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No positions available</h3>
              <p className="text-gray-400">
                We don't have any open positions in this category right now. Check back later or apply with a general application.
              </p>
            </div>
          )}
        </div>
        
        {/* Team Culture Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-r from-bolt-darkblue to-bolt-darker p-8 rounded-xl border border-white/10 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="h-24 w-24 text-bolt-purple mx-auto" />
              </motion.div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
              <p className="text-gray-300 mb-6">
                At AgentX, we're building a team of innovators who are passionate about transforming the real estate industry through cutting-edge technology. Our culture values:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-bolt-blue">Innovation</h3>
                  <p className="text-sm text-gray-300">We constantly push boundaries and explore new possibilities in AI and automation.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-bolt-blue">Flexibility</h3>
                  <p className="text-sm text-gray-300">We believe in results, not rigid schedules. Work when and where you're most productive.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-bolt-blue">Growth</h3>
                  <p className="text-sm text-gray-300">We invest in your development and provide opportunities to expand your skills and advance your career.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-bolt-blue">Impact</h3>
                  <p className="text-sm text-gray-300">Every team member plays a crucial role in revolutionizing how real estate professionals operate.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* General Application CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center glass-card rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to our mission of revolutionizing real estate with AI.
          </p>
          <Button 
            onClick={() => handleApply("General Application")}
            className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
            size="lg"
          >
            Submit General Application
          </Button>
        </motion.div>
      </main>
      
      <Footer />
      
      <ResumeDialog 
        isOpen={isResumeDialogOpen} 
        onClose={() => setIsResumeDialogOpen(false)} 
        jobTitle={selectedJobTitle}
      />
    </div>
  );
};

export default CareersPage;
