
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { categories } from '@/utils/data';
import CategoryCard from '../common/CategoryCard';
import { toast } from '@/hooks/use-toast';

const CategoryGrid: React.FC = () => {
  const handleCustomServiceRequest = () => {
    console.log('Custom service request clicked');
    toast({
      title: "Custom Service Request Submitted",
      description: "Thank you for your request! We'll connect you with suitable artisans within 24 hours. Check your email for updates.",
      duration: 5000,
    });
  };

  return (
    <section className="py-12" data-section="categories">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Browse by Category</h2>
          <Link to="/search" className="view-all flex items-center hover:text-primary transition-colors">
            <span>View All</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <Button onClick={handleCustomServiceRequest} className="hover:bg-primary/90 transition-colors">
            Request Custom Service
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
