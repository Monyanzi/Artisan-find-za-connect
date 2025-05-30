
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import SearchBar from '../common/SearchBar';
import { useToast } from '@/components/ui/use-toast'; // Import useToast

const Hero: React.FC = () => {
  const { searchTerm, setSearchTerm } = useApp();
  const { toast } = useToast();

  const handleComingSoon = (featureName: string) => {
    toast({
      title: featureName,
      description: "This feature is coming soon!",
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/8785989a-e088-46b1-9e6d-77220291abbf.png')] bg-cover bg-center opacity-10"></div>
      <div className="relative container-custom py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Trusted Artisans in South Africa
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Connect with South Africa's most searched professionals: plumbers, electricians, painters, 
            carpenters, builders, gardeners, security specialists, and HVAC technicians for quality service in your area.
          </p>
          
          <div className="bg-white p-1 rounded-lg shadow-lg">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="What service do you need today?"
              className="mb-0"
            />
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-white/80">Popular:</span>
            <Button variant="link" className="text-white h-auto p-0" onClick={() => handleComingSoon("Popular Category: Plumbing")}>Plumbing</Button>
            <Button variant="link" className="text-white h-auto p-0" onClick={() => handleComingSoon("Popular Category: Electrical")}>Electrical</Button>
            <Button variant="link" className="text-white h-auto p-0" onClick={() => handleComingSoon("Popular Category: Painting")}>Painting</Button>
            <Button variant="link" className="text-white h-auto p-0" onClick={() => handleComingSoon("Popular Category: Carpentry")}>Carpentry</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-accent py-3">
        <div className="container-custom flex justify-between items-center">
          <p className="text-sm font-medium">Trusted by over 10,000 South Africans</p>
          <div className="flex items-center cursor-pointer" onClick={() => handleComingSoon("Learn How It Works")}>
            <span className="text-sm font-medium">Learn how it works</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
