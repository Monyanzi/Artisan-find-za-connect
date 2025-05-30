
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { categories } from '@/utils/data'; // Assuming categories are still imported globally
import CategoryCard from '../common/CategoryCard';
import { useToast } from '@/components/ui/use-toast'; // Import useToast

const CategoryGrid: React.FC = () => {
  const { toast } = useToast();

  const handleComingSoon = (featureName: string) => {
    toast({
      title: featureName,
      description: "This feature is coming soon!",
    });
  };

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Browse by Category</h2>
          <Link to="/categories" className="view-all flex items-center">
            <span>View All</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No categories to display right now.</p>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <Button onClick={() => handleComingSoon("Request Custom Service")}>
            Request Custom Service
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
