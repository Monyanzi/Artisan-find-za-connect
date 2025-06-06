
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import { useApp } from '@/contexts/AppContext';
import ArtisanCard from '@/components/common/ArtisanCard';
import { filterArtisansBySearch } from '@/utils/data';
import { Button } from '@/components/ui/button';

const Search: React.FC = () => {
  const { searchTerm, setSearchTerm } = useApp();
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    console.log('Search term changed:', searchTerm);
    if (searchTerm.trim()) {
      setIsSearching(true);
      const filteredResults = filterArtisansBySearch(searchTerm);
      console.log('Search results:', filteredResults.length);
      setResults(filteredResults);
      setHasSearched(true);
      setIsSearching(false);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    console.log('Manual search triggered with term:', searchTerm);
    if (searchTerm.trim()) {
      setIsSearching(true);
      const filteredResults = filterArtisansBySearch(searchTerm);
      setResults(filteredResults);
      setHasSearched(true);
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Artisans</h1>
      
      <div className="mb-8">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          onSearch={handleSearch}
          placeholder="Search by name, skill, or location..." 
          className="max-w-3xl mx-auto"
        />
      </div>
      
      {isSearching && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-500 mt-2">Searching...</p>
        </div>
      )}
      
      {!isSearching && (
        <div className="mb-8">
          {hasSearched && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {results.length > 0 
                  ? `${results.length} artisan${results.length === 1 ? '' : 's'} found` 
                  : "No artisans found"}
                {searchTerm && ` for "${searchTerm}"`}
              </h2>
              {searchTerm && (
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
          
          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          )}
          
          {hasSearched && results.length === 0 && searchTerm && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                No artisans found matching "{searchTerm}"
              </p>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or browse by category.
              </p>
              <Button variant="outline" onClick={handleClearSearch}>
                Clear Search
              </Button>
            </div>
          )}

          {!hasSearched && !searchTerm && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                Enter a search term to find artisans by name, skill, or location.
              </p>
              <p className="text-gray-400">
                Try searching for "plumbing", "electrical", "painting", or any location.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
