
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import FeaturesPage from "./pages/Features";
import PricingPage from "./pages/Pricing";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogPage from "./pages/Blog";
import CareersPage from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import AgentsDemos from "./pages/AgentsDemos";
import AgentDeployment from "./pages/AgentDeployment";
import MultiAgentChat from "./pages/MultiAgentChat";
import TestAuth from "./pages/TestAuth";
import { createAuthListener } from "./services/auth";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Create a new query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Initialize auth listener
createAuthListener();

// Page transition wrapper component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

// Protected route component with subscription check
const ProtectedRoute = ({ children, requiresSubscription = false, requiredFeature = "" }: { 
  children: React.ReactNode, 
  requiresSubscription?: boolean,
  requiredFeature?: string
}) => {
  const { isAuthenticated, isLoading, hasActiveSubscription, hasFeatureAccess } = useAuth();
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-bold text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if subscription is required but user doesn't have one
  if (requiresSubscription && !hasActiveSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  // Check if specific feature access is required
  if (requiredFeature && !hasFeatureAccess(requiredFeature)) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

// Routes container with AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes - no authentication required */}
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/features" element={<PageTransition><FeaturesPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/test-auth" element={<PageTransition><TestAuth /></PageTransition>} />
        <Route path="/agents-demos" element={<PageTransition><AgentsDemos /></PageTransition>} />
        
        {/* Semi-protected routes - require authentication but not subscription */}
        <Route 
          path="/agent-deployment" 
          element={
            <ProtectedRoute>
              <PageTransition><AgentDeployment /></PageTransition>
            </ProtectedRoute>
          } 
        />
        
        {/* Protected routes - require authentication and subscription */}
        <Route 
          path="/multi-agent-chat" 
          element={
            <ProtectedRoute requiresSubscription={true}>
              <PageTransition><MultiAgentChat /></PageTransition>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/agents/*" 
          element={
            <ProtectedRoute>
              <PageTransition><Agents /></PageTransition>
            </ProtectedRoute>
          } 
        />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
