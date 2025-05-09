
import React from 'react';
import Hero from '@/components/home/Hero';
import TopArtisansCarousel from '@/components/home/TopArtisansCarousel';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedArtisans from '@/components/home/FeaturedArtisans';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div className="py-12 bg-gray-50">
        <div className="container-custom">
          <TopArtisansCarousel />
        </div>
      </div>
      <CategoryGrid />
      <FeaturedArtisans />
    </div>
  );
};

export default Index;
