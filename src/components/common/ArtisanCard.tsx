
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, MapPin } from 'lucide-react';
import { Artisan } from '@/utils/data';
import { useApp } from '@/contexts/AppContext';
import Badge from './Badge';
import RatingStars from './RatingStars';

interface ArtisanCardProps {
  artisan: Artisan;
  variant?: 'default' | 'featured';
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ 
  artisan,
  variant = 'default' 
}) => {
  const { setSelectedArtisan } = useApp();
  
  const handleClick = () => {
    setSelectedArtisan(artisan.id);
  };
  
  if (variant === 'featured') {
    return (
      <Link 
        to={`/artisan/${artisan.id}`} 
        onClick={handleClick}
        className="card overflow-hidden flex flex-col md:flex-row"
      >
        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
          <img 
            src={artisan.profileImage} 
            alt={artisan.name}
            className="w-full h-full object-cover"
          />
          {artisan.verified && (
            <div className="absolute top-2 right-2">
              <Badge variant="primary" className="flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-5 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{artisan.name}</h3>
              <p className="text-gray-600 text-sm">{artisan.category}</p>
            </div>
            <div className="text-right">
              <RatingStars rating={artisan.rating} reviews={artisan.reviewCount} />
              <p className="text-sm text-gray-500 mt-1">{artisan.yearsExperience} years exp.</p>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {artisan.location} • {artisan.distance}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Responds in {artisan.responseTime}
            </div>
          </div>
          
          <p className="mt-3 text-sm line-clamp-2">{artisan.about}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold text-primary">{artisan.pricing.currency}{artisan.pricing.min} - {artisan.pricing.currency}{artisan.pricing.max}</span>
              <span className="text-gray-500"> avg. price</span>
            </div>
            <Badge variant={artisan.completionRate > 95 ? 'accent' : 'outline'}>
              {artisan.completionRate}% Completion
            </Badge>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
      to={`/artisan/${artisan.id}`} 
      onClick={handleClick}
      className="card overflow-hidden"
    >
      <div className="relative">
        <img 
          src={artisan.profileImage} 
          alt={artisan.name}
          className="w-full h-40 object-cover"
        />
        {artisan.verified && (
          <div className="absolute top-2 right-2">
            <Badge variant="primary" className="flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">{artisan.name}</h3>
            <p className="text-gray-600 text-sm">{artisan.category}</p>
          </div>
          <RatingStars rating={artisan.rating} size="sm" />
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <MapPin className="h-3 w-3 mr-1" />
          {artisan.location} • {artisan.distance}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">
            {artisan.pricing.currency}{artisan.pricing.min} - {artisan.pricing.currency}{artisan.pricing.max}
          </span>
          <div className="flex items-center text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            {artisan.responseTime}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;
