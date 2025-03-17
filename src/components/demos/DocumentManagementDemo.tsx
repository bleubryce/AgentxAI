
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Document, DocumentIssue } from "@/services/agents";
import { AlertTriangle, Check, FileText, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentManagementDemo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [documentInfo, setDocumentInfo] = useState({
    title: "",
    type: "contract" as Document["type"],
    url: "https://example.com/demo-document.pdf"
  });
  const [analyzed, setAnalyzed] = useState<Document | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocumentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setDocumentInfo(prev => ({ ...prev, type: value as Document["type"] }));
  };

  const analyzeDocument = () => {
    if (!documentInfo.title) {
      toast({
        title: "Missing information",
        description: "Please provide a document title.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with demo data
    setTimeout(() => {
      // Generate random issues based on document type
      const issues: DocumentIssue[] = [];
      const issueCount = Math.floor(Math.random() * 4) + 1;
      
      for (let i = 0; i < issueCount; i++) {
        const issueSeverities: DocumentIssue["severity"][] = ["critical", "high", "medium", "low"];
        
        const issueTemplates = {
          contract: [
            "Missing signature on page",
            "Incorrect property address",
            "Vague contingency clause",
            "Incomplete disclosure section",
            "Undefined closing timeline",
            "Inconsistent party names"
          ],
          disclosure: [
            "Undisclosed property damage",
            "Missing flood zone information",
            "Incomplete known issues section",
            "Unsigned disclosure statement",
            "Missing dates on form"
          ],
          inspection: [
            "Unclear assessment of roof condition",
            "Missing electrical system details",
            "Incomplete pest inspection",
            "Vague foundation description",
            "Undefined recommended repairs section"
          ],
          appraisal: [
            "Comparable properties not recent",
            "Missing square footage calculation",
            "Inconsistent property value assessment",
            "Incomplete neighborhood analysis",
            "Outdated market conditions data"
          ],
          other: [
            "Missing signature",
            "Incorrect date format",
            "Incomplete section",
            "Inconsistent information",
            "Required field missing"
          ]
        };
        
        const templates = issueTemplates[documentInfo.type] || issueTemplates.other;
        const description = templates[Math.floor(Math.random() * templates.length)];
        
        issues.push({
          id: Math.random().toString(36).substring(2, 11),
          severity: issueSeverities[Math.floor(Math.random() * issueSeverities.length)],
          description,
          page: Math.floor(Math.random() * 20) + 1,
          resolved: false
        });
      }
      
      const demoResult: Document = {
        id: Math.random().toString(36).substring(2, 11),
        title: documentInfo.title,
        type: documentInfo.type,
        status: issues.some(i => i.severity === "critical") ? "pending" : "approved",
        url: documentInfo.url,
        issues,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setAnalyzed(demoResult);
      setLoading(false);
      
      toast({
        title: "Document Analyzed",
        description: `Found ${issues.length} issues in your document.`,
      });
    }, 2200);
  };

  const resetForm = () => {
    setDocumentInfo({
      title: "",
      type: "contract",
      url: "https://example.com/demo-document.pdf"
    });
    setAnalyzed(null);
  };

  const resolveIssue = (issueId: string) => {
    if (!analyzed) return;
    
    setAnalyzed(prev => {
      if (!prev) return null;
      return {
        ...prev,
        issues: prev.issues?.map(issue => 
          issue.id === issueId 
            ? { ...issue, resolved: true } 
            : issue
        ) || [],
        status: "approved"
      };
    });
    
    toast({
      title: "Issue Resolved",
      description: "The document issue has been marked as resolved.",
    });
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
      {!analyzed ? (
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Purchase Agreement for 123 Main St"
              value={documentInfo.title}
              onChange={handleInputChange}
              className="bg-white/5 border-white/10 text-white"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="document-type">Document Type</Label>
            <Select value={documentInfo.type} onValueChange={handleTypeChange}>
              <SelectTrigger id="document-type" className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="disclosure">Disclosure</SelectItem>
                <SelectItem value="inspection">Inspection Report</SelectItem>
                <SelectItem value="appraisal">Appraisal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Label htmlFor="url">Document URL (demo)</Label>
            <Input
              id="url"
              name="url"
              value={documentInfo.url}
              disabled
              className="bg-white/5 border-white/10 text-white opacity-50"
            />
            <p className="text-xs text-white/50 mt-1">This is a demo - no actual file upload is required</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={analyzeDocument}
              disabled={loading}
              className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Document...
                </>
              ) : (
                "Analyze Document with AI"
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-white" />
              <div>
                <h3 className="text-xl font-medium text-white">{analyzed.title}</h3>
                <p className="text-white/60 capitalize">{analyzed.type}</p>
              </div>
            </div>
            <div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                analyzed.status === "approved" 
                  ? "bg-green-500/20 text-green-500" 
                  : analyzed.status === "pending" 
                  ? "bg-amber-500/20 text-amber-500" 
                  : "bg-red-500/20 text-red-500"
              }`}>
                {analyzed.status === "approved" && "Approved"}
                {analyzed.status === "pending" && "Pending Review"}
                {analyzed.status === "rejected" && "Rejected"}
                {analyzed.status === "draft" && "Draft"}
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white mb-4">AI Analysis Results</h4>
            
            {analyzed.issues && analyzed.issues.length > 0 ? (
              <div className="space-y-4">
                {analyzed.issues.map(issue => (
                  <motion.div 
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg flex items-start justify-between ${
                      issue.resolved
                        ? "bg-green-500/10 border border-green-500/30"
                        : issue.severity === "critical" 
                        ? "bg-red-500/10 border border-red-500/30" 
                        : issue.severity === "high" 
                        ? "bg-amber-500/10 border border-amber-500/30"
                        : issue.severity === "medium"
                        ? "bg-yellow-500/10 border border-yellow-500/30"
                        : "bg-blue-500/10 border border-blue-500/30"
                    }`}
                  >
                    <div className="flex gap-3">
                      {issue.resolved ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : issue.severity === "critical" ? (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold uppercase ${
                            issue.resolved
                              ? "text-green-500"
                              : issue.severity === "critical" 
                              ? "text-red-500" 
                              : issue.severity === "high" 
                              ? "text-amber-500"
                              : issue.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                          }`}>
                            {issue.resolved ? "RESOLVED" : issue.severity}
                          </span>
                          {issue.page && (
                            <span className="text-xs text-white/50">Page {issue.page}</span>
                          )}
                        </div>
                        <p className="text-white mt-1">{issue.description}</p>
                      </div>
                    </div>
                    
                    {!issue.resolved && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-white/10 hover:bg-white/10"
                        onClick={() => resolveIssue(issue.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-white text-lg font-medium">No Issues Found</h4>
                <p className="text-white/60">This document is ready for use</p>
              </div>
            )}
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white mb-2">AI Recommendations</h4>
            <ul className="space-y-2 mt-3">
              {analyzed.status === "approved" ? (
                <>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Document is valid and ready for next steps</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>All critical issues have been addressed</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2 text-white">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Address all critical issues before proceeding</span>
                  </li>
                  <li className="flex items-start gap-2 text-white">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Consider legal review for complex matters</span>
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
            Analyze Another Document
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentManagementDemo;
