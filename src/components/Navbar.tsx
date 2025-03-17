
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X, Zap, User, ChevronDown, Building2, Users, BookOpen, Mail, HelpCircle, BarChart3, Bot, Briefcase, Phone, Heart, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => (
    <Link
      to={to}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gold-500/10 hover:text-gold-400 focus:bg-gold-500/10 focus:text-gold-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive(to) ? "text-gold-400 after:w-full" : "text-white/80",
        "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gold-500 after:w-0 hover:after:w-full after:transition-all after:duration-300",
        className
      )}
    >
      {children}
    </Link>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-gradient-to-r from-jet-950/90 to-jet-900/90 backdrop-blur-md shadow-md border-b border-gold-500/10'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group z-50"
          aria-label="AgentX AI Home"
        >
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center overflow-hidden group-hover:shadow-glow-gold transition-shadow duration-300"
          >
            <svg className="w-6 h-6 text-jet-950" fill="currentColor" viewBox="0 0 256 256">
              <path d="M212.92,75.5l-52,32A8,8,0,0,1,152,100V36a8,8,0,0,0-13.7-5.64l-112,112A8,8,0,0,0,32,156h76v64a8,8,0,0,0,13.7,5.64l112-112A8,8,0,0,0,232,100H156S213.72,75,212.92,75.5Z" />
            </svg>
          </motion.div>
          <span className="text-xl font-clash font-semibold">
            AGENT<span className="text-gradient bg-gold-gradient bg-clip-text">X AI</span>
          </span>
        </Link>

        <nav className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavLink to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-gold-500/10 hover:text-gold-400 h-10 px-4 py-2 text-sm", 
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gold-500 after:w-0 hover:after:w-full after:transition-all after:duration-300",
                  isActive('/features') ? "text-gold-400 after:w-full" : "text-white/80"
                )}>
                  <Bot className="mr-2 h-4 w-4" />
                  AI Agents
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-gradient-to-b from-jet-900/95 to-jet-950/95 backdrop-blur-md border border-gold-500/20 rounded-xl shadow-xl"
                  >
                    <Link to="/features" className="row-span-3 rounded-md bg-gradient-to-b from-gold-500/10 to-transparent p-6 hover:bg-gold-500/15 transition-colors">
                      <div className="mb-2 mt-4 text-lg font-medium text-white">AI Agent Features</div>
                      <p className="text-sm leading-tight text-gray-300">
                        Explore our full suite of AI agents designed to revolutionize your real estate business.
                      </p>
                      <div className="mt-4 flex items-center text-sm text-gold-400">
                        Learn more <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                      </div>
                    </Link>
                    
                    <Link to="/agents-demos" className="group flex h-full w-full select-none flex-col justify-end rounded-md bg-white/5 p-4 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all duration-300">
                      <div className="mb-2 flex items-center">
                        <BarChart3 className="h-5 w-5 text-gold-400 mr-2" />
                        <div className="text-sm font-medium text-white">Lead Generation</div>
                      </div>
                      <p className="text-xs text-gray-400">AI-driven lead qualification and nurturing</p>
                    </Link>
                    
                    <Link to="/agents-demos" className="group flex h-full w-full select-none flex-col justify-end rounded-md bg-white/5 p-4 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all duration-300">
                      <div className="mb-2 flex items-center">
                        <Home className="h-5 w-5 text-gold-400 mr-2" />
                        <div className="text-sm font-medium text-white">Property Matching</div>
                      </div>
                      <p className="text-xs text-gray-400">Smart property recommendations for clients</p>
                    </Link>
                    
                    <Link to="/multi-agent-chat" className="group flex h-full w-full select-none flex-col justify-end rounded-md bg-white/5 p-4 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all duration-300">
                      <div className="mb-2 flex items-center">
                        <Users className="h-5 w-5 text-gold-400 mr-2" />
                        <div className="text-sm font-medium text-white">Multi-Agent Chat</div>
                      </div>
                      <p className="text-xs text-gray-400">Experience our collaborative AI agents in action</p>
                    </Link>
                    
                    <Link to="/agent-deployment" className="group flex h-full w-full select-none flex-col justify-end rounded-md bg-white/5 p-4 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all duration-300">
                      <div className="mb-2 flex items-center">
                        <Zap className="h-5 w-5 text-gold-400 mr-2" />
                        <div className="text-sm font-medium text-white">Deploy Your Own</div>
                      </div>
                      <p className="text-xs text-gray-400">Create and deploy custom AI agents for your needs</p>
                    </Link>
                  </motion.div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavLink to="/pricing">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Pricing
                </NavLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-gold-500/10 hover:text-gold-400 h-10 px-4 py-2 text-sm", 
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gold-500 after:w-0 hover:after:w-full after:transition-all after:duration-300",
                  (isActive('/about') || isActive('/careers') || isActive('/blog')) ? "text-gold-400 after:w-full" : "text-white/80"
                )}>
                  <Building2 className="mr-2 h-4 w-4" />
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-3 p-6 md:w-[400px] bg-gradient-to-b from-jet-900/95 to-jet-950/95 backdrop-blur-md border border-gold-500/20 rounded-xl shadow-xl"
                  >
                    <div className="grid grid-cols-1 gap-3">
                      <Link to="/about" className="flex items-center rounded-md p-3 hover:bg-gold-500/10 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-400 mr-3">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">About Us</div>
                          <div className="text-xs text-gray-400">Our mission and vision</div>
                        </div>
                      </Link>
                      
                      <Link to="/careers" className="flex items-center rounded-md p-3 hover:bg-gold-500/10 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-400 mr-3">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Careers</div>
                          <div className="text-xs text-gray-400">Join our growing team</div>
                        </div>
                      </Link>
                      
                      <Link to="/blog" className="flex items-center rounded-md p-3 hover:bg-gold-500/10 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-500/10 text-gold-400 mr-3">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Blog</div>
                          <div className="text-xs text-gray-400">Latest news and insights</div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavLink to="/contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full text-jet-950 font-medium hover:shadow-glow-gold transition-all duration-300 flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                {user?.name?.split(' ')[0] || 'Dashboard'}
              </Link>
              <button
                onClick={logout}
                className="text-white/80 hover:text-gold-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <motion.button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full text-jet-950 font-medium hover:shadow-glow-gold transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Sign In
            </motion.button>
          )}
        </div>

        <button
          className="block lg:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 bg-gradient-to-b from-jet-900/98 to-jet-950/98 backdrop-blur-md z-40 lg:hidden pt-20"
            >
              <nav className="flex flex-col items-center space-y-6 p-8">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center text-xl font-medium",
                    isActive('/') ? "text-gold-400" : "text-white"
                  )}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Link>
                
                <div className="w-full">
                  <div className={cn(
                    "flex items-center justify-between w-full text-xl font-medium px-4 py-2 rounded-lg",
                    isActive('/features') || isActive('/agents-demos') || isActive('/multi-agent-chat') || isActive('/agent-deployment')
                      ? "bg-gold-500/10 text-gold-400"
                      : "text-white"
                  )}>
                    <div className="flex items-center">
                      <Bot className="mr-2 h-5 w-5" />
                      AI Agents
                    </div>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <Link 
                      to="/features" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/features') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      All Features
                    </Link>
                    <Link 
                      to="/agents-demos" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/agents-demos') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      Agent Demos
                    </Link>
                    <Link 
                      to="/multi-agent-chat" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/multi-agent-chat') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      Multi-Agent Chat
                    </Link>
                    <Link 
                      to="/agent-deployment" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/agent-deployment') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      Deploy Your Own
                    </Link>
                  </div>
                </div>
                
                <Link
                  to="/pricing"
                  className={cn(
                    "flex items-center text-xl font-medium",
                    isActive('/pricing') ? "text-gold-400" : "text-white"
                  )}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Pricing
                </Link>
                
                <div className="w-full">
                  <div className={cn(
                    "flex items-center justify-between w-full text-xl font-medium px-4 py-2 rounded-lg",
                    isActive('/about') || isActive('/careers') || isActive('/blog')
                      ? "bg-gold-500/10 text-gold-400"
                      : "text-white"
                  )}>
                    <div className="flex items-center">
                      <Building2 className="mr-2 h-5 w-5" />
                      Company
                    </div>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <Link 
                      to="/about" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/about') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/careers" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/careers') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      Careers
                    </Link>
                    <Link 
                      to="/blog" 
                      className={cn(
                        "block text-lg py-1 px-4 rounded-lg",
                        isActive('/blog') ? "text-gold-400 bg-gold-500/5" : "text-white/80"
                      )}
                    >
                      Blog
                    </Link>
                  </div>
                </div>
                
                <Link
                  to="/contact"
                  className={cn(
                    "flex items-center text-xl font-medium",
                    isActive('/contact') ? "text-gold-400" : "text-white"
                  )}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact
                </Link>
                
                <div className="w-full h-px bg-gold-500/10 my-4"></div>
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full text-jet-950 font-medium text-center hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="text-white/80 hover:text-gold-400 text-xl font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full text-jet-950 font-medium text-center hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </header>
  );
};

export default Navbar;
