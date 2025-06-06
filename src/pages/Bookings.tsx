
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, MapPin, Star, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingBookings = [
    {
      id: 'book1',
      artisanName: 'John Carpenter',
      service: 'Furniture Repair',
      date: '15 May 2025',
      time: '10:00 AM',
      location: 'Sandton, Johannesburg',
      status: 'confirmed',
      artisanPhone: '+27 82 123 4567',
      estimatedDuration: '2-3 hours',
      price: 'R350/hour'
    },
    {
      id: 'book2',
      artisanName: 'Mary Plumber',
      service: 'Pipe Repair',
      date: '18 May 2025',
      time: '2:30 PM',
      location: 'Rosebank, Johannesburg',
      status: 'pending',
      artisanPhone: '+27 73 987 6543',
      estimatedDuration: '1-2 hours',
      price: 'R400/hour'
    }
  ];
  
  const pastBookings = [
    {
      id: 'book3',
      artisanName: 'David Electrician',
      service: 'Light Installation',
      date: '5 May 2025',
      time: '11:00 AM',
      location: 'Braamfontein, Johannesburg',
      status: 'completed',
      artisanPhone: '+27 60 234 5678',
      estimatedDuration: '3 hours',
      price: 'R380/hour',
      totalPaid: 'R1,140',
      canReview: true
    }
  ];

  const handleContactArtisan = (artisan: string, phone: string, method: 'call' | 'whatsapp' | 'message') => {
    if (method === 'call') {
      window.location.href = `tel:${phone}`;
    } else if (method === 'whatsapp') {
      const message = encodeURIComponent(`Hi ${artisan}, I have a question about our upcoming booking.`);
      const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    } else if (method === 'message') {
      // Navigate to messages or open message modal
      toast({
        title: "Opening Messages",
        description: `Opening conversation with ${artisan}`,
        duration: 3000,
      });
    }
  };

  const handleCancelBooking = (bookingId: string, artisanName: string) => {
    console.log('Cancelling booking:', bookingId);
    toast({
      title: "Booking Cancelled",
      description: `Your booking with ${artisanName} has been cancelled. You will receive a confirmation email shortly.`,
      duration: 5000,
    });
  };

  const handleRescheduleBooking = (bookingId: string, artisanName: string) => {
    console.log('Rescheduling booking:', bookingId);
    toast({
      title: "Reschedule Request Sent",
      description: `Your reschedule request has been sent to ${artisanName}. They will contact you to arrange a new time.`,
      duration: 5000,
    });
  };

  const handleLeaveReview = (bookingId: string, artisanName: string) => {
    console.log('Leaving review for booking:', bookingId);
    toast({
      title: "Review Submitted",
      description: `Thank you for reviewing ${artisanName}! Your feedback helps other users make informed decisions.`,
      duration: 5000,
    });
  };

  const renderBookingCard = (booking: any, isPast = false) => {
    return (
      <Card key={booking.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{booking.service}</CardTitle>
              <CardDescription>with {booking.artisanName}</CardDescription>
            </div>
            <div className={`badge ${getStatusBadgeClass(booking.status)}`}>
              <Badge variant={getStatusVariant(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span>{booking.time}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span>{booking.location}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Duration: {booking.estimatedDuration}</span>
              <span className="font-medium">{booking.price}</span>
            </div>

            {isPast && booking.totalPaid && (
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Total Paid:</span>
                <span className="text-green-600">{booking.totalPaid}</span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContactArtisan(booking.artisanName, booking.artisanPhone, 'call')}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContactArtisan(booking.artisanName, booking.artisanPhone, 'whatsapp')}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContactArtisan(booking.artisanName, booking.artisanPhone, 'message')}
                >
                  Message
                </Button>

                {!isPast && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRescheduleBooking(booking.id, booking.artisanName)}
                    >
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id, booking.artisanName)}
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {isPast && booking.canReview && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleLeaveReview(booking.id, booking.artisanName)}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Leave Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed': return 'badge-secondary';
      case 'pending': return 'badge-accent';
      case 'completed': return 'badge-primary';
      default: return 'badge-outline';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>
      
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          {upcomingBookings.length > 0 ? (
            <div>
              {upcomingBookings.map(booking => renderBookingCard(booking, false))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">You have no upcoming bookings.</p>
              <Button variant="default">Find an Artisan</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          {pastBookings.length > 0 ? (
            <div>
              {pastBookings.map(booking => renderBookingCard(booking, true))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">You have no past bookings.</p>
              <Button variant="default">Browse Artisans</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
