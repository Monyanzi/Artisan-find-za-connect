
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { artisans } from '@/utils/data';
import RatingStars from '@/components/common/RatingStars';

// Function to get artisan by ID
export const getArtisanById = (id: string | undefined) => {
  if (!id) return null;
  return artisans.find(artisan => artisan.id === id);
};

const ArtisanProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const artisan = getArtisanById(id);
  const [serviceDescription, setServiceDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  
  if (!artisan) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Artisan Not Found</h1>
        <p>The artisan you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-16">
      <div className="bg-gray-800 rounded-lg overflow-hidden mb-8 relative">
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-green-600 text-white border-none px-3 py-1 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Verified
          </Badge>
        </div>
        <div className="p-8 text-white flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <img 
                src={artisan.image || '/placeholder.svg'} 
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{artisan.name}</h1>
            <p className="text-xl">{artisan.skills?.[0] || 'Professional Service Provider'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-500" />
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{artisan.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-yellow-500">
                  <RatingStars rating={artisan.rating} />
                </div>
                <div>
                  <p className="text-gray-500">Rating</p>
                  <p className="font-medium">{artisan.rating} ({artisan.reviews?.length || 0} reviews)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-500" />
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="font-medium">May 2021</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <div className="flex items-center gap-3">
                <Badge className="p-1.5 bg-blue-100 text-blue-800 hover:bg-blue-100">7</Badge>
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-gray-500">years</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500" />
                <div>
                  <p className="font-medium">Responds in</p>
                  <p className="text-sm text-gray-500">Within 2 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" />
                <div>
                  <p className="font-medium">Completion Rate</p>
                  <p className="text-sm text-gray-500">98%</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">About {artisan.name}</h2>
              <p className="text-gray-600 mb-6">{artisan.description}</p>
              
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {artisan.services.map((service, index) => (
                  <li key={index} className="text-gray-600">{service}</li>
                ))}
              </ul>
              
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {artisan.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100">
                    {skill}
                  </Badge>
                )) || "No skills listed"}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            {artisan.reviews && artisan.reviews.length > 0 ? (
              <div className="space-y-6">
                {artisan.reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-1">
                      <RatingStars rating={review.rating} size="sm" showValue={false} />
                      <span className="ml-2 font-semibold text-gray-700">{review.author}</span>
                    </div>
                    {/* Review Date would go here if available - <p className="text-xs text-gray-500 mb-1">{review.date}</p> */}
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet for this artisan.</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Request a Service</h2>
            <p className="text-gray-600 mb-4">Get a quote or book {artisan.name}.</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="service-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Description
                </label>
                <Textarea 
                  id="service-description"
                  placeholder={`Briefly describe the service you need from ${artisan.name}...`}
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="resize-none"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Location (for service)
                </label>
                <Input 
                  id="location"
                  placeholder="e.g., 123 Main St, Suburb"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <Input 
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
              </div>
              
              <Button className="w-full">Send Service Request</Button>
              
              <p className="text-sm text-gray-500 text-center mt-2">
                {artisan.name} will respond to confirm availability and provide a quote if necessary.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 mb-4">Or contact directly:</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
