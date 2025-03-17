
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.title = "Page Not Found | AgentX AI";
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.2, 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bolt-dark to-bolt-darker">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={pulseVariants}
            animate="pulse"
            className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue to-bolt-purple mb-6"
          >
            404
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-white/70 mb-12 max-w-lg mx-auto"
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </motion.p>
          
          <motion.div variants={itemVariants} className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 p-6 rounded-xl bg-white/5 border border-white/10 max-w-xl mx-auto"
          >
            <h3 className="text-xl font-medium mb-3">Looking for something specific?</h3>
            <p className="text-white/70 mb-4">
              You might find what you need in one of these popular sections:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Features", path: "/features" },
                { title: "Pricing", path: "/pricing" },
                { title: "About Us", path: "/about" },
                { title: "Contact", path: "/contact" }
              ].map((link, index) => (
                <Link 
                  key={index}
                  to={link.path}
                  className="text-white/80 hover:text-bolt-blue p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
