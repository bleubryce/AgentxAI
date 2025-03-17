
import { motion } from 'framer-motion';

const HeroClients = () => {
  const clients = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {clients.map((client, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-center group"
        >
          <img 
            src={client.logo} 
            alt={client.name} 
            className="h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity invert filter" 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default HeroClients;
