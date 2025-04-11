
import { toast } from "@/hooks/use-toast";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LeadGenerationResult {
  id: string;
  name: string;
  email: string;
  company: string;
  score: number;
  category: 'hot' | 'warm' | 'cold';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface AnalyticsData {
  totalLeads: number;
  conversionRate: number;
  averageResponseTime: number;
  leadsPerDay: {
    date: string;
    count: number;
  }[];
  leadsByCategory: {
    category: string;
    count: number;
  }[];
}

// Cache management
const cache: Record<string, { data: any; expiry: number }> = {};
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

// Helper functions
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

const clearCache = (key?: string) => {
  if (key) {
    delete cache[key];
  } else {
    Object.keys(cache).forEach(k => delete cache[k]);
  }
};

// Base API request function with authentication
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  useCache: boolean = false,
  customHeaders: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  // Check if user is authenticated for protected endpoints
  if (endpoint !== '/auth/login' && endpoint !== '/auth/register' && !isAuthenticated()) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this feature",
      variant: "destructive"
    });
    return {
      success: false,
      error: 'Authentication required'
    };
  }
  
  const cacheKey = useCache ? `${method}:${endpoint}:${JSON.stringify(data || {})}` : '';
  
  // Check cache if enabled
  if (useCache && cacheKey && cache[cacheKey] && cache[cacheKey].expiry > Date.now()) {
    console.log(`Using cached response for ${cacheKey}`);
    return { success: true, data: cache[cacheKey].data };
  }
  
  // Get authentication token
  const token = getAuthToken();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders
    };
    
    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };
    
    // Add body for non-GET requests
    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }
    
    console.log(`Making API request to ${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // For failed requests, try to parse JSON response first
    if (!response.ok) {
      let errorMessage = `API request failed with status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use default error message
      }
      
      // Handle authentication errors
      if (response.status === 401) {
        // Clear auth state if token is invalid
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        
        // Notify user
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
    
    const responseData = await response.json();
    
    // Cache successful response if caching is enabled
    if (useCache && cacheKey) {
      cache[cacheKey] = {
        data: responseData,
        expiry: Date.now() + CACHE_DURATION
      };
    }
    
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    
    // If it's a network error, provide a more user-friendly message
    let errorMessage = 'Network error. Please check your connection.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// AI Service APIs
export const AIService = {
  // AI Chat endpoints
  getChatResponse: async (message: string, conversationId?: string): Promise<ApiResponse<ChatMessage>> => {
    return apiRequest<ChatMessage>('/ai/chat', 'POST', {
      message,
      conversationId
    });
  },
  
  // AI Lead Generation endpoints
  generateLead: async (leadData: { name: string; email: string; company: string }): Promise<ApiResponse<LeadGenerationResult>> => {
    return apiRequest<LeadGenerationResult>('/ai/leads/generate', 'POST', leadData);
  },
  
  // AI Analytics endpoints
  getAnalytics: async (): Promise<ApiResponse<AnalyticsData>> => {
    return apiRequest<AnalyticsData>('/ai/analytics/summary', 'GET', undefined, true); // Cache analytics requests
  },
  
  // Utility - clear API cache
  clearCache
};

export default apiRequest;
