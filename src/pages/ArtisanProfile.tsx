
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle, MessageSquare, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { artisans } from '@/utils/data';
import RatingStars from '@/components/common/RatingStars';
import ContactArtisanModal from '@/components/common/ContactArtisanModal';
import { toast } from '@/hooks/use-toast';

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
  const [time, setTime] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  
  if (!artisan) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <Link to="/search" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Artisan Not Found</h1>
        <p>The artisan you are looking for does not exist.</p>
      </div>
    );
  }

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceDescription || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in the service description and location fields.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    setIsSubmittingRequest(true);

    try {
      // Simulate API call
      console.log('Service request submitted:', {
        artisanId: artisan.id,
        artisanName: artisan.name,
        serviceDescription,
        location,
        date,
        time,
        timestamp: new Date().toISOString(),
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Service Request Sent!",
        description: `Your service request has been sent to ${artisan.name}. They will contact you within ${artisan.responseTime || '24 hours'} to discuss details and pricing.`,
        duration: 6000,
      });

      // Reset form
      setServiceDescription('');
      setLocation('');
      setDate('');
      setTime('');
    } catch (error) {
      toast({
        title: "Failed to Send Request",
        description: "There was an error sending your service request. Please try again or contact the artisan directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const handleDirectContact = (method: 'whatsapp' | 'call') => {
    if (method === 'whatsapp') {
      const message = encodeURIComponent(`Hi ${artisan.name}, I found your profile on ArtisanFindSA and I'm interested in your ${artisan.skills?.[0]} services. Could we discuss my project?`);
      const whatsappUrl = `https://wa.me/${artisan.contact?.replace(/[^0-9]/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    } else if (method === 'call') {
      window.location.href = `tel:${artisan.contact}`;
    }
    
    toast({
      title: "Contacting Artisan",
      description: `Opening ${method === 'whatsapp' ? 'WhatsApp' : 'phone dialer'} to contact ${artisan.name}`,
      duration: 3000,
    });
  };

  return (
    <div className="container-custom py-16">
      <Link to="/search" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Link>

      <div className="bg-gray-800 rounded-lg overflow-hidden mb-8 relative">
        {artisan.verified && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-green-600 text-white border-none px-3 py-1 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified
            </Badge>
          </div>
        )}
        <div className="p-8 text-white flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <img 
                src={artisan.profileImage || '/placeholder.svg'} 
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
                  <p className="font-medium">{artisan.rating} ({artisan.reviewCount || artisan.reviews?.length || 0} reviews)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-500" />
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="font-medium">{artisan.joinedDate || 'May 2021'}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <div className="flex items-center gap-3">
                <Badge className="p-1.5 bg-blue-100 text-blue-800 hover:bg-blue-100">{artisan.yearsExperience || artisan.yearsOfExperience}</Badge>
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-gray-500">years</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500" />
                <div>
                  <p className="font-medium">Responds in</p>
                  <p className="text-sm text-gray-500">{artisan.responseTime || 'Within 24 hours'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" />
                <div>
                  <p className="font-medium">Completion Rate</p>
                  <p className="text-sm text-gray-500">{artisan.completionRate || 98}%</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">About {artisan.name}</h2>
              <p className="text-gray-600 mb-6">{artisan.about || artisan.description}</p>
              
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {artisan.services.map((service, index) => (
                  <li key={index} className="text-gray-600">{service}</li>
                ))}
              </ul>
              
              <h2 className="text-xl font-semibold mb-4">Skills & Specialties</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {artisan.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100">
                    {skill}
                  </Badge>
                )) || "No skills listed"}
              </div>

              {artisan.specialties && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {artisan.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-100">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Request a Service</h2>
            <p className="text-gray-600 mb-4">Get a quote or book {artisan.name}.</p>
            
            <form onSubmit={handleServiceRequest} className="space-y-4">
              <div>
                <label htmlFor="service-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Description *
                </label>
                <Textarea 
                  id="service-description"
                  placeholder={`Briefly describe the service you need from ${artisan.name}...`}
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="resize-none"
                  required
                  disabled={isSubmittingRequest}
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Location (for service) *
                </label>
                <Input 
                  id="location"
                  placeholder="e.g., 123 Main St, Suburb"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={isSubmittingRequest}
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
                    disabled={isSubmittingRequest}
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={isSubmittingRequest}
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                  </select>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmittingRequest}>
                {isSubmittingRequest ? 'Sending Request...' : 'Send Service Request'}
              </Button>
              
              <p className="text-sm text-gray-500 text-center mt-2">
                {artisan.name} will respond to confirm availability and provide a quote if necessary.
              </p>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <p className="text-gray-600 mb-4">Or contact directly:</p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleDirectContact('whatsapp')}
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleDirectContact('call')}
              >
                <Phone className="h-4 w-4" />
                Call {artisan.contact}
              </Button>
              <Button 
                variant="secondary"
                className="w-full"
                onClick={() => setIsContactModalOpen(true)}
              >
                Send Message
              </Button>
            </div>
          </div>

          {artisan.pricing && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-3">Pricing</h3>
              <p className="text-2xl font-bold text-primary">
                {artisan.pricing.currency}{artisan.pricing.min} - {artisan.pricing.currency}{artisan.pricing.max}
              </p>
              <p className="text-sm text-gray-500">per hour</p>
            </div>
          )}
        </div>
      </div>

      <ContactArtisanModal
        artisan={artisan}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default ArtisanProfile;
