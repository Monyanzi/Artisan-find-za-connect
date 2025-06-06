
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ArtisanCard from '@/components/common/ArtisanCard';
import { artisans } from '@/utils/data';
import { Button } from '@/components/ui/button';

const AllArtisans: React.FC = () => {
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'experience'>('rating');
  const [filterVerified, setFilterVerified] = useState(false);

  const filteredAndSortedArtisans = artisans
    .filter(artisan => !filterVerified || artisan.verified)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return (b.yearsExperience || b.yearsOfExperience || 0) - (a.yearsExperience || a.yearsOfExperience || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="container-custom py-16 min-h-screen">
      <Link to="/" className="text-primary hover:underline flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to home
      </Link>
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">All Artisans</h1>
        <p className="text-gray-600">Browse all {artisans.length} trusted artisans on our platform</p>
      </div>
      
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('rating')}
          >
            Top Rated
          </Button>
          <Button
            variant={sortBy === 'name' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('name')}
          >
            Name
          </Button>
          <Button
            variant={sortBy === 'experience' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('experience')}
          >
            Experience
          </Button>
        </div>
        
        <div className="ml-auto">
          <Button
            variant={filterVerified ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterVerified(!filterVerified)}
          >
            {filterVerified ? 'All Artisans' : 'Verified Only'}
          </Button>
        </div>
      </div>
      
      {filteredAndSortedArtisans.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredAndSortedArtisans.length} of {artisans.length} artisans
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedArtisans.map(artisan => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No artisans found with the current filters.</p>
          <Button 
            variant="outline" 
            onClick={() => setFilterVerified(false)}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllArtisans;
