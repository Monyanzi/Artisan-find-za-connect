
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Artisan } from '@/utils/data';
import { useApp } from '@/contexts/AppContext';
import Badge from './Badge';
import RatingStars from './RatingStars';
import ContactArtisanModal from './ContactArtisanModal';
import { Button } from '@/components/ui/button';

interface ArtisanCardProps {
  artisan: Artisan;
  variant?: 'default' | 'featured';
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ 
  artisan,
  variant = 'default' 
}) => {
  const { setSelectedArtisan } = useApp();
  const [showContactModal, setShowContactModal] = useState(false);
  
  const handleProfileClick = () => {
    setSelectedArtisan(artisan.id);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContactModal(true);
  };
  
  if (variant === 'featured') {
    return (
      <>
        <div className="card overflow-hidden flex flex-col md:flex-row">
          <Link 
            to={`/artisan/${artisan.id}`} 
            onClick={handleProfileClick}
            className="relative w-full md:w-1/3 h-48 md:h-auto block"
          >
            <img 
              src={artisan.profileImage || artisan.image || '/placeholder.svg'} 
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
          </Link>
          
          <div className="p-5 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <Link to={`/artisan/${artisan.id}`} onClick={handleProfileClick}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">{artisan.name}</h3>
                </Link>
                <p className="text-gray-600 text-sm">{artisan.category}</p>
              </div>
              <div className="text-right">
                <RatingStars rating={artisan.rating} reviews={artisan.reviewCount || artisan.reviews.length} />
                <p className="text-sm text-gray-500 mt-1">
                  {artisan.yearsExperience || artisan.yearsOfExperience} years exp.
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {artisan.location} {artisan.distance && `• ${artisan.distance}`}
              </div>
              {artisan.responseTime && (
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Responds in {artisan.responseTime}
                </div>
              )}
            </div>
            
            <p className="mt-3 text-sm line-clamp-2">{artisan.about || artisan.description}</p>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                {artisan.pricing ? (
                  <>
                    <span className="font-semibold text-primary">
                      {artisan.pricing.currency}{artisan.pricing.min} - {artisan.pricing.currency}{artisan.pricing.max}
                    </span>
                    <span className="text-gray-500"> avg. price</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-primary">
                      R{artisan.hourlyRate}
                    </span>
                    <span className="text-gray-500"> /hour</span>
                  </>
                )}
              </div>
              {artisan.completionRate && (
                <Badge variant={artisan.completionRate > 95 ? 'accent' : 'outline'}>
                  {artisan.completionRate}% Completion
                </Badge>
              )}
            </div>
            
            <div className="mt-4 flex gap-2">
              <Link to={`/artisan/${artisan.id}`} onClick={handleProfileClick} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Button onClick={handleContactClick} className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
        
        <ContactArtisanModal
          artisan={artisan}
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </>
    );
  }
  
  return (
    <>
      <div className="card overflow-hidden">
        <Link 
          to={`/artisan/${artisan.id}`} 
          onClick={handleProfileClick}
          className="relative block"
        >
          <img 
            src={artisan.profileImage || artisan.image || '/placeholder.svg'} 
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
        </Link>
        
        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <Link to={`/artisan/${artisan.id}`} onClick={handleProfileClick}>
                <h3 className="font-semibold hover:text-primary transition-colors">{artisan.name}</h3>
              </Link>
              <p className="text-gray-600 text-sm">{artisan.category}</p>
            </div>
            <RatingStars rating={artisan.rating} size="sm" />
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {artisan.location} {artisan.distance && `• ${artisan.distance}`}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            {artisan.pricing ? (
              <span className="font-semibold text-primary">
                {artisan.pricing.currency}{artisan.pricing.min} - {artisan.pricing.currency}{artisan.pricing.max}
              </span>
            ) : (
              <span className="font-semibold text-primary">
                R{artisan.hourlyRate}/hr
              </span>
            )}
            {artisan.responseTime && (
              <div className="flex items-center text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {artisan.responseTime}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex gap-2">
            <Link to={`/artisan/${artisan.id}`} onClick={handleProfileClick} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            </Link>
            <Button onClick={handleContactClick} size="sm" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </div>
      
      <ContactArtisanModal
        artisan={artisan}
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  );
};

export default ArtisanCard;
