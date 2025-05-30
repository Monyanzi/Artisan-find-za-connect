
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArtisanCard from '../common/ArtisanCard';
import { artisans } from '@/utils/data';

const FeaturedArtisans: React.FC = () => {
  const featuredArtisans = artisans.filter(artisan => artisan.featured === true);
  const topArtisansToDisplay = artisans.slice(0, 6); // Taking first 6 as "Top" for this section as per original logic combination

  // For the purpose of this component, let's combine featured and a few other top artisans,
  // ensuring no duplicates and prioritizing featured ones.
  const displayArtisans = [
    ...featuredArtisans.slice(0, 2), // Max 2 strictly featured
    ...artisans.filter(a => !featuredArtisans.slice(0,2).map(fa => fa.id).includes(a.id)).slice(0, 4) // Then up to 4 more, not duplicating the featured ones
  ].slice(0,6); // Max 6 total

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          {/* Changed title for better clarity given the mixed logic */}
          <h2 className="section-title">Top & Featured Professionals</h2> 
          <Link to="/artisans" className="view-all flex items-center">
            <span>View All</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {displayArtisans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayArtisans.slice(0, 2).map((artisan) => (
                <ArtisanCard 
                  key={artisan.id} 
                  artisan={artisan} 
                  variant={artisan.featured ? "featured" : undefined} 
                />
              ))}
            </div>
            
            {displayArtisans.length > 2 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayArtisans.slice(2).map((artisan) => (
                  <ArtisanCard 
                    key={artisan.id} 
                    artisan={artisan}
                    // No specific variant for these unless they are also featured
                    variant={artisan.featured ? "featured" : undefined} 
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No top or featured artisans to display currently.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtisans;
