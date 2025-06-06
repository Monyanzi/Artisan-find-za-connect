
import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search for an artisan or service...",
  className = ""
}) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      if (onSearch) {
        onSearch();
      } else {
        // Default behavior: navigate to search page with query
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      if (onSearch) {
        onSearch();
      } else {
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }
    }
  };

  const handleSearchClick = () => {
    if (value.trim()) {
      if (onSearch) {
        onSearch();
      } else {
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer disabled:opacity-50"
          disabled={!value.trim()}
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
