
import { toast } from "@/hooks/use-toast";
import apiRequest from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
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
};

const clearUserAndToken = (): void => {
  localStorage.removeItem('user_info');
  localStorage.removeItem('auth_token');
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
  
  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    const response = await apiRequest<AuthResponse>('/auth/login', 'POST', credentials);
    
    if (response.success && response.data) {
      setUserAndToken(response.data.user, response.data.token);
      toast({
        title: "Welcome back",
        description: `You're now signed in as ${response.data.user.name}`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: response.error || "Invalid credentials",
        variant: "destructive"
      });
      return false;
    }
  },
  
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<boolean> => {
    const response = await apiRequest<AuthResponse>('/auth/register', 'POST', credentials);
    
    if (response.success && response.data) {
      setUserAndToken(response.data.user, response.data.token);
      toast({
        title: "Account created",
        description: `Welcome to AgentX AI, ${response.data.user.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Registration failed",
        description: response.error || "Could not create your account",
        variant: "destructive"
      });
      return false;
    }
  },
  
  // Login with Google
  loginWithGoogle: async (): Promise<void> => {
    // Open Google OAuth popup
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      `${process.env.VITE_API_URL || 'https://api.agentx-ai.com/v1'}/auth/google`,
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
        // Force refresh to update auth state
        window.location.reload();
      }
    }, { once: true });
  },
  
  // Logout user
  logout: (): void => {
    clearUserAndToken();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  }
};

// Create an auth context provider
export const createAuthListener = () => {
  // Setup listener for auth token changes (useful for multiple tabs)
  window.addEventListener('storage', (event) => {
    if (event.key === 'auth_token' && !event.newValue) {
      // Another tab logged out, refresh the page
      window.location.reload();
    }
  });
};
