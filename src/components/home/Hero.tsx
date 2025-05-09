
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import SearchBar from '../common/SearchBar';

const Hero: React.FC = () => {
  const { searchTerm, setSearchTerm } = useApp();

  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90"></div>
      <div className="relative container-custom py-16 md:py-24">
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
            <Button variant="link" className="text-white h-auto p-0">Plumbing</Button>
            <Button variant="link" className="text-white h-auto p-0">Electrical</Button>
            <Button variant="link" className="text-white h-auto p-0">Painting</Button>
            <Button variant="link" className="text-white h-auto p-0">Carpentry</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-accent py-3">
        <div className="container-custom flex justify-between items-center">
          <p className="text-sm font-medium">Trusted by over 10,000 South Africans</p>
          <div className="flex items-center">
            <span className="text-sm font-medium">Learn how it works</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
