
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, MapPin, Clock, Calendar, Phone, MessageSquare, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Badge from '@/components/common/Badge';
import RatingStars from '@/components/common/RatingStars';
import { useApp } from '@/contexts/AppContext';
import { getArtisanById } from '@/utils/data';

const ArtisanProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setSelectedArtisan } = useApp();
  
  useEffect(() => {
    if (id) {
      setSelectedArtisan(id);
    }
    
    return () => {
      setSelectedArtisan(null);
    };
  }, [id, setSelectedArtisan]);
  
  const artisan = getArtisanById(id || null);
  
  if (!artisan) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artisan not found</h1>
          <Link to="/" className="text-primary hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-16 min-h-screen">
      <Link to="/" className="text-primary hover:underline flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to search
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="relative">
                <img 
                  src={artisan.profileImage}
                  alt={artisan.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
                {artisan.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                    <div className="bg-primary text-white p-1 rounded-full">
                      <Check className="h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{artisan.name}</h1>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-600 text-sm mr-3">{artisan.category}</span>
                    <RatingStars rating={artisan.rating} reviews={artisan.reviewCount} size="sm" />
                  </div>
                </div>
                
                <div className="mt-3 md:mt-0 flex flex-col md:items-end">
                  <Badge variant={artisan.completionRate > 95 ? 'accent' : 'outline'} className="mb-1">
                    {artisan.completionRate}% Completion Rate
                  </Badge>
                  <span className="text-sm text-gray-500">{artisan.yearsExperience} years experience</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {artisan.location} • {artisan.distance}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Responds in {artisan.responseTime}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x">
          <div className="col-span-2 p-6">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">About {artisan.name}</h2>
                  <p className="text-gray-600">{artisan.about}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3">Why choose me?</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Fully verified and background-checked</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Prompt and professional service</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Quality materials and workmanship</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Transparent pricing with no hidden costs</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="services">
                <h2 className="text-lg font-semibold mb-4">Services Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {artisan.services.map((service, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium">{service}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        From {artisan.pricing.currency}{artisan.pricing.min}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio">
                <h2 className="text-lg font-semibold mb-4">Work Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artisan.portfolio.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow">
                      <img src={image} alt="Portfolio" className="w-full h-48 object-cover" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <h2 className="text-lg font-semibold mb-4">Client Reviews</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <div className="font-medium">John D.</div>
                      <RatingStars rating={5} size="sm" showValue={false} />
                    </div>
                    <p className="text-sm mt-2">
                      Excellent work! Completed the job quickly and efficiently. Would highly recommend.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">2 weeks ago</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <div className="font-medium">Sarah M.</div>
                      <RatingStars rating={4.5} size="sm" showValue={false} />
                    </div>
                    <p className="text-sm mt-2">
                      Very professional and knowledgeable. Solved our problem quickly and gave helpful advice.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">1 month ago</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Pricing</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average rate</span>
                <span className="font-semibold">{artisan.pricing.currency}{artisan.pricing.min} - {artisan.pricing.currency}{artisan.pricing.max}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Final price may vary depending on job requirements and materials needed.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Book This Professional</h3>
              <div className="space-y-3">
                <Button variant="default" size="lg" className="w-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Appointment
                </Button>
                
                <Button variant="outline" size="lg" className="w-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message
                </Button>
                
                <Button variant="outline" size="lg" className="w-full flex items-center justify-center" 
                  onClick={() => window.open(`https://wa.me/27000000000?text=Hi%20${artisan.name}%2C%20I%20found%20you%20on%20ArtisanFindSA.%20I'm%20interested%20in%20booking%20your%20services.`, '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M12 18a6 6 0 0 0 6-6c0-1.5-1-2.5-3-5-2 2.5-3 3.5-3 5a2 2 0 0 0 4 0c0-.5-.5-1-1-1" />
                  </svg>
                  <span className="text-green-600">WhatsApp</span>
                </Button>
                
                <Button variant="outline" size="lg" className="w-full flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="p-2 bg-gray-100 rounded-lg inline-flex items-center mb-2">
                <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                <span className="text-sm font-medium">Safety Tip</span>
              </div>
              <p className="text-xs text-gray-600">
                Always communicate and pay through ArtisanFindSA to ensure our service guarantee protects you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
