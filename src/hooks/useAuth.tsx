
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthService, User } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

// Create context for auth state
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
  hasFeatureAccess: (feature: string) => boolean;
  refreshUserData: () => Promise<void>;
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
  const { toast } = useToast();

  // Initialize auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setIsLoading(false);
      }
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

  // Force refresh of user data (useful after subscription changes)
  const refreshUserData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await AuthService.refreshToken();
      setUser(AuthService.getCurrentUser());
    } catch (error) {
      console.error("Error refreshing user data:", error);
      toast({
        title: "Error",
        description: "Failed to refresh user data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Wrap AuthService methods with error handling
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await AuthService.login({ email, password });
      if (success) {
        setUser(AuthService.getCurrentUser());
      }
      return success;
    } catch (error) {
      console.error("Login error:", error);
      return false;
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
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      await AuthService.loginWithGoogle();
      // User state will be updated via the auth_state_change event
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const loginWithApple = async (): Promise<void> => {
    try {
      await AuthService.loginWithApple();
      // User state will be updated via the auth_state_change event
    } catch (error) {
      console.error("Apple login error:", error);
    }
  };

  const logout = (): void => {
    try {
      AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const hasFeatureAccess = (feature: string): boolean => {
    try {
      return AuthService.hasFeatureAccess(feature);
    } catch (error) {
      console.error("Feature access check error:", error);
      return false;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasActiveSubscription: user ? AuthService.hasActiveSubscription() : false,
    hasFeatureAccess,
    refreshUserData,
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
