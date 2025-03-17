
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, Check, Zap } from 'lucide-react';
import apiRequest from '@/services/api';
import { AuthService } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredFeature?: string;
}

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  agentAccess: string[];
  recommended?: boolean;
  hasTrial?: boolean;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, requiredFeature }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, hasActiveSubscription } = useAuth();
  
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      description: 'Essential tools for real estate professionals',
      features: [
        { name: 'Lead Generation Agent (5 leads/mo)', included: true },
        { name: 'Property Matching Agent', included: true },
        { name: 'Client Communication Agent', included: true },
        { name: 'Document Management Agent', included: false },
        { name: 'Content Creation Agent', included: false },
        { name: 'Premium Support', included: false },
      ],
      agentAccess: ['lead-generation', 'property-matching', 'client-communication'],
      hasTrial: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      description: 'Advanced tools for growing your business',
      features: [
        { name: 'Lead Generation Agent (20 leads/mo)', included: true },
        { name: 'Property Matching Agent', included: true },
        { name: 'Client Communication Agent', included: true },
        { name: 'Document Management Agent', included: true },
        { name: 'Content Creation Agent', included: true },
        { name: 'Premium Support', included: false },
      ],
      agentAccess: ['lead-generation', 'property-matching', 'client-communication', 'document-management', 'content-creation'],
      recommended: true,
      hasTrial: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 399,
      description: 'Complete solution for real estate teams',
      features: [
        { name: 'Lead Generation Agent (unlimited)', included: true },
        { name: 'Property Matching Agent', included: true },
        { name: 'Client Communication Agent', included: true },
        { name: 'Document Management Agent', included: true },
        { name: 'Content Creation Agent', included: true },
        { name: 'Premium Support', included: true },
      ],
      agentAccess: ['lead-generation', 'property-matching', 'client-communication', 'document-management', 'content-creation'],
      hasTrial: false
    }
  ];
  
  const handleSelectPlan = async (planId: string) => {
    if (!AuthService.isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would typically redirect to a payment processor
      const response = await apiRequest('/subscription/create', 'POST', { planId });
      
      if (response.success) {
        toast({
          title: "Subscription Created",
          description: "Your subscription has been successfully created!",
        });
        // Force a token refresh to update user subscription info
        await AuthService.refreshToken();
        onClose();
      } else {
        toast({
          title: "Subscription Failed",
          description: response.error || "Could not process your subscription",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user already has this plan
  const userHasThisPlan = (plan: Plan) => {
    if (!hasActiveSubscription || !user?.subscription) return false;
    return user.subscription.plan === plan.id;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl bg-bolt-darker border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-clash">
            Choose Your AgentX AI Plan
          </DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        {requiredFeature && (
          <div className="bg-bolt-blue/10 border border-bolt-blue/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-bolt-blue">
              The feature you're trying to access requires a subscription that includes {requiredFeature}.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-xl overflow-hidden border ${
                plan.recommended 
                  ? "border-bolt-blue shadow-glow-blue" 
                  : "border-white/10"
              } bg-gradient-to-b from-bolt-darkblue/30 to-transparent p-5 flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-bolt-blue text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Recommended
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-1">/month</span>
              </div>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              
              <div className="space-y-3 flex-grow mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                      feature.included ? "bg-bolt-blue/20 text-bolt-blue" : "bg-gray-800 text-gray-500"
                    }`}>
                      {feature.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    </div>
                    <span className={feature.included ? "text-white" : "text-gray-500"}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isLoading || userHasThisPlan(plan)}
                className={`w-full ${
                  userHasThisPlan(plan) 
                    ? "bg-green-700 cursor-not-allowed" 
                    : plan.recommended
                    ? "button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple"
                    : "bg-bolt-darkblue hover:bg-bolt-blue/30"
                } rounded-full text-white font-medium transition-all duration-300`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </span>
                ) : userHasThisPlan(plan) ? (
                  <span className="flex items-center justify-center">
                    Current Plan
                    <Check className="ml-2 h-5 w-5" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {plan.hasTrial ? "Start 7-Day Trial" : "Select Plan"}
                    <Zap className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
              
              {plan.hasTrial && (
                <p className="text-center text-sm text-gray-400 mt-4">
                  Credit card required. 7-day limited feature trial.
                </p>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
