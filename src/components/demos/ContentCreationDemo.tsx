
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const ContentCreationDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('property-description');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = () => {
    if (!prompt) return;
    
    setGenerating(true);
    
    // Mock API call to generate content
    setTimeout(() => {
      let result = '';
      
      if (contentType === 'property-description') {
        result = `STUNNING WATERFRONT PROPERTY WITH PANORAMIC VIEWS!

This exceptional 4-bedroom, 3-bath property showcases breathtaking views of the bay from nearly every room. The open concept design features vaulted ceilings, a gourmet kitchen with top-of-the-line appliances, and a spacious primary suite with a luxurious en-suite bathroom.

Outdoor enthusiasts will appreciate the expansive deck, perfect for entertaining, and private dock access. Additional features include a 3-car garage, smart home technology, and energy-efficient windows throughout.

Located in the prestigious ${prompt} neighborhood, this home offers convenient access to top-rated schools, shopping, and fine dining. Don't miss this rare opportunity!`;
      } else if (contentType === 'social-post') {
        result = `✨ NEW LISTING ALERT! ✨

Just listed in ${prompt}! This stunning property won't last long.

🏠 4 beds, 3 baths
🚗 3-car garage
🌊 Waterfront views
🔑 Private dock access

Schedule your private showing today before it's gone! DM for details or call (555) 123-4567.

#RealEstate #NewListing #${prompt.replace(/\s+/g, '')} #DreamHome #Waterfront #LuxuryLiving`;
      } else if (contentType === 'email-campaign') {
        result = `Subject: Exclusive New Listing in ${prompt} - Schedule Your Private Tour

Dear [Client Name],

I hope this email finds you well. I'm reaching out because I've just listed an exceptional property in the highly sought-after ${prompt} neighborhood that matches the preferences you shared with me.

This stunning 4-bedroom waterfront home features:
• Panoramic bay views
• Gourmet kitchen with top-of-the-line appliances
• Spacious primary suite with luxurious en-suite
• Private dock access
• Smart home technology throughout

Given the current market conditions in ${prompt}, I anticipate significant interest in this property. I'd be happy to arrange a private showing for you before our upcoming open house this weekend.

Would you be available this Thursday or Friday afternoon? Please let me know what works best for your schedule.

Looking forward to hearing from you!

Best regards,
[Your Name]
[Your Brokerage]
[Contact Information]`;
      }
      
      setGeneratedContent(result);
      setGenerating(false);
    }, 2000);
  };

  const contentTypeOptions = [
    { value: 'property-description', label: 'Property Description' },
    { value: 'social-post', label: 'Social Media Post' },
    { value: 'email-campaign', label: 'Email Campaign' }
  ];

  return (
    <div className="space-y-6">
      <p className="text-white/70">
        Our Content Creation AI agent generates professional marketing content for your properties and 
        social media campaigns. Simply provide a location or notable feature, select the type of content 
        you need, and let our AI do the work.
      </p>
      
      <div className="grid gap-4">
        <Input
          placeholder="Enter property location or notable feature (e.g., Brickell, Miami)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
        
        <Select value={contentType} onValueChange={setContentType}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent className="bg-bolt-darker border-white/10">
            {contentTypeOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          onClick={handleGenerate} 
          disabled={!prompt || generating}
          className="bg-gradient-to-r from-bolt-blue to-bolt-purple hover:from-bolt-purple hover:to-bolt-blue transition-all duration-500"
        >
          {generating ? 'Generating...' : 'Generate Content'}
        </Button>
      </div>
      
      {generatedContent && (
        <Card className="mt-6 bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[300px] bg-white/5 border-white/10 text-white font-light"
            />
            <div className="flex justify-end mt-4">
              <Button 
                onClick={() => navigator.clipboard.writeText(generatedContent)}
                variant="outline"
                className="bg-transparent border-white/10 text-white hover:bg-white/10"
              >
                Copy to Clipboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentCreationDemo;
