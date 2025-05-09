
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ArtisanCard from '@/components/common/ArtisanCard';
import { useApp } from '@/contexts/AppContext';
import { filterArtisansByCategory, getCategoryById } from '@/utils/data';

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setSelectedCategory } = useApp();
  
  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
    
    return () => {
      setSelectedCategory(null);
    };
  }, [id, setSelectedCategory]);
  
  const category = getCategoryById(id || null);
  const artisans = filterArtisansByCategory(id || null);
  
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
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-primary transition-colors">
            Top Rated
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-primary transition-colors">
            Nearest
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-primary transition-colors">
            Verified Only
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-primary transition-colors">
            Quick Response
          </button>
        </div>
      </div>
      
      {artisans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artisans.map(artisan => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No artisans found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Category;
