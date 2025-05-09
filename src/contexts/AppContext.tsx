
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  selectedCategory: string | null;
  selectedArtisan: string | null;
  searchTerm: string;
  setSelectedCategory: (category: string | null) => void;
  setSelectedArtisan: (artisan: string | null) => void;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const value = {
    selectedCategory,
    selectedArtisan,
    searchTerm,
    setSelectedCategory,
    setSelectedArtisan,
    setSearchTerm,
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
