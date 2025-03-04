
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-bolt-darker/80 backdrop-blur-md shadow-md'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
          aria-label="Bolt AI Home"
        >
          <div className="w-10 h-10 rounded-full bg-bolt-blue flex items-center justify-center overflow-hidden group-hover:shadow-glow-blue transition-shadow duration-300">
            <svg className="w-6 h-6 text-bolt-dark" fill="currentColor" viewBox="0 0 256 256">
              <path d="M212.92,75.5l-52,32A8,8,0,0,1,152,100V36a8,8,0,0,0-13.7-5.64l-112,112A8,8,0,0,0,32,156h76v64a8,8,0,0,0,13.7,5.64l112-112A8,8,0,0,0,232,100H156S213.72,75,212.92,75.5Z" />
            </svg>
          </div>
          <span className="text-xl font-clash font-semibold">
            BOLT<span className="text-bolt-blue">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn("nav-link", isActive('/') && "active")}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={cn("nav-link", isActive('/features') && "active")}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className={cn("nav-link", isActive('/contact') && "active")}
          >
            Contact
          </Link>
          <div className="w-px h-6 bg-white/10"></div>
          <a
            href="#demo"
            className="button-glow px-6 py-2.5 bg-blue-purple-gradient rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
          >
            Get Started
          </a>
        </nav>

        <button
          className="block md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-bolt-darker/95 backdrop-blur-md z-40 transform transition-transform duration-300 pt-20",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-8 p-8">
          <Link
            to="/"
            className={cn(
              "text-xl font-medium",
              isActive('/') ? "text-bolt-blue" : "text-white"
            )}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={cn(
              "text-xl font-medium",
              isActive('/features') ? "text-bolt-blue" : "text-white"
            )}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className={cn(
              "text-xl font-medium",
              isActive('/contact') ? "text-bolt-blue" : "text-white"
            )}
          >
            Contact
          </Link>
          <div className="w-32 h-px bg-white/10 my-4"></div>
          <a
            href="#demo"
            className="w-full max-w-xs button-glow px-6 py-3 bg-blue-purple-gradient rounded-full text-white font-medium text-center hover:shadow-glow-blue transition-all duration-300"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
