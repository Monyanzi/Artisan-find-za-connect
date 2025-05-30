
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react'; // Added Users icon for empty state
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { artisans } from '@/utils/data';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';

interface TopArtisanCardProps {
  artisan: any;
}

const TopArtisanCard: React.FC<TopArtisanCardProps> = ({ artisan }) => {
  return (
    <Card className="h-full overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={artisan.profileImage || artisan.image || '/placeholder.svg'} 
          alt={artisan.name}
          className="w-full h-44 object-cover"
        />
        {artisan.verified && (
          <div className="absolute top-2 right-2">
            <div className="bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">{artisan.name}</h3>
        <p className="text-blue-700 font-medium text-sm">{
          typeof artisan.category === 'string' && artisan.category.includes('-') 
            ? artisan.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : artisan.category
        }</p>
        
        <div className="flex items-center mt-1">
          <RatingStars rating={artisan.rating} size="sm" />
          <span className="text-gray-500 text-sm ml-2">({artisan.reviewCount || artisan.reviews.length})</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="ml-1">{artisan.location}</span>
          </div>
          <div className="flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="ml-1">Joined: {artisan.joinedDate || 'Jan 2023'}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {artisan.specialties ? artisan.specialties.slice(0, 3).map((specialty: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">{specialty}</Badge>
          )) : artisan.skills && artisan.skills.slice(0, 3).map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">{skill.charAt(0).toUpperCase() + skill.slice(1)}</Badge>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to={`/artisan/${artisan.id}`}
            className="inline-flex items-center text-blue-700 font-medium"
          >
            View Profile
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

const TopArtisansCarousel: React.FC = () => {
  // Get top-rated artisans by category
  const topArtisans = artisans.sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Top Rated Artisans</h2> 
      {/* Simplified title slightly, as "by Category" isn't explicitly implemented in filtering */}
      
      {topArtisans.length > 0 ? (
        <>
          <Carousel className="w-full mb-10">
            <CarouselContent className="-ml-4">
              {topArtisans.map((artisan) => (
                <CarouselItem key={artisan.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <TopArtisanCard artisan={artisan} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 transform-none" />
              <CarouselNext className="static translate-y-0 transform-none" />
            </div>
          </Carousel>
      
          <div className="text-center">
            <Link to="/search" className="inline-flex items-center text-primary font-medium">
              View All Artisans
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No top artisans to show at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default TopArtisansCarousel;
