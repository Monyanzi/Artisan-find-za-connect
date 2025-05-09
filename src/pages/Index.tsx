
import React from 'react';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedArtisans from '@/components/home/FeaturedArtisans';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <CategoryGrid />
      <FeaturedArtisans />
    </div>
  );
};

export default Index;
