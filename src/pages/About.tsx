import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Award, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const AboutPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "About Us | AgentX AI - Real Estate Automation";
  }, []);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bolt-darker to-bolt-dark text-white">
      <Navbar />
      <main className="flex-grow pt-28">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>About</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* About header section */}
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-clash">
              <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">About</span> AgentX AI
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Transforming real estate with AI-powered automation built for the modern agent.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-6" variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text font-clash">Our Story</h2>
              <p className="text-white/80 text-lg">
                Founded by Brandon Metoyer in 2023, AgentX AI emerged from a keen observation: real estate professionals were overwhelmed by administrative tasks instead of focusing on what truly matters—their clients and closing deals.
              </p>
              <p className="text-white/80 text-lg">
                Brandon assembled a team of top-tier professionals and experienced real estate agents who shared a singular mission: to create an AI platform that would handle repetitive work and empower agents to multiply their productivity and impact.
              </p>
              <p className="text-white/80 text-lg">
                Today, AgentX AI serves thousands of real estate professionals nationwide, helping them automate their workflows and achieve unprecedented results in their business.
              </p>
              
              {/* Learn More button */}
              <div className="mt-8">
                <Button 
                  className="bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
                  size="lg"
                  onClick={() => {
                    toast({
                      title: "Learn more",
                      description: "More content about our story is coming soon!"
                    });
                  }}
                >
                  Learn More About Our Journey
                </Button>
              </div>
            </motion.div>

            {/* Our Vision card */}
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-gradient-to-br from-bolt-dark/60 to-bolt-darker/60 backdrop-blur-sm hover:shadow-glow-blue/30 transition-all duration-500"
              variants={fadeIn}
            >
              <div className="h-full w-full bg-[url('/placeholder.svg')] bg-cover bg-center flex items-center justify-center">
                <div className="p-10 text-center backdrop-blur-sm bg-black/30 h-full w-full">
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Award className="w-10 h-10 text-bolt-dark" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 font-clash">Our Vision</h3>
                  <p className="text-white/70">
                    To make AI automation the standard in real estate, allowing agents to focus on relationships while technology handles everything else.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mb-20"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text font-clash">Our Team of Professionals</h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  name: "Brandon Metoyer",
                  title: "Founder & CEO",
                  bio: "Tech innovator driving real estate transformation through AI-powered solutions.",
                  icon: <Users className="h-8 w-8" />
                },
                {
                  name: "Real Estate Experts",
                  title: "Advisory Board",
                  bio: "Experienced agents and brokers providing industry insights and strategic guidance.",
                  icon: <Briefcase className="h-8 w-8" />
                },
                {
                  name: "AI & Tech Professionals",
                  title: "Innovation Team",
                  bio: "Cutting-edge developers and data scientists creating revolutionary automation tools.",
                  icon: <Award className="h-8 w-8" />
                }
              ].map((member, index) => (
                <motion.div 
                  key={index} 
                  className="bg-bolt-darker/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-blue/20 hover:border-bolt-blue/30 hover:-translate-y-1"
                  variants={fadeIn}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(10, 255, 239, 0.3)" 
                  }}
                >
                  <div className="h-48 bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 flex items-center justify-center">
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center text-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.icon}
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 font-clash">{member.name}</h3>
                    <p className="text-bolt-blue mb-3">{member.title}</p>
                    <p className="text-white/70">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Values section with improved styling */}
          <motion.div 
            className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-bolt-dark/60 to-bolt-darker/60 backdrop-blur-sm mb-20 hover:shadow-glow-blue/10 transition-all duration-500"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="p-10 md:p-16">
              <h2 className="text-3xl font-bold mb-8 text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text font-clash">Our Values</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerChildren}
              >
                {[
                  {
                    title: "Innovation First",
                    description: "We're constantly pushing the boundaries of what AI can do for real estate professionals.",
                  },
                  {
                    title: "Agent Success",
                    description: "Everything we build is designed to make agents more productive, profitable and impactful.",
                  },
                  {
                    title: "Simplicity",
                    description: "Powerful technology doesn't have to be complicated. We prioritize ease of use in everything we build.",
                  },
                  {
                    title: "Data Security",
                    description: "We treat your data and your clients' information with the highest standards of security and privacy.",
                  },
                  {
                    title: "Continuous Improvement",
                    description: "Our platform gets smarter and more capable every day through continuous learning and updates.",
                  },
                  {
                    title: "Real Results",
                    description: "We measure our success by the tangible outcomes we create for our users and their businesses.",
                  },
                ].map((value, index) => (
                  <motion.div 
                    key={index} 
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-bolt-blue/50 transition-all duration-300 hover:shadow-sm hover:-translate-y-1"
                    variants={fadeIn}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: "rgba(255, 255, 255, 0.08)" 
                    }}
                  >
                    <h3 className="text-xl font-bold mb-3 font-clash">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div 
            className="text-center mb-20"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-3xl font-bold mb-8 text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text font-clash">Trust & Recognition</h2>
            <div className="flex flex-wrap justify-center gap-10 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div 
                  key={i} 
                  className="w-32 h-16 bg-white/5 rounded-lg flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-xl font-bold text-white/30">Partner {i}</div>
                </motion.div>
              ))}
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white/70 mb-8">
                AgentX AI is trusted by top brokerages and real estate professionals nationwide. Our platform has been recognized for its innovation and impact in the real estate industry.
              </p>
              <Link 
                to="/contact"
                className="inline-block button-glow px-8 py-3 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
