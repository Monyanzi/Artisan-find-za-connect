
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, mockAppContextUser } from '@/utils/data'; // Import User type and mock user

interface AppContextProps {
  selectedCategory: string | null;
  selectedArtisan: string | null;
  searchTerm: string;
  setSelectedCategory: (category: string | null) => void;
  setSelectedArtisan: (artisan: string | null) => void;
  setSearchTerm: (term: string) => void;
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Mock login on app load for testing purposes
  useEffect(() => {
    login(mockAppContextUser);
  }, []);

  const value = {
    selectedCategory,
    selectedArtisan,
    searchTerm,
    setSelectedCategory,
    setSelectedArtisan,
    setSearchTerm,
    isAuthenticated,
    currentUser,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
