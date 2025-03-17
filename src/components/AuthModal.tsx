
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { X, Mail, Lock, User as UserIcon, ArrowRight, Apple } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { isLoading, login, register, loginWithGoogle, loginWithApple } = useAuth();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { toast } = useToast();
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    // Reset form when switching modes
    setName('');
    setEmail('');
    setPassword('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(email, password);
      } else {
        if (!name) {
          toast({
            title: "Name required",
            description: "Please enter your name to register",
            variant: "destructive"
          });
          return;
        }
        success = await register(name, email, password);
      }
      
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-bolt-darker border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-clash">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-bolt-darkblue/30 border border-white/10 pl-10 text-white placeholder:text-gray-500 focus:border-bolt-blue/50 focus:ring-bolt-blue/50"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-bolt-darkblue/30 border border-white/10 pl-10 text-white placeholder:text-gray-500 focus:border-bolt-blue/50 focus:ring-bolt-blue/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-bolt-darkblue/30 border border-white/10 pl-10 text-white placeholder:text-gray-500 focus:border-bolt-blue/50 focus:ring-bolt-blue/50"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
          
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          <div className="space-y-3">
            <Button
              type="button"
              onClick={loginWithGoogle}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full border border-gray-300"
            >
              <svg className="inline-block w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M12 4.93C14.24 4.93 16.18 5.78 17.66 7.2l2.86-2.82C18.63 2.5 15.5 1 12 1 7.35 1 3.41 3.8 1.3 7.84l3.27 2.55C5.55 7.09 8.53 4.93 12 4.93z"/>
                <path fill="#34A853" d="M23 12c0-.83-.07-1.64-.22-2.41H12v4.58h6.23c-.28 1.48-1.08 2.73-2.32 3.59l3.22 2.51c1.89-1.73 2.99-4.3 2.99-7.27z"/>
                <path fill="#FBBC05" d="M4.57 10.39c-.32.89-.5 1.84-.5 2.83s.18 1.94.5 2.83l-3.27 2.55C.44 16.36 0 14.25 0 12s.44-4.36 1.3-6.22l3.27 2.55z"/>
                <path fill="#EA4335" d="M12 23c3.5 0 6.63-1.5 8.52-4.13l-3.22-2.51c-.91.65-2.12.98-3.48.98-3.47 0-6.45-2.16-7.43-5.49l-3.27 2.55C5.41 18.2 8.53 23 12 23z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button
              type="button"
              onClick={loginWithApple}
              className="w-full bg-black hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-full border border-gray-800"
            >
              <Apple className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
          </div>
          
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  onClick={toggleMode}
                  className="text-bolt-blue hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-400">
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={toggleMode}
                  className="text-bolt-blue hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
