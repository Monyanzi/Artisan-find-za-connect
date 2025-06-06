
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User, Home, Calendar, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container-custom h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">ArtisanFind<span className="text-accent">SA</span></span>
          </Link>
        </div>
        
        {/* Removed duplicate search bar - search is handled in hero section */}
        <div className="hidden md:flex items-center">
          <Link to="/search" className="flex items-center text-gray-600 hover:text-primary mr-4">
            <Search className="h-5 w-5 mr-2" />
            <span>Search Artisans</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            <User className="h-4 w-4 mr-2" />
            <span>Sign In</span>
          </Button>
          <Button variant="default" size="sm" className="hidden md:inline-flex">
            Register
          </Button>
        </div>
      </div>
      
      {/* Bottom navigation for mobile */}
      <div className="bottom-nav">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <Calendar className="h-6 w-6" />
          <span className="text-xs mt-1">Bookings</span>
        </Link>
        <Link to="/messages" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
