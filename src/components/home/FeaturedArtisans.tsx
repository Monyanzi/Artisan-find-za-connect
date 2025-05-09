
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArtisanCard from '../common/ArtisanCard';
import { artisans } from '@/utils/data';

const FeaturedArtisans: React.FC = () => {
  // Get featured artisans
  const featuredArtisans = artisans.filter(artisan => artisan.featured);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Professionals</h2>
          <Link to="/artisans" className="view-all flex items-center">
            <span>View All</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArtisans.slice(0, 2).map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} variant="featured" />
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artisans.slice(2, 6).map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisans;
