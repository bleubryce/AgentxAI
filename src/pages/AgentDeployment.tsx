
import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Server, Database, Shield, BarChart, Clock, ArrowRight } from "lucide-react";

const AgentDeployment = () => {
  const [activeTab, setActiveTab] = useState("architecture");
  const [showConfigDialog, setShowConfigDialog] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bolt-dark to-bolt-darker">
      <Helmet>
        <title>Agent Deployment | AgentX AI</title>
        <meta 
          name="description" 
          content="Learn about our Lead Generation Agent System architecture, deployment options, and infrastructure requirements." 
        />
      </Helmet>
      
      <Navbar />
      
      <motion.main 
        className="flex-grow container mx-auto px-4 py-12"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Agent <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Deployment</span> System
          </motion.h1>
          <motion.p 
            className="text-lg text-white/70 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Comprehensive information about our Lead Generation Agent System architecture,
            deployment options, and infrastructure requirements.
          </motion.p>
        </div>
        
        <motion.div 
          variants={tabVariants}
          initial="hidden"
          animate="visible"
        >
          <Tabs defaultValue="architecture" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 bg-white/5 p-1 rounded-lg">
              <TabsTrigger value="architecture" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Architecture
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Infrastructure
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Monitoring
              </TabsTrigger>
              <TabsTrigger value="configuration" className="data-[state=active]:bg-gradient-to-r from-bolt-blue to-bolt-purple data-[state=active]:text-white">
                Configuration
              </TabsTrigger>
            </TabsList>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {activeTab === "architecture" && "System Architecture"}
                  {activeTab === "infrastructure" && "Infrastructure Requirements"}
                  {activeTab === "security" && "Security Implementation"}
                  {activeTab === "monitoring" && "Monitoring & Analytics"}
                  {activeTab === "configuration" && "System Configuration"}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {activeTab === "architecture" && "Overview of our Lead Generation Agent System components and their interactions."}
                  {activeTab === "infrastructure" && "Technical requirements for hosting and running the agent system."}
                  {activeTab === "security" && "Security measures implemented to protect data and system integrity."}
                  {activeTab === "monitoring" && "Tracking system performance, errors, and usage analytics."}
                  {activeTab === "configuration" && "Environment setup and agent configuration options."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="architecture" className="mt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">System Components</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Server className="h-5 w-5 text-bolt-blue" />
                              Backend Services
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                FastAPI for agent management
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                Python 3.9+ runtime environment
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                API routing and request handling
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Database className="h-5 w-5 text-bolt-purple" />
                              Data Management
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                MongoDB for agent and lead data
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                Redis for caching responses
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                Data persistence and backup
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <BarChart className="h-5 w-5 text-bolt-teal" />
                              Frontend Interface
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-teal" />
                                React/TypeScript UI components
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-teal" />
                                Tailwind CSS styling
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-teal" />
                                Agent interaction dashboard
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">System Flow</h3>
                      <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-bolt-blue/20 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-bolt-blue font-bold">User</span>
                            </div>
                            <p className="mt-2 text-sm text-white/70">Client Request</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-white/40 hidden md:block" />
                          <div className="text-center">
                            <div className="w-20 h-20 bg-bolt-purple/20 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-bolt-purple font-bold">API</span>
                            </div>
                            <p className="mt-2 text-sm text-white/70">FastAPI Backend</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-white/40 hidden md:block" />
                          <div className="text-center">
                            <div className="w-20 h-20 bg-bolt-teal/20 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-bolt-teal font-bold">Agent</span>
                            </div>
                            <p className="mt-2 text-sm text-white/70">LLM Processing</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-white/40 hidden md:block" />
                          <div className="text-center">
                            <div className="w-20 h-20 bg-bolt-purple/20 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-bolt-purple font-bold">DB</span>
                            </div>
                            <p className="mt-2 text-sm text-white/70">Data Storage</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-white/40 hidden md:block" />
                          <div className="text-center">
                            <div className="w-20 h-20 bg-bolt-blue/20 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-bolt-blue font-bold">UI</span>
                            </div>
                            <p className="mt-2 text-sm text-white/70">Response Display</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="infrastructure" className="mt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Containerization</h3>
                      <Card className="bg-white/10 border-white/20">
                        <CardContent className="pt-6">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-white/10">
                                <TableHead className="text-white">Component</TableHead>
                                <TableHead className="text-white">Container Image</TableHead>
                                <TableHead className="text-white">Resources</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="border-white/10">
                                <TableCell className="text-white/70">Backend API</TableCell>
                                <TableCell className="text-white/70">Python 3.9-slim / FastAPI</TableCell>
                                <TableCell className="text-white/70">2 CPU, 4GB RAM</TableCell>
                              </TableRow>
                              <TableRow className="border-white/10">
                                <TableCell className="text-white/70">MongoDB</TableCell>
                                <TableCell className="text-white/70">mongodb:5.0</TableCell>
                                <TableCell className="text-white/70">1 CPU, 2GB RAM</TableCell>
                              </TableRow>
                              <TableRow className="border-white/10">
                                <TableCell className="text-white/70">Redis Cache</TableCell>
                                <TableCell className="text-white/70">redis:alpine</TableCell>
                                <TableCell className="text-white/70">0.5 CPU, 1GB RAM</TableCell>
                              </TableRow>
                              <TableRow className="border-white/10">
                                <TableCell className="text-white/70">Frontend</TableCell>
                                <TableCell className="text-white/70">node:16-alpine</TableCell>
                                <TableCell className="text-white/70">0.5 CPU, 1GB RAM</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Kubernetes Requirements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Cluster Configuration</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                Kubernetes v1.21+ cluster
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                Min. 3 nodes for high availability
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                Auto-scaling node groups
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-blue" />
                                Load balancer service
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Deployment Services</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                Ingress controller (Nginx)
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                Cert-manager for SSL/TLS
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                Prometheus & Grafana monitoring
                              </li>
                              <li className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-bolt-purple" />
                                External secrets management
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Authentication & Authorization</h3>
                      <Card className="bg-white/10 border-white/20">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-bolt-blue" />
                                JWT Authentication
                              </h4>
                              <ul className="space-y-2 text-sm text-white/70">
                                <li>• Secure token-based authentication</li>
                                <li>• Token expiration and refresh mechanisms</li>
                                <li>• Role-based access control (RBAC)</li>
                                <li>• API key management for service accounts</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-bolt-purple" />
                                Data Protection
                              </h4>
                              <ul className="space-y-2 text-sm text-white/70">
                                <li>• End-to-end encryption for sensitive data</li>
                                <li>• Data masking for PII information</li>
                                <li>• MongoDB encryption at rest</li>
                                <li>• Secure API communications with TLS 1.3</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Security Measures</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Shield className="h-5 w-5 text-bolt-teal" />
                              Input Validation
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li>• Request payload validation</li>
                              <li>• Schema enforcement</li>
                              <li>• SQL/NoSQL injection prevention</li>
                              <li>• XSS protection measures</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Clock className="h-5 w-5 text-bolt-blue" />
                              Rate Limiting
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li>• IP-based rate limiting</li>
                              <li>• User-based quota management</li>
                              <li>• Redis-backed rate tracking</li>
                              <li>• Custom throttling policies</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <BarChart className="h-5 w-5 text-bolt-purple" />
                              Audit Logging
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li>• Comprehensive access logs</li>
                              <li>• Action trail for all operations</li>
                              <li>• Immutable audit history</li>
                              <li>• Anomaly detection alerts</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="monitoring" className="mt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Performance Metrics</h3>
                      <Card className="bg-white/10 border-white/20">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-medium mb-3">System Metrics</h4>
                              <ul className="space-y-2 text-sm text-white/70">
                                <li>• CPU/Memory usage tracking</li>
                                <li>• Request latency measurements</li>
                                <li>• Database query performance</li>
                                <li>• Cache hit/miss ratios</li>
                                <li>• Network traffic analysis</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-3">Agent Metrics</h4>
                              <ul className="space-y-2 text-sm text-white/70">
                                <li>• Agent response times</li>
                                <li>• Token usage by agent type</li>
                                <li>• Completion rate tracking</li>
                                <li>• Error rate by prompt type</li>
                                <li>• Usage patterns analysis</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Monitoring Tools</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Health Checks</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li>• Kubernetes liveness probes</li>
                              <li>• API endpoint status monitoring</li>
                              <li>• Database connectivity checks</li>
                              <li>• Automatic recovery procedures</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Error Tracking</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li>• Centralized error logging</li>
                              <li>• Error categorization</li>
                              <li>• Stack trace collection</li>
                              <li>• Error trend analysis</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Alert System</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-white/70">
                              <li>• Custom alert thresholds</li>
                              <li>• Multi-channel notifications</li>
                              <li>• Escalation policies</li>
                              <li>• On-call rotation management</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="configuration" className="mt-0">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Environment Configuration</h3>
                      <Card className="bg-white/10 border-white/20">
                        <CardContent className="pt-6">
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-white/10">
                                  <TableHead className="text-white">Environment Variable</TableHead>
                                  <TableHead className="text-white">Description</TableHead>
                                  <TableHead className="text-white">Example Value</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="border-white/10">
                                  <TableCell className="text-white/70">MONGODB_URI</TableCell>
                                  <TableCell className="text-white/70">MongoDB connection string</TableCell>
                                  <TableCell className="text-white/70">mongodb://user:pass@host:27017/db</TableCell>
                                </TableRow>
                                <TableRow className="border-white/10">
                                  <TableCell className="text-white/70">REDIS_URL</TableCell>
                                  <TableCell className="text-white/70">Redis cache connection</TableCell>
                                  <TableCell className="text-white/70">redis://user:pass@host:6379</TableCell>
                                </TableRow>
                                <TableRow className="border-white/10">
                                  <TableCell className="text-white/70">JWT_SECRET</TableCell>
                                  <TableCell className="text-white/70">Secret for JWT tokens</TableCell>
                                  <TableCell className="text-white/70">[secure random string]</TableCell>
                                </TableRow>
                                <TableRow className="border-white/10">
                                  <TableCell className="text-white/70">OPENAI_API_KEY</TableCell>
                                  <TableCell className="text-white/70">API key for OpenAI</TableCell>
                                  <TableCell className="text-white/70">sk-xxxxxxxxxxxx</TableCell>
                                </TableRow>
                                <TableRow className="border-white/10">
                                  <TableCell className="text-white/70">LOG_LEVEL</TableCell>
                                  <TableCell className="text-white/70">Application logging level</TableCell>
                                  <TableCell className="text-white/70">info</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Agent Configuration</h3>
                        <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-bolt-blue to-bolt-purple">
                              Configure New Agent
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-bolt-dark border-white/10">
                            <DialogHeader>
                              <DialogTitle className="text-white">Configure Lead Generation Agent</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="agent-name" className="text-white">Agent Name</Label>
                                <Input id="agent-name" placeholder="E.g., Premium Lead Generator" className="bg-white/10 border-white/20 text-white" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="agent-model" className="text-white">Agent Model</Label>
                                <Input id="agent-model" placeholder="E.g., gpt-4o" className="bg-white/10 border-white/20 text-white" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="max-tokens" className="text-white">Max Tokens</Label>
                                <Input id="max-tokens" type="number" placeholder="4096" className="bg-white/10 border-white/20 text-white" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="temperature" className="text-white">Temperature</Label>
                                <Input id="temperature" type="number" placeholder="0.7" step="0.1" min="0" max="1" className="bg-white/10 border-white/20 text-white" />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button className="bg-gradient-to-r from-bolt-blue to-bolt-purple w-full">
                                Save Configuration
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader>
                            <CardTitle className="text-lg">Agent Types</CardTitle>
                            <CardDescription className="text-white/70">
                              Supported agent configurations
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              <li className="pb-3 border-b border-white/10">
                                <div className="font-medium text-white mb-1">Basic Lead Generator</div>
                                <div className="text-sm text-white/70 mb-2">GPT-3.5 Turbo based lead qualification agent</div>
                                <div className="text-xs text-white/50">
                                  <span className="inline-block bg-white/10 rounded px-2 py-1 mr-2">3K tokens/min</span>
                                  <span className="inline-block bg-white/10 rounded px-2 py-1">Low complexity</span>
                                </div>
                              </li>
                              <li className="pb-3 border-b border-white/10">
                                <div className="font-medium text-white mb-1">Premium Lead Converter</div>
                                <div className="text-sm text-white/70 mb-2">GPT-4 based advanced lead generation with follow-up</div>
                                <div className="text-xs text-white/50">
                                  <span className="inline-block bg-white/10 rounded px-2 py-1 mr-2">8K tokens/min</span>
                                  <span className="inline-block bg-white/10 rounded px-2 py-1">Medium complexity</span>
                                </div>
                              </li>
                              <li>
                                <div className="font-medium text-white mb-1">Enterprise Lead Suite</div>
                                <div className="text-sm text-white/70 mb-2">Multi-model agent chain for full lead lifecycle</div>
                                <div className="text-xs text-white/50">
                                  <span className="inline-block bg-white/10 rounded px-2 py-1 mr-2">15K tokens/min</span>
                                  <span className="inline-block bg-white/10 rounded px-2 py-1">High complexity</span>
                                </div>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader>
                            <CardTitle className="text-lg">Rate Limiting</CardTitle>
                            <CardDescription className="text-white/70">
                              Usage quotas and rate limits
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              <li className="pb-3 border-b border-white/10">
                                <div className="font-medium text-white mb-1">Per-User Limits</div>
                                <div className="text-sm text-white/70">
                                  <ul className="space-y-1 mt-2">
                                    <li>• Free tier: 50 requests/day</li>
                                    <li>• Professional: 1,000 requests/day</li>
                                    <li>• Enterprise: Customizable limits</li>
                                  </ul>
                                </div>
                              </li>
                              <li className="pb-3 border-b border-white/10">
                                <div className="font-medium text-white mb-1">Concurrency Controls</div>
                                <div className="text-sm text-white/70">
                                  <ul className="space-y-1 mt-2">
                                    <li>• Free tier: 5 concurrent requests</li>
                                    <li>• Professional: 20 concurrent requests</li>
                                    <li>• Enterprise: Up to 100 concurrent</li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <div className="font-medium text-white mb-1">Token Budget Management</div>
                                <div className="text-sm text-white/70">
                                  <ul className="space-y-1 mt-2">
                                    <li>• Per-minute quota allocation</li>
                                    <li>• Monthly token budget tracking</li>
                                    <li>• Automatic alert thresholds</li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default AgentDeployment;
