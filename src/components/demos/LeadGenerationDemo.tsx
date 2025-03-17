
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";
import { QualifiedLead } from "@/services/agents";
import { useToast } from "@/hooks/use-toast";

const LeadGenerationDemo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
    notes: ""
  });
  const [result, setResult] = useState<QualifiedLead | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLead(prev => ({ ...prev, [name]: value }));
  };

  const processLead = () => {
    // Validate form
    if (!lead.name || !lead.email) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and email.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with demo data
    setTimeout(() => {
      const demoResult: QualifiedLead = {
        id: Math.random().toString(36).substring(2, 11),
        name: lead.name,
        email: lead.email,
        phone: lead.phone || undefined,
        score: Math.floor(Math.random() * 100),
        category: Math.random() > 0.6 ? "hot" : Math.random() > 0.3 ? "warm" : "cold",
        probability: Math.random() * 0.95,
        estimatedValue: Math.floor(Math.random() * 500000) + 200000,
        followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        status: "new",
        createdAt: new Date().toISOString()
      };
      
      setResult(demoResult);
      setLoading(false);
      
      toast({
        title: "Lead Processed",
        description: "Your lead has been qualified by the AI agent",
      });
    }, 1800);
  };

  const resetForm = () => {
    setLead({
      name: "",
      email: "",
      phone: "",
      interests: "",
      notes: ""
    });
    setResult(null);
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Label htmlFor="name">Lead Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Smith"
              value={lead.name}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={lead.email}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="555-123-4567"
              value={lead.phone}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="interests">Property Interests</Label>
            <Input
              id="interests"
              name="interests"
              placeholder="3 bedroom house, downtown condo, etc."
              value={lead.interests}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional context about this lead..."
              value={lead.notes}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={processLead}
              disabled={loading}
              className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Lead...
                </>
              ) : (
                "Qualify Lead with AI"
              )}
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className={`h-24 w-24 rounded-full flex items-center justify-center ${
              result.category === "hot" 
                ? "bg-gradient-to-br from-red-500 to-amber-500" 
                : result.category === "warm" 
                ? "bg-gradient-to-br from-amber-400 to-yellow-500" 
                : "bg-gradient-to-br from-blue-400 to-cyan-500"
            }`}>
              <div className="text-3xl font-bold text-white">{result.score}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white/60 mb-1">Lead Name</h4>
              <p className="text-white text-lg">{result.name}</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white/60 mb-1">Contact</h4>
              <p className="text-white">{result.email}</p>
              {result.phone && <p className="text-white">{result.phone}</p>}
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white/60 mb-1">Category</h4>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  result.category === "hot" 
                    ? "bg-red-500" 
                    : result.category === "warm" 
                    ? "bg-amber-500" 
                    : "bg-blue-500"
                }`}></span>
                <p className="text-white capitalize">{result.category} Lead</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white/60 mb-1">Conversion Probability</h4>
              <p className="text-white">{(result.probability * 100).toFixed(1)}%</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white/60 mb-1">Estimated Value</h4>
              <p className="text-white">${result.estimatedValue?.toLocaleString()}</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white/60 mb-1">Recommended Follow-up</h4>
              <p className="text-white">{result.followUpDate}</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white/60 mb-2">AI-Generated Action Plan</h4>
            <ul className="space-y-2">
              {result.category === "hot" ? (
                <>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Call immediately - this lead has strong buying signals and high conversion potential</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Send personalized property recommendations based on their interests</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Offer a virtual property tour within the next 48 hours</span>
                  </li>
                </>
              ) : result.category === "warm" ? (
                <>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Email with relevant property options within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Follow up with a phone call in 2-3 days</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Add to your weekly newsletter for market updates</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Send an introductory email with your services</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Add to your nurture campaign for long-term follow up</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Check back in 30 days to reassess their needs</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <Button 
            onClick={resetForm} 
            variant="outline"
            className="w-full border-white/10 text-white hover:bg-white/10"
          >
            Process Another Lead
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default LeadGenerationDemo;
