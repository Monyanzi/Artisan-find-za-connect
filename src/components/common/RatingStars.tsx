
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviews?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  maxRating = 5,
  size = 'md',
  showValue = true,
  reviews
}) => {
  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <Star
            key={i}
            className={`${starSizes[size]} ${
              i < Math.floor(rating)
                ? 'text-accent fill-accent'
                : i < rating
                ? 'text-accent fill-accent/50'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      {showValue && (
        <span className={`${textSizes[size]} font-medium ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {reviews !== undefined && (
        <span className={`${textSizes[size]} text-gray-500 ml-1`}>
          ({reviews})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
