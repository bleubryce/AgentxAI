
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthService, User } from '@/services/auth';

// Create context for auth state
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
  hasFeatureAccess: (feature: string) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    // Check auth state on mount
    checkAuth();

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth_state_change', handleAuthChange);
    return () => {
      window.removeEventListener('auth_state_change', handleAuthChange);
    };
  }, []);

  // Wrap AuthService methods
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await AuthService.login({ email, password });
      if (success) {
        setUser(AuthService.getCurrentUser());
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await AuthService.register({ name, email, password });
      if (success) {
        setUser(AuthService.getCurrentUser());
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    return AuthService.loginWithGoogle();
  };

  const loginWithApple = async (): Promise<void> => {
    return AuthService.loginWithApple();
  };

  const logout = (): void => {
    AuthService.logout();
    setUser(null);
  };

  const hasFeatureAccess = (feature: string): boolean => {
    return AuthService.hasFeatureAccess(feature);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasActiveSubscription: AuthService.hasActiveSubscription(),
    hasFeatureAccess,
    login,
    loginWithGoogle,
    loginWithApple,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
