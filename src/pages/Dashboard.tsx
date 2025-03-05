
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AIService, AnalyticsData } from "@/services/api";
import { AuthService } from "@/services/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const user = AuthService.getCurrentUser();
  
  // Fetch analytics data with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await AIService.getAnalytics();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || "Failed to fetch analytics");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  useEffect(() => {
    document.title = "Dashboard | AgentX AI";
  }, []);
  
  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading analytics",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    }
  }, [error, toast]);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gradient-to-b from-bolt-dark to-bolt-darker">
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}</h1>
            <p className="text-gray-400">Here's your AI-powered real estate analytics dashboard</p>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Leads Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Leads</CardTitle>
                    <CardDescription>AI-generated quality leads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-12 w-24" />
                    ) : (
                      <div className="text-4xl font-bold">{data?.totalLeads || 0}</div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Conversion Rate */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Conversion Rate</CardTitle>
                    <CardDescription>Lead to client conversion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-12 w-24" />
                    ) : (
                      <div className="text-4xl font-bold">{data?.conversionRate || 0}%</div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Response Time */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Avg. Response Time</CardTitle>
                    <CardDescription>Time to respond to leads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-12 w-24" />
                    ) : (
                      <div className="text-4xl font-bold">{data?.averageResponseTime || 0} min</div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Leads Over Time Chart */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Leads Generated Over Time</CardTitle>
                  <CardDescription>AI-powered lead acquisition trend</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data?.leadsPerDay || []}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="leads" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lead Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Categories</CardTitle>
                    <CardDescription>AI-classified lead quality distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {isLoading ? (
                      <Skeleton className="h-[300px] w-[300px] rounded-full" />
                    ) : (
                      <ResponsiveContainer width={300} height={300}>
                        <PieChart>
                          <Pie
                            data={data?.leadsByCategory || []}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="category"
                            label={({ category }) => category}
                          >
                            {data?.leadsByCategory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
                
                {/* Lead Quality Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Quality Analysis</CardTitle>
                    <CardDescription>AI-powered insights on your leads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Hot Leads</span>
                          <span className="font-medium text-green-500">
                            {data?.leadsByCategory.find(c => c.category === 'hot')?.count || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Warm Leads</span>
                          <span className="font-medium text-yellow-500">
                            {data?.leadsByCategory.find(c => c.category === 'warm')?.count || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cold Leads</span>
                          <span className="font-medium text-blue-500">
                            {data?.leadsByCategory.find(c => c.category === 'cold')?.count || 0}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI System Performance</CardTitle>
                  <CardDescription>Real-time AI system metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Average AI Response Time</span>
                        <span className="font-medium">0.8s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>AI Classification Accuracy</span>
                        <span className="font-medium">98.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>API Calls (Last 24h)</span>
                        <span className="font-medium">243</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cache Hit Rate</span>
                        <span className="font-medium">76%</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
