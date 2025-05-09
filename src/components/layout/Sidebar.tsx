
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Home, MessageSquare, Search, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/utils/data';
import { useApp } from '@/contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { setSelectedCategory } = useApp();
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">ArtisanFind<span className="text-accent">SA</span></span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4 border-b">
            <Link 
              to="/"
              onClick={onClose} 
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              <Home className="h-5 w-5 mr-3 text-primary" />
              <span>Home</span>
            </Link>
            <Link 
              to="/search"
              onClick={onClose} 
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 mt-2"
            >
              <Search className="h-5 w-5 mr-3 text-primary" />
              <span>Search</span>
            </Link>
            <Link 
              to="/bookings"
              onClick={onClose} 
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 mt-2"
            >
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <span>Bookings</span>
            </Link>
            <Link 
              to="/messages"
              onClick={onClose} 
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 mt-2"
            >
              <MessageSquare className="h-5 w-5 mr-3 text-primary" />
              <span>Messages</span>
            </Link>
          </div>
          
          <div className="p-4 border-b flex-1 overflow-y-auto">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.id}`}
                  onClick={() => handleCategorySelect(category.id)}
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                  <span className="mr-3 text-lg">
                    {category.icon && <category.icon size={18} />}
                  </span>
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs text-gray-500">{category.count}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t mt-auto">
            <Link 
              to="/profile"
              onClick={onClose} 
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-3 text-primary" />
              <span>Profile</span>
            </Link>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
              <Button variant="default" size="sm" className="flex-1">Register</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
