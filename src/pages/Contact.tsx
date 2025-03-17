
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Us | AgentX AI - Real Estate Automation";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would handle form submission
    console.log("Contact form submitted");
    // Display success message to user
    alert("Thank you for your message! Our team will get back to you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bolt-darker to-bolt-dark text-white">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Contact</span> Us
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Have questions about AgentX AI? Our team is here to help you automate your real estate business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Get in Touch</h2>
                <p className="text-white/80 text-lg mb-8">
                  We're here to answer your questions about AgentX AI and help you get started with our platform. Reach out to us through any of the channels below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Email Us</h3>
                      <p className="text-white/70">support@agentxai.com</p>
                      <p className="text-white/70">sales@agentxai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Call Us</h3>
                      <p className="text-white/70">+1 (800) 555-AGENT</p>
                      <p className="text-white/70">Monday-Friday, 9am-6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Visit Us</h3>
                      <p className="text-white/70">123 Tech Hub Street</p>
                      <p className="text-white/70">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">FAQ</h2>
                <div className="space-y-6">
                  {[
                    {
                      question: "How quickly can I get started with AgentX AI?",
                      answer: "You can sign up and start using AgentX AI in minutes. Our onboarding process is designed to get you up and running quickly with minimal setup required."
                    },
                    {
                      question: "Is AgentX AI compatible with my current CRM?",
                      answer: "AgentX AI integrates with most major real estate CRMs including Salesforce, Follow Up Boss, and many others. Contact us for specific integration information."
                    },
                    {
                      question: "How secure is my data with AgentX AI?",
                      answer: "We take security seriously. AgentX AI uses bank-level encryption and follows strict data protection protocols to keep your information and your clients' data safe."
                    },
                    {
                      question: "Do you offer training and support?",
                      answer: "Yes! All plans include access to our knowledge base and video tutorials. Premium plans include personalized onboarding and dedicated support."
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-bolt-blue/50 transition-all duration-300">
                      <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                      <p className="text-white/70">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-bolt-dark/60 to-bolt-darker/60 backdrop-blur-sm p-8 md:p-10">
                <div className="flex items-center space-x-3 mb-8">
                  <MessageSquare className="w-6 h-6 text-bolt-blue" />
                  <h2 className="text-2xl font-bold">Send Us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200"
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-white/80 mb-2">Company</label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                      <select
                        id="subject"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="demo">Request a Demo</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200"
                        placeholder="Your message"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full button-glow px-6 py-3 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300 flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-bolt-dark/60 to-bolt-darker/60 backdrop-blur-sm mb-20">
            <div className="p-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Our AI assistant is available 24/7 to answer your questions and help you get started with AgentX AI.
              </p>
              <button
                className="button-glow px-8 py-3 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300 inline-flex items-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
