
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ArtisanCard from '@/components/common/ArtisanCard';
import { useApp } from '@/contexts/AppContext';
import { filterArtisansByCategory, getCategoryById } from '@/utils/data';

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setSelectedCategory } = useApp();
  const [sortBy, setSortBy] = useState<'rating' | 'nearest' | 'verified' | 'response'>('rating');
  
  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
    
    return () => {
      setSelectedCategory(null);
    };
  }, [id, setSelectedCategory]);
  
  const category = getCategoryById(id || null);
  const baseArtisans = filterArtisansByCategory(id || null);
  
  // Apply sorting and filtering
  const filteredArtisans = baseArtisans
    .filter(artisan => {
      if (sortBy === 'verified') return artisan.verified;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'nearest':
          // Simple mock distance sorting - in real app would use actual coordinates
          return (parseFloat(a.distance?.replace(' km', '') || '999') - parseFloat(b.distance?.replace(' km', '') || '999'));
        case 'response':
          // Sort by response time - faster response first
          const responseTimeA = a.responseTime?.includes('hr') ? parseInt(a.responseTime) : 
                               a.responseTime?.includes('min') ? parseInt(a.responseTime) / 60 : 999;
          const responseTimeB = b.responseTime?.includes('hr') ? parseInt(b.responseTime) : 
                               b.responseTime?.includes('min') ? parseInt(b.responseTime) / 60 : 999;
          return responseTimeA - responseTimeB;
        default:
          return 0;
      }
    });
  
  if (!category) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/" className="text-primary hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-16 min-h-screen">
      <Link to="/" className="text-primary hover:underline flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to categories
      </Link>
      
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">
            {category.icon && React.createElement(category.icon, { size: 24 })}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="text-gray-600">{category.description}</p>
      </div>
      
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600">Filter by:</span>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 border rounded-full text-sm transition-colors ${
              sortBy === 'rating' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white border-gray-300 hover:border-primary'
            }`}
          >
            Top Rated
          </button>
          <button 
            onClick={() => setSortBy('nearest')}
            className={`px-4 py-2 border rounded-full text-sm transition-colors ${
              sortBy === 'nearest' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white border-gray-300 hover:border-primary'
            }`}
          >
            Nearest
          </button>
          <button 
            onClick={() => setSortBy('verified')}
            className={`px-4 py-2 border rounded-full text-sm transition-colors ${
              sortBy === 'verified' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white border-gray-300 hover:border-primary'
            }`}
          >
            Verified Only
          </button>
          <button 
            onClick={() => setSortBy('response')}
            className={`px-4 py-2 border rounded-full text-sm transition-colors ${
              sortBy === 'response' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white border-gray-300 hover:border-primary'
            }`}
          >
            Quick Response
          </button>
        </div>
      </div>
      
      {filteredArtisans.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredArtisans.length} of {baseArtisans.length} artisans
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredArtisans.map(artisan => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No artisans found with the current filters.</p>
          <button
            onClick={() => setSortBy('rating')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
