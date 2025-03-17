import { toast } from "@/hooks/use-toast";
import apiRequest from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  subscription?: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'trial';
    expiresAt: string;
    features: string[];
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock user data for fallback when API is unavailable
const createMockUser = (name: string, email: string): User => ({
  id: `mock-${Date.now()}`,
  name,
  email,
  role: 'user',
  subscription: {
    plan: 'trial',
    status: 'trial',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    features: ['basic_features', 'ai_chat']
  }
});

// Authentication state management
const getUser = (): User | null => {
  const userData = localStorage.getItem('user_info');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error('Failed to parse user data', error);
    return null;
  }
};

const setUserAndToken = (user: User, token: string): void => {
  localStorage.setItem('user_info', JSON.stringify(user));
  localStorage.setItem('auth_token', token);
  // Dispatch a custom event for auth state change
  window.dispatchEvent(new Event('auth_state_change'));
};

const clearUserAndToken = (): void => {
  localStorage.removeItem('user_info');
  localStorage.removeItem('auth_token');
  // Dispatch a custom event for auth state change
  window.dispatchEvent(new Event('auth_state_change'));
};

// Authentication service
export const AuthService = {
  // Get current user
  getCurrentUser: (): User | null => {
    return getUser();
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Check if user has active subscription
  hasActiveSubscription: (): boolean => {
    const user = getUser();
    if (!user || !user.subscription) return false;
    return user.subscription.status === 'active' || user.subscription.status === 'trial';
  },

  // Check if user has access to specific feature
  hasFeatureAccess: (featureName: string): boolean => {
    const user = getUser();
    if (!user || !user.subscription) return false;
    if (user.subscription.status !== 'active' && user.subscription.status !== 'trial') return false;
    return user.subscription.features.includes(featureName);
  },
  
  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await apiRequest<AuthResponse>('/auth/login', 'POST', credentials);
      
      if (response.success && response.data) {
        setUserAndToken(response.data.user, response.data.token);
        toast({
          title: "Welcome back",
          description: `You're now signed in as ${response.data.user.name}`,
        });
        return true;
      } else {
        // If API fails, check if we should use fallback mode
        if (response.error?.includes('Failed to fetch') || response.error?.includes('Network error')) {
          // Mock login for demo/development
          console.log('API unavailable, using mock login');
          
          // Simple validation
          if (!credentials.email || !credentials.password) {
            toast({
              title: "Login failed",
              description: "Email and password are required",
              variant: "destructive"
            });
            return false;
          }
          
          // Create mock user based on email
          const mockUser = createMockUser('Demo User', credentials.email);
          setUserAndToken(mockUser, 'mock-token-' + Date.now());
          
          toast({
            title: "Welcome back (Demo Mode)",
            description: `You're now signed in as ${mockUser.name}. Note: Using offline mode.`,
          });
          return true;
        }
        
        toast({
          title: "Login failed",
          description: response.error || "Invalid credentials",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback for any unexpected errors
      toast({
        title: "Login error",
        description: "Unable to connect to authentication service. Using demo mode.",
        variant: "destructive"
      });
      
      // Create mock user
      const mockUser = createMockUser('Demo User', credentials.email);
      setUserAndToken(mockUser, 'mock-token-' + Date.now());
      return true;
    }
  },
  
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
      const response = await apiRequest<AuthResponse>('/auth/register', 'POST', credentials);
      
      if (response.success && response.data) {
        setUserAndToken(response.data.user, response.data.token);
        toast({
          title: "Account created",
          description: `Welcome to AgentX AI, ${response.data.user.name}!`,
        });
        return true;
      } else {
        // If API fails, check if we should use fallback mode
        if (response.error?.includes('Failed to fetch') || response.error?.includes('Network error')) {
          // Mock registration for demo/development
          console.log('API unavailable, using mock registration');
          
          // Simple validation
          if (!credentials.name || !credentials.email || !credentials.password) {
            toast({
              title: "Registration failed",
              description: "Name, email and password are required",
              variant: "destructive"
            });
            return false;
          }
          
          // Create mock user
          const mockUser = createMockUser(credentials.name, credentials.email);
          setUserAndToken(mockUser, 'mock-token-' + Date.now());
          
          toast({
            title: "Account created (Demo Mode)",
            description: `Welcome to AgentX AI, ${credentials.name}! Note: Using offline mode.`,
          });
          return true;
        }
        
        toast({
          title: "Registration failed",
          description: response.error || "Could not create your account",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Fallback for any unexpected errors
      toast({
        title: "Registration error",
        description: "Unable to connect to authentication service. Using demo mode.",
        variant: "destructive"
      });
      
      // Create mock user
      const mockUser = createMockUser(credentials.name, credentials.email);
      setUserAndToken(mockUser, 'mock-token-' + Date.now());
      return true;
    }
  },
  
  // Login with Google
  loginWithGoogle: async (): Promise<void> => {
    try {
      // Try the regular OAuth flow
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.agentx-ai.com/v1';
      
      // First check if API is available
      try {
        await fetch(`${apiUrl}/health`, { method: 'GET', mode: 'no-cors' });
        
        // If we get here, API might be available, open the OAuth window
        window.open(
          `${apiUrl}/auth/google`,
          'Google Sign In',
          `width=${width},height=${height},left=${left},top=${top}`
        );
        
        // Listen for OAuth callback message
        window.addEventListener('message', async (event) => {
          // Verify origin for security
          if (event.origin !== window.location.origin) return;
          
          const { type, token, user } = event.data;
          
          if (type === 'oauth_success' && token && user) {
            setUserAndToken(user, token);
            toast({
              title: "Google login successful",
              description: `Welcome back, ${user.name}!`,
            });
            window.location.reload();
          }
        }, { once: true });
        
      } catch (error) {
        // API unreachable, use fallback
        console.log('API unavailable, using mock Google login');
        
        // Create a mock user with Google in the name
        const mockUser = createMockUser('Google User', `user-${Date.now()}@gmail.com`);
        setUserAndToken(mockUser, 'mock-google-token-' + Date.now());
        
        toast({
          title: "Google login (Demo Mode)",
          description: "Logged in with demo Google account. Note: Using offline mode.",
        });
        
        // Reload to refresh auth state
        setTimeout(() => window.location.reload(), 1000);
      }
      
    } catch (error) {
      console.error('Google login error:', error);
      
      // Fallback
      const mockUser = createMockUser('Google User', `user-${Date.now()}@gmail.com`);
      setUserAndToken(mockUser, 'mock-google-token-' + Date.now());
      
      toast({
        title: "Google login (Demo Mode)",
        description: "Logged in with demo Google account",
      });
      
      // Reload to refresh auth state
      setTimeout(() => window.location.reload(), 1000);
    }
  },
  
  // Login with Apple
  loginWithApple: async (): Promise<void> => {
    try {
      // Try the regular OAuth flow
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.agentx-ai.com/v1';
      
      // First check if API is available
      try {
        await fetch(`${apiUrl}/health`, { method: 'GET', mode: 'no-cors' });
        
        // If we get here, API might be available, open the OAuth window
        window.open(
          `${apiUrl}/auth/apple`,
          'Apple Sign In',
          `width=${width},height=${height},left=${left},top=${top}`
        );
        
        // Listen for OAuth callback message
        window.addEventListener('message', async (event) => {
          // Verify origin for security
          if (event.origin !== window.location.origin) return;
          
          const { type, token, user } = event.data;
          
          if (type === 'oauth_success' && token && user) {
            setUserAndToken(user, token);
            toast({
              title: "Apple login successful",
              description: `Welcome back, ${user.name}!`,
            });
            window.location.reload();
          }
        }, { once: true });
        
      } catch (error) {
        // API unreachable, use fallback
        console.log('API unavailable, using mock Apple login');
        
        // Create a mock user with Apple in the name
        const mockUser = createMockUser('Apple User', `user-${Date.now()}@icloud.com`);
        setUserAndToken(mockUser, 'mock-apple-token-' + Date.now());
        
        toast({
          title: "Apple login (Demo Mode)",
          description: "Logged in with demo Apple account. Note: Using offline mode.",
        });
        
        // Reload to refresh auth state
        setTimeout(() => window.location.reload(), 1000);
      }
      
    } catch (error) {
      console.error('Apple login error:', error);
      
      // Fallback
      const mockUser = createMockUser('Apple User', `user-${Date.now()}@icloud.com`);
      setUserAndToken(mockUser, 'mock-apple-token-' + Date.now());
      
      toast({
        title: "Apple login (Demo Mode)",
        description: "Logged in with demo Apple account",
      });
      
      // Reload to refresh auth state
      setTimeout(() => window.location.reload(), 1000);
    }
  },
  
  // Logout user
  logout: (): void => {
    clearUserAndToken();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  },
  
  // Refresh token if needed
  refreshToken: async (): Promise<boolean> => {
    try {
      const response = await apiRequest<AuthResponse>('/auth/refresh', 'POST');
      
      if (response.success && response.data) {
        setUserAndToken(response.data.user, response.data.token);
        return true;
      }
      
      // If API unavailable but user exists in local storage, keep them logged in
      if (getUser() && (response.error?.includes('Failed to fetch') || response.error?.includes('Network error'))) {
        console.log('API unavailable for token refresh, keeping existing session');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If there's a user in localStorage, assume they're still authenticated
      // This allows offline usage to continue
      return !!getUser();
    }
  }
};

// Create an auth context provider
export const createAuthListener = () => {
  // Setup listener for auth token changes (useful for multiple tabs)
  window.addEventListener('storage', (event) => {
    if (event.key === 'auth_token') {
      // Token changed in another tab
      if (!event.newValue) {
        // Another tab logged out, refresh the page
        window.location.reload();
      }
    }
  });
  
  // Check token validity on page load
  const checkTokenValidity = async () => {
    if (AuthService.isAuthenticated()) {
      // Silently attempt to refresh token in the background
      await AuthService.refreshToken();
    }
  };
  
  checkTokenValidity();
  
  // Set up periodic token refresh (every 30 minutes)
  setInterval(checkTokenValidity, 30 * 60 * 1000);
};
