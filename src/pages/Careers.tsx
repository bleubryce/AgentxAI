
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Computer, HandCoins, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResumeDialog from '../components/ResumeDialog';
import { useState } from 'react';

const CareersList = [
  {
    id: 1,
    title: "Senior Sales Representative",
    location: "Remote, California",
    type: "1099 Commission-Based",
    description: "Join our dynamic sales team and enjoy unlimited earning potential. As a Senior Sales Representative, you'll connect real estate professionals with our cutting-edge AI tools that transform their business. Our top performers earn six-figure incomes working flexible hours from the comfort of their home.",
    requirements: [
      "2+ years of sales experience, preferably in SaaS or real estate tech",
      "Self-motivated with excellent communication skills",
      "Personal computer with reliable internet connection",
      "Passion for technology and helping others succeed"
    ],
    benefits: [
      "Unlimited commission potential - no earnings cap",
      "Flexible schedule - work when you want",
      "Comprehensive sales training and support",
      "Be part of the AI revolution in real estate"
    ]
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    location: "Remote, California",
    type: "1099 Commission-Based",
    description: "Drive growth and earn exceptional commissions by promoting our revolutionary real estate AI platform. You'll develop and execute digital marketing strategies that generate qualified leads, working independently while receiving guidance from industry experts.",
    requirements: [
      "Experience with digital marketing campaigns and lead generation",
      "Strong understanding of social media marketing and content creation",
      "Analytical mindset with ability to optimize campaigns based on data",
      "Personal computer, reliable internet, and phone"
    ],
    benefits: [
      "Performance-based compensation - earn what you're worth",
      "Remote work flexibility - no commuting",
      "Cutting-edge marketing tools and resources",
      "Professional growth in the emerging AI real estate sector"
    ]
  },
  {
    id: 3,
    title: "Real Estate AI Consultant",
    location: "Remote, California",
    type: "1099 Commission-Based",
    description: "Transform how real estate professionals operate by introducing them to our game-changing AI platform. In this highly rewarding role, you'll demonstrate our suite of AI agents and help clients implement these tools to dramatically increase their productivity and profits.",
    requirements: [
      "Strong understanding of real estate industry challenges and workflows",
      "Excellent presentation and demonstration skills",
      "Tech-savvy with ability to explain complex features simply",
      "Home office setup with reliable internet and phone"
    ],
    benefits: [
      "Highly competitive commission structure",
      "Work from anywhere in California",
      "Be at the forefront of AI innovation in real estate",
      "Flexible hours that fit your lifestyle"
    ]
  }
];

const CareersPage = () => {
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleApply = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsResumeDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-clash font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Be part of the AI revolution in real estate. We're looking for ambitious, self-driven professionals who want unlimited earning potential and work-life flexibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {CareersList.map((job) => (
            <Card key={job.id} className="bg-zinc-900 border border-white/10 hover:border-bolt-blue/50 transition-all duration-300 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">{job.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2 text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-bolt-blue" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Computer className="h-4 w-4 text-bolt-blue" />
                    <span>Remote Work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HandCoins className="h-4 w-4 text-bolt-blue" />
                    <span>{job.type}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-300 mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-medium text-white mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block mr-2 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleApply(job.title)}
                  className="w-full button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-bolt-darkblue to-bolt-darker p-8 rounded-xl border border-white/10 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-bolt-purple" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join a team that's revolutionizing the real estate industry with cutting-edge AI technology. 
            Enjoy the freedom of remote work, unlimited earning potential, and the satisfaction of helping 
            real estate professionals transform their business.
          </p>
          <Button 
            onClick={() => handleApply("General Application")}
            className="button-glow bg-gradient-to-r from-bolt-blue to-bolt-purple hover:shadow-glow-blue transition-all duration-300"
            size="lg"
          >
            Start Your Application Today
          </Button>
        </div>
      </main>
      
      <Footer />
      
      <ResumeDialog 
        isOpen={isResumeDialogOpen} 
        onClose={() => setIsResumeDialogOpen(false)} 
        jobTitle={selectedJobTitle}
      />
    </div>
  );
};

export default CareersPage;
