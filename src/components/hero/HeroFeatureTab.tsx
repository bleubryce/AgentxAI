
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import HeroStats from './HeroStats';
import HeroClients from './HeroClients';
import HeroFeatures from './HeroFeatures';

const HeroFeatureTab = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="pt-6"
    >
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="bg-black/40 backdrop-blur-md border border-purple-500/20 p-1 rounded-lg">
          <TabsTrigger 
            value="stats" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:backdrop-blur-lg data-[state=active]:text-white rounded-md transition-all"
          >
            Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="clients" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:backdrop-blur-lg data-[state=active]:text-white rounded-md transition-all"
          >
            Our Clients
          </TabsTrigger>
          <TabsTrigger 
            value="features" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20 data-[state=active]:backdrop-blur-lg data-[state=active]:text-white rounded-md transition-all"
          >
            Key Features
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stats" className="pt-4">
          <HeroStats />
        </TabsContent>
        <TabsContent value="clients" className="pt-4">
          <HeroClients />
        </TabsContent>
        <TabsContent value="features" className="pt-4">
          <HeroFeatures />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default HeroFeatureTab;
