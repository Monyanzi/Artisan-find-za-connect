
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import { useApp } from '@/contexts/AppContext';
import ArtisanCard from '@/components/common/ArtisanCard';
import { filterArtisansBySearch } from '@/utils/data';

const Search: React.FC = () => {
  const { searchTerm, setSearchTerm } = useApp();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const filteredResults = filterArtisansBySearch(searchTerm);
    setResults(filteredResults);
  }, [searchTerm]);

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Artisans</h1>
      
      <div className="mb-8">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search by name, skill, or location..." 
          className="max-w-3xl mx-auto"
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {results.length > 0 
            ? `${results.length} artisans found` 
            : "No artisans found matching your search"}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
        
        {results.length === 0 && searchTerm && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              No artisans found matching "{searchTerm}"
            </p>
            <p className="text-gray-400">
              Try adjusting your search terms or browse by category.
            </p>
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              Enter a search term to find artisans by name, skill, or location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
