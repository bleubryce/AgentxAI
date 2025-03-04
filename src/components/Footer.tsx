
import { Link } from 'react-router-dom';
import { ArrowRight, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, GithubIcon, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bolt-darker relative overflow-hidden pt-16 pb-8">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-bolt-blue/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-bolt-purple/5 rounded-full blur-[80px]"></div>
      
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-bolt-blue flex items-center justify-center">
                <svg className="w-6 h-6 text-bolt-dark" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M212.92,75.5l-52,32A8,8,0,0,1,152,100V36a8,8,0,0,0-13.7-5.64l-112,112A8,8,0,0,0,32,156h76v64a8,8,0,0,0,13.7,5.64l112-112A8,8,0,0,0,232,100H156S213.72,75,212.92,75.5Z" />
                </svg>
              </div>
              <span className="text-xl font-clash font-semibold">
                AGENT<span className="text-bolt-blue">X AI</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Revolutionizing real estate with AI-powered automation. Save time, increase productivity, and close more deals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Reviews</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Updates</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Partners</a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-bolt-blue/50 focus:border-transparent transition-all duration-200"
              />
              <button 
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-bolt-blue text-bolt-dark"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AgentX AI. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
      
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          type="button"
          className="group w-14 h-14 rounded-full bg-blue-purple-gradient flex items-center justify-center shadow-lg hover:shadow-glow-blue transition-all duration-300"
          aria-label="Chat with us"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
