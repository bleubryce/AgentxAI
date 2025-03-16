
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Briefcase, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResumeSubmissionFormProps {
  jobTitle: string;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ResumeSubmissionForm: React.FC<ResumeSubmissionFormProps> = ({ jobTitle, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this data to your backend
      // For now, we'll simulate a successful submission
      console.log("Form submitted:", { ...data, jobTitle });
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Application submitted!",
        description: `Your application for ${jobTitle} has been sent. We'll contact you soon.`,
      });
      
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="text-center mb-6">
        <Briefcase className="h-12 w-12 text-bolt-blue mx-auto mb-2" />
        <h3 className="text-xl font-bold text-white">Apply for {jobTitle}</h3>
        <p className="text-gray-400">Submit your information and we'll contact you soon</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="bg-bolt-darkblue/30 border border-white/10 text-white placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field} 
                    className="bg-bolt-darkblue/30 border border-white/10 text-white placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(555) 123-4567" 
                    {...field} 
                    className="bg-bolt-darkblue/30 border border-white/10 text-white placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Cover Letter (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us why you're a great fit for this position..." 
                    {...field} 
                    className="bg-bolt-darkblue/30 border border-white/10 text-white placeholder:text-gray-500 min-h-[120px]"
                  />
                </FormControl>
                <FormDescription className="text-gray-500">
                  Briefly explain your relevant experience and why you're interested in this position.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-2 flex gap-3">
            <Button 
              type="button" 
              onClick={onClose} 
              variant="outline"
              className="flex-1 border-white/10 text-white hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting
                </span>
              ) : (
                <span className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Submit Application
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResumeSubmissionForm;
