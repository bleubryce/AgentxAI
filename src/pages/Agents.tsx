
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth";
import { AgentService, AgentFeature } from "@/services/agents";
import SubscriptionModal from "@/components/SubscriptionModal";
import { 
  BarChart3, Users, FileText, Home, MessageSquare, 
  Pencil, Check, X, AlertCircle, ChevronRight,
  FileUp, Zap, Search, Share2
} from "lucide-react";

const Agents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [requiredFeature, setRequiredFeature] = useState<string>();
  
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getCurrentUser();
  
  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    toast({
      title: "Authentication Required",
      description: "Please sign in to access AI agents",
      variant: "destructive"
    });
  }
  
  // Lead Query
  const { data: leadsData } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const response = await AgentService.LeadGeneration.getLeads();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch leads');
      }
      return response.data || [];
    },
    enabled: isAuthenticated && AuthService.hasFeatureAccess('lead-generation')
  });
  
  // Documents Query
  const { data: documentsData } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await AgentService.DocumentManagement.getDocuments();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch documents');
      }
      return response.data || [];
    },
    enabled: isAuthenticated && AuthService.hasFeatureAccess('document-management')
  });
  
  // Properties Query
  const { data: propertiesData } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await AgentService.PropertyMatching.getProperties();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch properties');
      }
      return response.data || [];
    },
    enabled: isAuthenticated && AuthService.hasFeatureAccess('property-matching')
  });
  
  // Client Updates Query
  const { data: updatesData } = useQuery({
    queryKey: ['updates'],
    queryFn: async () => {
      const response = await AgentService.ClientCommunication.getUpdates();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch updates');
      }
      return response.data || [];
    },
    enabled: isAuthenticated && AuthService.hasFeatureAccess('client-communication')
  });
  
  // Content Query
  const { data: contentData } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const response = await AgentService.ContentCreation.getSavedContent();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch content');
      }
      return response.data || [];
    },
    enabled: isAuthenticated && AuthService.hasFeatureAccess('content-creation')
  });
  
  const handleAgentAccess = (feature: AgentFeature, featureName: string) => {
    if (!AuthService.hasFeatureAccess(feature)) {
      setRequiredFeature(featureName);
      setIsSubscriptionModalOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-bolt-darker text-white">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-clash font-semibold">
                AI <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Agents</span>
              </h1>
              <p className="text-gray-400 mt-2">Automated real estate tools powered by artificial intelligence</p>
            </div>
            
            {user?.subscription ? (
              <div className="bg-bolt-darkblue/30 border border-white/10 rounded-lg px-4 py-2 flex items-center space-x-2">
                <span className={`inline-block w-2 h-2 rounded-full ${user.subscription.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span className="text-sm">{user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)} Plan</span>
                <span className="text-xs text-gray-400">({user.subscription.status})</span>
              </div>
            ) : (
              <Button 
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
              >
                <Zap className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="lead-generation" className="space-y-6">
            <TabsList className="bg-bolt-darkblue/30 border border-white/10 p-1 rounded-xl w-full overflow-x-auto flex whitespace-nowrap">
              <TabsTrigger value="lead-generation" className="flex items-center data-[state=active]:bg-bolt-blue/30">
                <Users className="mr-2 h-4 w-4" />
                <span>Lead Generation</span>
              </TabsTrigger>
              <TabsTrigger value="document-management" className="flex items-center data-[state=active]:bg-bolt-blue/30">
                <FileText className="mr-2 h-4 w-4" />
                <span>Document Management</span>
              </TabsTrigger>
              <TabsTrigger value="property-matching" className="flex items-center data-[state=active]:bg-bolt-blue/30">
                <Home className="mr-2 h-4 w-4" />
                <span>Property Matching</span>
              </TabsTrigger>
              <TabsTrigger value="client-communication" className="flex items-center data-[state=active]:bg-bolt-blue/30">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Client Communication</span>
              </TabsTrigger>
              <TabsTrigger value="content-creation" className="flex items-center data-[state=active]:bg-bolt-blue/30">
                <Pencil className="mr-2 h-4 w-4" />
                <span>Content Creation</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Lead Generation Tab */}
            <TabsContent value="lead-generation" className="space-y-6">
              {AuthService.hasFeatureAccess('lead-generation') ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="text-lg font-medium">Hot Leads</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {leadsData?.filter(lead => lead.category === 'hot').length || 0}
                      </div>
                      <p className="text-sm text-gray-400">High-probability leads ready for immediate contact</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-yellow-500" />
                        </div>
                        <h3 className="text-lg font-medium">Warm Leads</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {leadsData?.filter(lead => lead.category === 'warm').length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Qualified leads that need nurturing</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-medium">Cold Leads</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {leadsData?.filter(lead => lead.category === 'cold').length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Early-stage leads that require follow-up</p>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-medium">Recent Qualified Leads</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-bolt-darkblue/20">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Category</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Score</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Created</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leadsData && leadsData.length > 0 ? (
                            leadsData.map((lead) => (
                              <tr key={lead.id} className="border-t border-white/5">
                                <td className="py-3 px-4">
                                  <div>
                                    <div className="font-medium">{lead.name}</div>
                                    <div className="text-sm text-gray-400">{lead.email}</div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    lead.category === 'hot' ? 'bg-green-500/10 text-green-500' :
                                    lead.category === 'warm' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-blue-500/10 text-blue-500'
                                  }`}>
                                    {lead.category.charAt(0).toUpperCase() + lead.category.slice(1)}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{lead.score}/100</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    lead.status === 'converted' ? 'bg-green-500/10 text-green-500' :
                                    lead.status === 'qualified' ? 'bg-blue-500/10 text-blue-500' :
                                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-500' :
                                    lead.status === 'lost' ? 'bg-red-500/10 text-red-500' :
                                    'bg-white/10 text-white'
                                  }`}>
                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-400">
                                  {new Date(lead.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="outline" size="sm" className="text-bolt-blue border-bolt-blue/20 hover:bg-bolt-blue/10">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="border-t border-white/5">
                              <td colSpan={6} className="py-6 text-center text-gray-400">
                                No leads found. Start by adding new leads.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-white/10 bg-bolt-darkblue/20 flex justify-between items-center">
                      <p className="text-sm text-gray-400">Showing {leadsData?.length || 0} leads</p>
                      <Button size="sm" className="bg-bolt-darkblue hover:bg-bolt-blue/30">
                        Add New Lead
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-bolt-darkblue/30 mx-auto flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-bolt-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Lead Generation Agent</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Automatically qualify, score, and prioritize leads using AI to identify the most valuable prospects.
                  </p>
                  <Button 
                    onClick={() => handleAgentAccess('lead-generation', 'Lead Generation Agent')}
                    className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Unlock Lead Generation
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Document Management Tab */}
            <TabsContent value="document-management" className="space-y-6">
              {AuthService.hasFeatureAccess('document-management') ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-bolt-blue" />
                        </div>
                        <h3 className="text-lg font-medium">Total Documents</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {documentsData?.length || 0}
                      </div>
                      <p className="text-sm text-gray-400">All documents processed by AI</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <h3 className="text-lg font-medium">Issues Found</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {documentsData?.reduce((total, doc) => total + (doc.issues?.length || 0), 0) || 0}
                      </div>
                      <p className="text-sm text-gray-400">Potential issues identified in documents</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="text-lg font-medium">Approved</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {documentsData?.filter(doc => doc.status === 'approved').length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Documents verified and approved</p>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-medium">Recent Documents</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-bolt-darkblue/20">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Document</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Type</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Issues</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Last Updated</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentsData && documentsData.length > 0 ? (
                            documentsData.map((doc) => (
                              <tr key={doc.id} className="border-t border-white/5">
                                <td className="py-3 px-4">
                                  <div className="font-medium">{doc.title}</div>
                                </td>
                                <td className="py-3 px-4 capitalize">{doc.type}</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    doc.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                                    doc.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                    doc.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-white/10 text-white'
                                  }`}>
                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  {doc.issues && doc.issues.length > 0 ? (
                                    <span className="text-red-500">{doc.issues.length} issues</span>
                                  ) : (
                                    <span className="text-green-500">No issues</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-400">
                                  {new Date(doc.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="outline" size="sm" className="text-bolt-blue border-bolt-blue/20 hover:bg-bolt-blue/10">
                                    View Document
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="border-t border-white/5">
                              <td colSpan={6} className="py-6 text-center text-gray-400">
                                No documents found. Upload a document to analyze.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-white/10 bg-bolt-darkblue/20 flex justify-between items-center">
                      <p className="text-sm text-gray-400">Showing {documentsData?.length || 0} documents</p>
                      <Button size="sm" className="bg-bolt-darkblue hover:bg-bolt-blue/30">
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-bolt-darkblue/30 mx-auto flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-bolt-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Document Management Agent</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Analyze contracts and documents automatically to identify potential issues and ensure compliance.
                  </p>
                  <Button 
                    onClick={() => handleAgentAccess('document-management', 'Document Management Agent')}
                    className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Unlock Document Management
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Property Matching Tab */}
            <TabsContent value="property-matching" className="space-y-6">
              {AuthService.hasFeatureAccess('property-matching') ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                          <Home className="h-5 w-5 text-bolt-blue" />
                        </div>
                        <h3 className="text-lg font-medium">Available Properties</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {propertiesData?.length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Properties in your database</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-medium">Active Buyers</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">0</div>
                      <p className="text-sm text-gray-400">Buyers with saved preferences</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="text-lg font-medium">Matched Properties</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">0</div>
                      <p className="text-sm text-gray-400">Successful property matches</p>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                      <h3 className="text-xl font-medium">Property Inventory</h3>
                      <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search properties..."
                          className="w-full bg-bolt-darkblue/30 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-bolt-darkblue/20">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Property</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Type</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Price</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Beds/Baths</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Size</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {propertiesData && propertiesData.length > 0 ? (
                            propertiesData.map((property) => (
                              <tr key={property.id} className="border-t border-white/5">
                                <td className="py-3 px-4">
                                  <div className="font-medium">{property.address}</div>
                                </td>
                                <td className="py-3 px-4 capitalize">{property.type}</td>
                                <td className="py-3 px-4">${property.price.toLocaleString()}</td>
                                <td className="py-3 px-4">{property.bedrooms} / {property.bathrooms}</td>
                                <td className="py-3 px-4">{property.squareFeet.toLocaleString()} sq ft</td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="outline" size="sm" className="text-bolt-blue border-bolt-blue/20 hover:bg-bolt-blue/10 mr-2">
                                    View
                                  </Button>
                                  <Button size="sm" className="bg-bolt-blue hover:bg-bolt-blue/80">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="border-t border-white/5">
                              <td colSpan={6} className="py-6 text-center text-gray-400">
                                No properties found. Add properties to start matching.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-white/10 bg-bolt-darkblue/20 flex justify-between items-center">
                      <p className="text-sm text-gray-400">Showing {propertiesData?.length || 0} properties</p>
                      <Button size="sm" className="bg-bolt-darkblue hover:bg-bolt-blue/30">
                        Add Property
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-bolt-darkblue/30 mx-auto flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-bolt-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Property Matching Agent</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Match buyers with perfect properties using AI that understands preferences and predicts satisfaction.
                  </p>
                  <Button 
                    onClick={() => handleAgentAccess('property-matching', 'Property Matching Agent')}
                    className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Unlock Property Matching
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Client Communication Tab */}
            <TabsContent value="client-communication" className="space-y-6">
              {AuthService.hasFeatureAccess('client-communication') ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-bolt-blue" />
                        </div>
                        <h3 className="text-lg font-medium">Total Updates</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {updatesData?.length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Communications sent to clients</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="text-lg font-medium">Read Updates</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {updatesData?.filter(update => update.readAt).length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Updates opened by clients</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <h3 className="text-lg font-medium">Response Required</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {updatesData?.filter(update => update.responseRequired && !update.responded).length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Updates awaiting client response</p>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-medium">Recent Client Updates</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-bolt-darkblue/20">
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Title</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Type</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Sent Via</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Sent At</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {updatesData && updatesData.length > 0 ? (
                            updatesData.map((update) => (
                              <tr key={update.id} className="border-t border-white/5">
                                <td className="py-3 px-4">
                                  <div className="font-medium">{update.title}</div>
                                </td>
                                <td className="py-3 px-4 capitalize">{update.type}</td>
                                <td className="py-3 px-4">
                                  {update.sentVia.map(via => via.charAt(0).toUpperCase() + via.slice(1)).join(', ')}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-400">
                                  {new Date(update.sentAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  {update.readAt ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">Read</span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">Unread</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="outline" size="sm" className="text-bolt-blue border-bolt-blue/20 hover:bg-bolt-blue/10">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="border-t border-white/5">
                              <td colSpan={6} className="py-6 text-center text-gray-400">
                                No client updates found. Create an update to get started.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-white/10 bg-bolt-darkblue/20 flex justify-between items-center">
                      <p className="text-sm text-gray-400">Showing {updatesData?.length || 0} updates</p>
                      <Button size="sm" className="bg-bolt-darkblue hover:bg-bolt-blue/30">
                        Create Update
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-bolt-darkblue/30 mx-auto flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-bolt-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Client Communication Agent</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Automate client updates, transaction progress reports, and follow-ups to keep clients informed.
                  </p>
                  <Button 
                    onClick={() => handleAgentAccess('client-communication', 'Client Communication Agent')}
                    className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Unlock Client Communication
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Content Creation Tab */}
            <TabsContent value="content-creation" className="space-y-6">
              {AuthService.hasFeatureAccess('content-creation') ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                          <Pencil className="h-5 w-5 text-bolt-blue" />
                        </div>
                        <h3 className="text-lg font-medium">Total Content</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {contentData?.length || 0}
                      </div>
                      <p className="text-sm text-gray-400">Pieces of content created</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-medium">Property Descriptions</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {contentData?.filter(content => content.type === 'property-description').length || 0}
                      </div>
                      <p className="text-sm text-gray-400">AI-written property listings</p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Share2 className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-medium">Social Posts</h3>
                      </div>
                      <div className="text-3xl font-bold mb-3">
                        {contentData?.filter(content => content.type === 'social-post').length || 0}
                      </div>
                      <p className="text-sm text-gray-400">AI-generated social media content</p>
                    </div>
                  </div>
                  
                  {contentData && contentData.length > 0 ? (
                    <div className="glass-card rounded-xl p-6 space-y-6">
                      <h3 className="text-xl font-medium">Recent Content</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contentData.slice(0, 4).map((content) => (
                          <div key={content.id} className="glass-card p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  content.type === 'property-description' ? 'bg-purple-500/10 text-purple-500' :
                                  content.type === 'social-post' ? 'bg-blue-500/10 text-blue-500' :
                                  content.type === 'email' ? 'bg-green-500/10 text-green-500' :
                                  'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                  {content.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </span>
                                <p className="text-xs text-gray-400 mt-1">
                                  Created {new Date(content.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Button variant="outline" size="sm" className="text-bolt-blue border-bolt-blue/20 hover:bg-bolt-blue/10">
                                Edit
                              </Button>
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-4 mb-4">
                              {content.content}
                            </p>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-white/70 border-white/10 hover:bg-white/5">
                                Copy
                              </Button>
                              <Button variant="outline" size="sm" className="text-white/70 border-white/10 hover:bg-white/5">
                                Share
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-center">
                        <Button className="text-bolt-blue">
                          View All Content <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card rounded-xl p-8 text-center">
                      <Pencil className="h-12 w-12 text-bolt-blue mx-auto mb-6 opacity-50" />
                      <h3 className="text-xl font-medium mb-2">No Content Created Yet</h3>
                      <p className="text-gray-400 max-w-md mx-auto mb-6">
                        Use the AI Content Creation Agent to generate property descriptions, social media posts, emails, and more.
                      </p>
                      <Button 
                        className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
                      >
                        Create New Content
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-bolt-darkblue/30 mx-auto flex items-center justify-center mb-4">
                    <Pencil className="h-8 w-8 text-bolt-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Content Creation Agent</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Generate compelling property descriptions, social media posts, email campaigns, and more with AI.
                  </p>
                  <Button 
                    onClick={() => handleAgentAccess('content-creation', 'Content Creation Agent')}
                    className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Unlock Content Creation
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        requiredFeature={requiredFeature}
      />
    </div>
  );
};

export default Agents;
