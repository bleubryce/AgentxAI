
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientUpdate } from "@/services/agents";
import { Loader2, Mail, MessageSquare, Phone, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClientCommunicationDemo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    clientName: "",
    clientId: "client_" + Math.random().toString(36).substring(2, 11),
    type: "transaction" as ClientUpdate["type"],
    title: "",
    message: "",
    sentVia: ["email"],
    responseRequired: false
  });
  const [generatedUpdate, setGeneratedUpdate] = useState<ClientUpdate | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setUpdateInfo(prev => ({ ...prev, type: value as ClientUpdate["type"] }));
    
    // Set default titles based on type
    if (value === "transaction") {
      setUpdateInfo(prev => ({ ...prev, 
        type: value as ClientUpdate["type"],
        title: "Transaction Update: Next Steps"
      }));
    } else if (value === "feedback") {
      setUpdateInfo(prev => ({ ...prev, 
        type: value as ClientUpdate["type"],
        title: "We Value Your Feedback"
      }));
    } else if (value === "nurture") {
      setUpdateInfo(prev => ({ ...prev, 
        type: value as ClientUpdate["type"],
        title: "Market Update: New Listings You Might Like"
      }));
    }
  };

  const toggleChannel = (channel: string) => {
    setUpdateInfo(prev => {
      const sentVia = prev.sentVia.includes(channel)
        ? prev.sentVia.filter(c => c !== channel)
        : [...prev.sentVia, channel];
      
      return {
        ...prev,
        sentVia
      };
    });
  };

  const toggleResponseRequired = () => {
    setUpdateInfo(prev => ({
      ...prev,
      responseRequired: !prev.responseRequired
    }));
  };

  const generateUpdate = () => {
    // Validate form
    if (!updateInfo.clientName || !updateInfo.title) {
      toast({
        title: "Missing information",
        description: "Please provide a client name and update title.",
        variant: "destructive"
      });
      return;
    }

    if (updateInfo.sentVia.length === 0) {
      toast({
        title: "Communication channel required",
        description: "Please select at least one communication channel.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with demo data
    setTimeout(() => {
      // Generate sample message based on update type
      let message = "";
      
      if (updateInfo.type === "transaction") {
        message = `Dear ${updateInfo.clientName},\n\nI hope this message finds you well. I wanted to provide you with an update on your real estate transaction.\n\nWe've received the inspection results and everything looks great with only a few minor items that we can discuss. The lender has approved your application and we're on track for closing on the scheduled date.\n\nNext steps:\n1. Review and sign the disclosure documents (attached)\n2. Schedule the final walkthrough (I suggest next Tuesday at 10 AM)\n3. Prepare for closing day (bring your ID and be ready to sign several documents)\n\nPlease let me know if you have any questions or concerns.\n\nLooking forward to a smooth closing!\n\nBest regards,\nYour Real Estate Agent`;
      } else if (updateInfo.type === "feedback") {
        message = `Dear ${updateInfo.clientName},\n\nThank you for choosing our services for your real estate needs. As we're always looking to improve our client experience, we would greatly appreciate your feedback.\n\nCould you please take a moment to answer these few questions:\n\n1. How satisfied were you with the communication throughout the process?\n2. Did we meet or exceed your expectations?\n3. What could we have done better?\n4. Would you recommend our services to friends or family?\n\nYour input is invaluable and helps us deliver better service to all our clients.\n\nThank you for your time.\n\nBest regards,\nYour Real Estate Team`;
      } else if (updateInfo.type === "nurture") {
        message = `Dear ${updateInfo.clientName},\n\nI hope you're doing well! I wanted to reach out with some exciting updates from the real estate market that might interest you.\n\nThere are several new listings in your preferred neighborhoods that match your criteria. The market is currently seeing some interesting trends with [current market insight].\n\nI've attached a few properties I thought you might like:\n\n1. Beautiful 3-bedroom townhouse in Oak Ridge - $425,000\n2. Renovated 2-bedroom condo with amazing views - $350,000\n3. Spacious family home with a large backyard - $550,000\n\nWould you like to schedule a time to view any of these properties or discuss the current market conditions?\n\nAlways here to help with your real estate needs!\n\nWarm regards,\nYour Real Estate Agent`;
      }
      
      if (updateInfo.message) {
        message = updateInfo.message;
      }
      
      const demoResult: ClientUpdate = {
        id: Math.random().toString(36).substring(2, 11),
        clientId: updateInfo.clientId,
        type: updateInfo.type,
        title: updateInfo.title,
        message: message,
        sentVia: updateInfo.sentVia,
        sentAt: new Date().toISOString(),
        readAt: undefined,
        responseRequired: updateInfo.responseRequired,
        responded: false
      };
      
      setGeneratedUpdate(demoResult);
      setLoading(false);
      
      toast({
        title: "Update Generated",
        description: "Your client communication has been prepared.",
      });
    }, 1800);
  };

  const resetForm = () => {
    setUpdateInfo({
      clientName: "",
      clientId: "client_" + Math.random().toString(36).substring(2, 11),
      type: "transaction",
      title: "",
      message: "",
      sentVia: ["email"],
      responseRequired: false
    });
    setGeneratedUpdate(null);
  };

  const sendUpdate = () => {
    toast({
      title: "Update Sent",
      description: `Your message has been sent to ${updateInfo.clientName} via ${updateInfo.sentVia.join(", ")}.`,
    });
    
    // In a real implementation, this would call an API to send the message
    resetForm();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      {!generatedUpdate ? (
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              name="clientName"
              placeholder="Jane Smith"
              value={updateInfo.clientName}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="update-type">Update Type</Label>
            <Select value={updateInfo.type} onValueChange={handleTypeChange}>
              <SelectTrigger id="update-type" className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select update type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transaction">Transaction Update</SelectItem>
                <SelectItem value="feedback">Feedback Request</SelectItem>
                <SelectItem value="nurture">Nurture/Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="title">Message Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Transaction Update: Next Steps"
              value={updateInfo.title}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="message">Custom Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Leave blank to use AI-generated message based on update type"
              value={updateInfo.message}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white min-h-[100px]"
            />
            <p className="text-xs text-white/50 mt-1">Leave blank to use AI-generated content based on the update type</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-3">
            <Label>Communication Channels</Label>
            <div className="flex flex-wrap gap-3">
              <div 
                className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  updateInfo.sentVia.includes("email")
                    ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => toggleChannel("email")}
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              
              <div 
                className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  updateInfo.sentVia.includes("sms")
                    ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => toggleChannel("sms")}
              >
                <MessageSquare className="h-4 w-4" />
                <span>SMS</span>
              </div>
              
              <div 
                className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  updateInfo.sentVia.includes("phone")
                    ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => toggleChannel("phone")}
              >
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center space-x-2">
            <Checkbox 
              id="responseRequired" 
              checked={updateInfo.responseRequired}
              onCheckedChange={toggleResponseRequired}
            />
            <label
              htmlFor="responseRequired"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Response required from client
            </label>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={generateUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Message...
                </>
              ) : (
                "Generate Client Communication"
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
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-white">{generatedUpdate.title}</h3>
              <p className="text-white/60">To: {updateInfo.clientName}</p>
            </div>
            <div className="flex gap-2">
              {generatedUpdate.sentVia.includes("email") && (
                <div className="bg-white/10 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-white" />
                </div>
              )}
              {generatedUpdate.sentVia.includes("sms") && (
                <div className="bg-white/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
              )}
              {generatedUpdate.sentVia.includes("phone") && (
                <div className="bg-white/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="prose prose-invert max-w-none">
              {generatedUpdate.message.split('\n').map((line, i) => (
                <p key={i} className="text-white/90 my-2">{line}</p>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {generatedUpdate.responseRequired && (
              <div className="flex items-center text-sm text-amber-300 gap-2 px-3 py-1 bg-amber-500/10 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Client response requested</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-green-300 gap-2 px-3 py-1 bg-green-500/10 rounded-lg ml-auto">
              <CheckCircle2 className="h-4 w-4" />
              <span>AI-optimized for engagement</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={sendUpdate}
              className="flex-1 bg-gradient-to-r from-bolt-blue to-bolt-purple"
            >
              Send Now
            </Button>
            
            <Button 
              onClick={resetForm} 
              variant="outline"
              className="flex-1 border-white/10 text-white hover:bg-white/10"
            >
              Create New
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ClientCommunicationDemo;
