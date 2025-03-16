
import apiRequest, { ApiResponse } from "./api";
import { AuthService } from "./auth";

// Agent Feature Types
export type AgentFeature = 
  | 'lead-generation' 
  | 'document-management' 
  | 'property-matching' 
  | 'client-communication' 
  | 'content-creation';

// Lead Generation Types
export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  source?: string;
  notes?: string;
  interests?: string[];
}

export interface QualifiedLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  score: number;
  category: 'hot' | 'warm' | 'cold';
  probability: number;
  estimatedValue?: number;
  followUpDate?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
}

// Document Management Types
export interface Document {
  id: string;
  title: string;
  type: 'contract' | 'disclosure' | 'inspection' | 'appraisal' | 'other';
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  url?: string;
  issues?: DocumentIssue[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentIssue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  page?: number;
  resolved: boolean;
}

// Property Matching Types
export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  type: 'house' | 'condo' | 'apartment' | 'land' | 'commercial';
  features: string[];
  description?: string;
  images?: string[];
  createdAt: string;
}

export interface BuyerPreferences {
  id: string;
  priceRange: { min: number; max: number };
  location: string[];
  bedrooms: number[];
  bathrooms: number[];
  propertyType: string[];
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
}

export interface PropertyMatch {
  id: string;
  property: Property;
  matchScore: number;
  matchReasons: string[];
  createdAt: string;
}

// Client Communication Types
export interface ClientUpdate {
  id: string;
  clientId: string;
  type: 'transaction' | 'feedback' | 'nurture';
  title: string;
  message: string;
  sentVia: string[];
  sentAt: string;
  readAt?: string;
  responseRequired: boolean;
  responded: boolean;
}

// Content Creation Types
export interface ContentRequest {
  type: 'property-description' | 'social-post' | 'email' | 'ad';
  propertyId?: string;
  target?: 'buyers' | 'sellers' | 'investors' | 'renters';
  tone?: 'professional' | 'casual' | 'luxury' | 'friendly';
  platform?: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'email';
  length?: 'short' | 'medium' | 'long';
  highlights?: string[];
}

export interface GeneratedContent {
  id: string;
  type: string;
  content: string;
  images?: string[];
  variations: string[];
  createdAt: string;
}

// Main Agent Service
export const AgentService = {
  // Helper function to check feature access
  checkFeatureAccess: (feature: AgentFeature): boolean => {
    if (!AuthService.isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature",
        variant: "destructive"
      });
      return false;
    }

    if (!AuthService.hasFeatureAccess(feature)) {
      toast({
        title: "Subscription Required",
        description: `Your current plan doesn't include access to this feature`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  },

  // Lead Generation Agent
  LeadGeneration: {
    generateLead: async (leadData: LeadData): Promise<ApiResponse<QualifiedLead>> => {
      if (!AgentService.checkFeatureAccess('lead-generation')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<QualifiedLead>('/agents/lead-generation/qualify', 'POST', leadData);
    },

    getLeads: async (): Promise<ApiResponse<QualifiedLead[]>> => {
      if (!AgentService.checkFeatureAccess('lead-generation')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<QualifiedLead[]>('/agents/lead-generation/leads', 'GET', undefined, true);
    },

    updateLeadStatus: async (leadId: string, status: QualifiedLead['status']): Promise<ApiResponse<QualifiedLead>> => {
      if (!AgentService.checkFeatureAccess('lead-generation')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<QualifiedLead>(`/agents/lead-generation/leads/${leadId}/status`, 'PUT', { status });
    }
  },

  // Document Management Agent
  DocumentManagement: {
    analyzeDocument: async (documentUrl: string, type: Document['type']): Promise<ApiResponse<Document>> => {
      if (!AgentService.checkFeatureAccess('document-management')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<Document>('/agents/document-management/analyze', 'POST', { documentUrl, type });
    },

    getDocuments: async (): Promise<ApiResponse<Document[]>> => {
      if (!AgentService.checkFeatureAccess('document-management')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<Document[]>('/agents/document-management/documents', 'GET', undefined, true);
    },

    resolveIssue: async (documentId: string, issueId: string): Promise<ApiResponse<Document>> => {
      if (!AgentService.checkFeatureAccess('document-management')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<Document>(`/agents/document-management/documents/${documentId}/issues/${issueId}/resolve`, 'PUT');
    }
  },

  // Property Matching Agent
  PropertyMatching: {
    createBuyerPreferences: async (preferences: Omit<BuyerPreferences, 'id'>): Promise<ApiResponse<BuyerPreferences>> => {
      if (!AgentService.checkFeatureAccess('property-matching')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<BuyerPreferences>('/agents/property-matching/preferences', 'POST', preferences);
    },

    getMatches: async (preferencesId: string): Promise<ApiResponse<PropertyMatch[]>> => {
      if (!AgentService.checkFeatureAccess('property-matching')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<PropertyMatch[]>(`/agents/property-matching/matches/${preferencesId}`, 'GET', undefined, true);
    },

    getProperties: async (): Promise<ApiResponse<Property[]>> => {
      if (!AgentService.checkFeatureAccess('property-matching')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<Property[]>('/agents/property-matching/properties', 'GET', undefined, true);
    }
  },

  // Client Communication Agent
  ClientCommunication: {
    createUpdate: async (clientId: string, update: Omit<ClientUpdate, 'id' | 'clientId' | 'sentAt' | 'readAt' | 'responded'>): Promise<ApiResponse<ClientUpdate>> => {
      if (!AgentService.checkFeatureAccess('client-communication')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<ClientUpdate>('/agents/client-communication/updates', 'POST', { clientId, ...update });
    },

    getUpdates: async (): Promise<ApiResponse<ClientUpdate[]>> => {
      if (!AgentService.checkFeatureAccess('client-communication')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<ClientUpdate[]>('/agents/client-communication/updates', 'GET', undefined, true);
    }
  },

  // Content Creation Agent
  ContentCreation: {
    generateContent: async (request: ContentRequest): Promise<ApiResponse<GeneratedContent>> => {
      if (!AgentService.checkFeatureAccess('content-creation')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<GeneratedContent>('/agents/content-creation/generate', 'POST', request);
    },

    getSavedContent: async (): Promise<ApiResponse<GeneratedContent[]>> => {
      if (!AgentService.checkFeatureAccess('content-creation')) {
        return { success: false, error: 'Feature access denied' };
      }
      
      return apiRequest<GeneratedContent[]>('/agents/content-creation/saved', 'GET', undefined, true);
    }
  }
};
