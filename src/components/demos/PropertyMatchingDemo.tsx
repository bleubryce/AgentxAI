
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { BuyerPreferences, Property, PropertyMatch } from "@/services/agents";
import { Loader2, Home, Star, Building, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyMatchingDemo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<Omit<BuyerPreferences, "id">>({
    priceRange: { min: 200000, max: 600000 },
    location: ["downtown", "suburbs"],
    bedrooms: [2, 3, 4],
    bathrooms: [2, 3],
    propertyType: ["house", "condo"],
    mustHaveFeatures: ["parking"],
    niceToHaveFeatures: []
  });
  const [results, setResults] = useState<PropertyMatch[] | null>(null);

  const handlePriceChange = (value: number[]) => {
    setPreferences(prev => ({
      ...prev,
      priceRange: {
        min: value[0],
        max: value[1]
      }
    }));
  };

  const toggleLocation = (location: string) => {
    setPreferences(prev => {
      const locations = prev.location.includes(location)
        ? prev.location.filter(l => l !== location)
        : [...prev.location, location];
      
      return {
        ...prev,
        location: locations
      };
    });
  };

  const toggleBedroom = (bedroom: number) => {
    setPreferences(prev => {
      const bedrooms = prev.bedrooms.includes(bedroom)
        ? prev.bedrooms.filter(b => b !== bedroom)
        : [...prev.bedrooms, bedroom];
      
      return {
        ...prev,
        bedrooms
      };
    });
  };

  const toggleBathroom = (bathroom: number) => {
    setPreferences(prev => {
      const bathrooms = prev.bathrooms.includes(bathroom)
        ? prev.bathrooms.filter(b => b !== bathroom)
        : [...prev.bathrooms, bathroom];
      
      return {
        ...prev,
        bathrooms
      };
    });
  };

  const togglePropertyType = (type: string) => {
    setPreferences(prev => {
      const propertyType = prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type];
      
      return {
        ...prev,
        propertyType
      };
    });
  };

  const toggleFeature = (feature: string, isMustHave: boolean) => {
    setPreferences(prev => {
      if (isMustHave) {
        const mustHaveFeatures = prev.mustHaveFeatures.includes(feature)
          ? prev.mustHaveFeatures.filter(f => f !== feature)
          : [...prev.mustHaveFeatures, feature];
        
        return {
          ...prev,
          mustHaveFeatures
        };
      } else {
        const niceToHaveFeatures = prev.niceToHaveFeatures.includes(feature)
          ? prev.niceToHaveFeatures.filter(f => f !== feature)
          : [...prev.niceToHaveFeatures, feature];
        
        return {
          ...prev,
          niceToHaveFeatures
        };
      }
    });
  };

  const findMatches = () => {
    if (
      preferences.location.length === 0 || 
      preferences.bedrooms.length === 0 || 
      preferences.propertyType.length === 0
    ) {
      toast({
        title: "Incomplete preferences",
        description: "Please select at least one option for location, bedrooms, and property type.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with demo data
    setTimeout(() => {
      // Generate sample properties
      const demoProperties: Property[] = [
        {
          id: "prop1",
          address: "123 Downtown Ave, Central District",
          price: 450000,
          bedrooms: 2,
          bathrooms: 2,
          squareFeet: 1200,
          type: "condo",
          features: ["parking", "balcony", "gym"],
          description: "Modern condo in the heart of downtown with amazing city views",
          images: ["https://picsum.photos/seed/prop1/800/600"],
          createdAt: new Date().toISOString()
        },
        {
          id: "prop2",
          address: "456 Maple Street, Suburbia",
          price: 550000,
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 1800,
          type: "house",
          features: ["parking", "yard", "fireplace"],
          description: "Charming family home with a spacious backyard and updated kitchen",
          images: ["https://picsum.photos/seed/prop2/800/600"],
          createdAt: new Date().toISOString()
        },
        {
          id: "prop3",
          address: "789 Lakeview Dr, Suburbs",
          price: 680000,
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2400,
          type: "house",
          features: ["parking", "yard", "pool"],
          description: "Spacious family home with pool and modern amenities",
          images: ["https://picsum.photos/seed/prop3/800/600"],
          createdAt: new Date().toISOString()
        },
        {
          id: "prop4",
          address: "101 High Rise Blvd, Downtown",
          price: 390000,
          bedrooms: 1,
          bathrooms: 1,
          squareFeet: 850,
          type: "condo",
          features: ["gym", "doorman", "rooftop"],
          description: "Luxury high-rise condo with amazing amenities and views",
          images: ["https://picsum.photos/seed/prop4/800/600"],
          createdAt: new Date().toISOString()
        },
        {
          id: "prop5",
          address: "202 Riverside Lane, Waterfront",
          price: 520000,
          bedrooms: 2,
          bathrooms: 2,
          squareFeet: 1400,
          type: "condo",
          features: ["parking", "waterfront", "balcony"],
          description: "Beautiful waterfront condo with scenic views and modern finishes",
          images: ["https://picsum.photos/seed/prop5/800/600"],
          createdAt: new Date().toISOString()
        }
      ];
      
      // Filter properties based on preferences
      const filteredProperties = demoProperties.filter(property => {
        const priceInRange = property.price >= preferences.priceRange.min && property.price <= preferences.priceRange.max;
        const bedroomsMatch = preferences.bedrooms.includes(property.bedrooms);
        const bathroomsMatch = preferences.bathrooms.includes(property.bathrooms);
        const typeMatch = preferences.propertyType.includes(property.type);
        const locationMatch = property.address.toLowerCase().includes(preferences.location[0]) || 
                             property.address.toLowerCase().includes(preferences.location[1]);
        
        const hasMustHaveFeatures = preferences.mustHaveFeatures.every(feature => 
          property.features.includes(feature)
        );
        
        return priceInRange && bedroomsMatch && bathroomsMatch && typeMatch && locationMatch && hasMustHaveFeatures;
      });
      
      // Create property matches with match scores
      const matches: PropertyMatch[] = filteredProperties.map(property => {
        // Calculate match score based on preferences
        let matchScore = 85 + Math.floor(Math.random() * 15); // Base score between 85-100
        
        // Additional matching reasons
        const matchReasons = [];
        
        if (preferences.priceRange.max > property.price) {
          matchReasons.push("Under budget");
        }
        
        if (preferences.niceToHaveFeatures.some(feature => property.features.includes(feature))) {
          matchReasons.push("Has desired amenities");
          matchScore += 3;
        }
        
        if (property.type === "house" && preferences.propertyType.includes("house")) {
          matchReasons.push("Preferred property type");
          matchScore += 2;
        }
        
        if (property.bedrooms > 3 && preferences.bedrooms.includes(4)) {
          matchReasons.push("Spacious with extra bedrooms");
          matchScore += 2;
        }
        
        matchReasons.push("Location matches preferences");
        
        return {
          id: Math.random().toString(36).substring(2, 11),
          property,
          matchScore: Math.min(matchScore, 99), // Cap at 99
          matchReasons,
          createdAt: new Date().toISOString()
        };
      });
      
      // Sort by match score
      matches.sort((a, b) => b.matchScore - a.matchScore);
      
      setResults(matches);
      setLoading(false);
      
      toast({
        title: "Properties Matched",
        description: `Found ${matches.length} properties matching your criteria.`,
      });
    }, 2000);
  };

  const resetForm = () => {
    setPreferences({
      priceRange: { min: 200000, max: 600000 },
      location: ["downtown", "suburbs"],
      bedrooms: [2, 3, 4],
      bathrooms: [2, 3],
      propertyType: ["house", "condo"],
      mustHaveFeatures: ["parking"],
      niceToHaveFeatures: []
    });
    setResults(null);
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
      {!results ? (
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <Label>Price Range: ${preferences.priceRange.min.toLocaleString()} - ${preferences.priceRange.max.toLocaleString()}</Label>
            <Slider
              defaultValue={[preferences.priceRange.min, preferences.priceRange.max]}
              max={1000000}
              min={100000}
              step={10000}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-3">
            <Label>Location</Label>
            <div className="grid grid-cols-2 gap-2">
              {["downtown", "suburbs", "waterfront", "rural"].map(location => (
                <div 
                  key={location}
                  className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                    preferences.location.includes(location)
                      ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => toggleLocation(location)}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="capitalize">{location}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="space-y-3">
              <Label>Bedrooms</Label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map(bedroom => (
                  <div 
                    key={bedroom}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      preferences.bedrooms.includes(bedroom)
                        ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                    onClick={() => toggleBedroom(bedroom)}
                  >
                    {bedroom}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-3">
              <Label>Bathrooms</Label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(bathroom => (
                  <div 
                    key={bathroom}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      preferences.bathrooms.includes(bathroom)
                        ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                    onClick={() => toggleBathroom(bathroom)}
                  >
                    {bathroom}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="space-y-3">
            <Label>Property Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "house", label: "House", icon: Home },
                { value: "condo", label: "Condo", icon: Building },
                { value: "apartment", label: "Apartment", icon: Building },
                { value: "land", label: "Land", icon: MapPin }
              ].map(type => (
                <div 
                  key={type.value}
                  className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                    preferences.propertyType.includes(type.value)
                      ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => togglePropertyType(type.value)}
                >
                  <type.icon className="h-4 w-4" />
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-3">
              <Label>Must-Have Features</Label>
              <div className="space-y-2">
                {["parking", "yard", "pool", "fireplace", "garage"].map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`feature-must-${feature}`} 
                      checked={preferences.mustHaveFeatures.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature, true)}
                    />
                    <label
                      htmlFor={`feature-must-${feature}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white capitalize"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-3">
              <Label>Nice-to-Have Features</Label>
              <div className="space-y-2">
                {["balcony", "gym", "waterfront", "view", "updated kitchen"].map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`feature-nice-${feature}`} 
                      checked={preferences.niceToHaveFeatures.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature, false)}
                    />
                    <label
                      htmlFor={`feature-nice-${feature}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white capitalize"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={findMatches}
              disabled={loading}
              className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                "Find Properties with AI"
              )}
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {results.length > 0 ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Matches</h3>
                <p className="text-white/70">Based on your preferences, we've found {results.length} properties that match your criteria.</p>
              </div>
              
              <div className="space-y-6">
                {results.map((match, index) => (
                  <motion.div 
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg overflow-hidden border border-white/10"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5 bg-white/5 relative">
                        <img 
                          src={match.property.images?.[0] || "https://picsum.photos/800/600"} 
                          alt={match.property.address} 
                          className="w-full h-full object-cover md:absolute"
                          style={{ minHeight: "200px" }}
                        />
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-bolt-blue to-bolt-purple text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Star className="h-4 w-4 fill-white" /> {match.matchScore}% Match
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{match.property.address}</h3>
                            <p className="text-white/70 capitalize">{match.property.type}</p>
                          </div>
                          <div className="text-xl font-bold text-white">${match.property.price.toLocaleString()}</div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-white">
                            <span className="font-semibold">{match.property.bedrooms}</span> beds
                          </div>
                          <div className="text-white">
                            <span className="font-semibold">{match.property.bathrooms}</span> baths
                          </div>
                          <div className="text-white">
                            <span className="font-semibold">{match.property.squareFeet.toLocaleString()}</span> sq ft
                          </div>
                        </div>
                        
                        <p className="text-white/80 mb-4">{match.property.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white/60">Why This Matches Your Preferences:</h4>
                          <div className="flex flex-wrap gap-2">
                            {match.matchReasons.map((reason, i) => (
                              <div key={i} className="bg-white/10 text-white px-2 py-1 rounded-lg text-sm">
                                {reason}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {match.property.features.map((feature, i) => (
                            <div key={i} className={`px-3 py-1 rounded-lg text-sm capitalize ${
                              preferences.mustHaveFeatures.includes(feature)
                                ? "bg-green-500/20 text-green-400"
                                : preferences.niceToHaveFeatures.includes(feature)
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-white/10 text-white/80"
                            }`}>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Home className="h-8 w-8 text-white/70" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Matches Found</h3>
              <p className="text-white/70 mb-6">We couldn't find any properties matching your exact criteria. Try adjusting your preferences.</p>
            </div>
          )}
          
          <Button 
            onClick={resetForm} 
            variant="outline"
            className="w-full border-white/10 text-white hover:bg-white/10"
          >
            Start New Search
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyMatchingDemo;
