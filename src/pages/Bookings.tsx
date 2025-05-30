
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardFooter
import { Calendar, Clock, User, MapPin, LogIn, Star, Repeat, XCircle } from 'lucide-react'; // Added LogIn, Star, Repeat, XCircle
import { Button } from '@/components/ui/button'; // Import Button
import { useApp } from '@/contexts/AppContext'; // Import useApp
import { useToast } from '@/components/ui/use-toast'; // Import useToast
import { User as AppUser } from '@/utils/data'; // Alias User

// Define a more specific type for Booking, assuming artisanId might be needed for rebooking
interface Booking {
  id: string;
  artisanId?: string; // Optional: Assuming we might add this to mock data later for re-book
  artisanName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'; // More specific status
}

const Bookings: React.FC = () => {
  const { isAuthenticated, currentUser, login } = useApp();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Keep mock data within the component for now, but make it stateful for cancellation demo
  const [upcomingBookingsData, setUpcomingBookingsData] = useState<Booking[]>([
    {
      id: 'book1',
      artisanId: 'art1', // John Carpenter's ID from utils/data.ts (example)
      artisanName: 'John Carpenter',
      service: 'Furniture Repair',
      date: '15 May 2025',
      time: '10:00 AM',
      location: 'Sandton, Johannesburg',
      status: 'confirmed'
    },
    {
      id: 'book2',
      artisanId: 'art2', // Mary Plumber's ID
      artisanName: 'Mary Plumber',
      service: 'Pipe Repair',
      date: '18 May 2025',
      time: '2:30 PM',
      location: 'Rosebank, Johannesburg',
      status: 'pending'
    }
  ]);
  
  const [pastBookingsData, setPastBookingsData] = useState<Booking[]>([
    {
      id: 'book3',
      artisanId: 'art3', // David Electrician's ID
      artisanName: 'David Electrician',
      service: 'Light Installation',
      date: '5 May 2025',
      time: '11:00 AM',
      location: 'Braamfontein, Johannesburg',
      status: 'completed'
    }
  ]);

  const handleCancelBooking = (bookingId: string) => {
    console.log("Cancelling booking:", bookingId, "for user:", currentUser?.id);
    toast({
      title: "Cancellation Requested",
      description: `Booking ${bookingId} requested for cancellation.`,
    });
    // Mock: Move to past bookings as 'cancelled' or filter out
    setUpcomingBookingsData(prev => prev.filter(b => b.id !== bookingId));
    const cancelledBooking = upcomingBookingsData.find(b => b.id === bookingId);
    if (cancelledBooking) {
      setPastBookingsData(prev => [...prev, { ...cancelledBooking, status: 'cancelled' }]);
    }
  };

  const handleLeaveReview = (bookingId: string) => {
    console.log("Leaving review for booking:", bookingId, "for user:", currentUser?.id);
    toast({
      title: "Leave a Review",
      description: `Redirecting to review page for booking ${bookingId}... (Not implemented)`,
    });
  };

  const handleRebook = (bookingId: string, artisanId?: string) => {
    console.log("Re-booking service from booking:", bookingId, "with artisan:", artisanId, "for user:", currentUser?.id);
    if (artisanId) {
      toast({
        title: "Re-book Service",
        description: `Redirecting to artisan ${artisanId}'s profile for re-booking... (Not implemented)`,
      });
      // Actual navigation: navigate(`/artisan/${artisanId}`);
    } else {
      toast({
        title: "Re-book Service",
        description: `Artisan ID not found for this booking. Cannot re-book directly. (Not implemented)`,
        variant: "destructive"
      });
    }
  };
  
  const handleMockLogin = () => {
    const mockLoginUser: AppUser = { 
      id: 'mock-user-bookings', 
      name: 'Booking User', 
      email: 'booker@example.com', 
      phone: '1234567890', 
      joinDate: '2023-01-01', 
      location: 'Mockville', 
      isArtisan: false,
      profileImage: undefined, category: undefined, skills: undefined, description: undefined,
    };
    login(mockLoginUser);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container-custom py-16 min-h-screen text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>
        <p className="text-gray-600 mb-4">Please log in to view your bookings.</p>
        <Button onClick={handleMockLogin}>
          <LogIn className="mr-2 h-4 w-4" /> Login (Mock)
        </Button>
      </div>
    );
  }

  const renderBookingCard = (booking: Booking, isUpcoming: boolean) => {
    return (
      <Card key={booking.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{booking.service}</CardTitle>
              <CardDescription>with {booking.artisanName}</CardDescription>
            </div>
            <div className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span>{booking.location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-3 border-t">
          {isUpcoming && booking.status !== 'cancelled' && (
            <Button variant="outline" size="sm" onClick={() => handleCancelBooking(booking.id)}>
              <XCircle className="mr-2 h-4 w-4" /> Cancel
            </Button>
          )}
          {!isUpcoming && booking.status === 'completed' && (
            <>
              <Button variant="outline" size="sm" onClick={() => handleLeaveReview(booking.id)}>
                <Star className="mr-2 h-4 w-4" /> Review
              </Button>
              <Button variant="default" size="sm" onClick={() => handleRebook(booking.id, booking.artisanId)}>
                <Repeat className="mr-2 h-4 w-4" /> Re-book
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
  };

  const getStatusBadgeClass = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>
      
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          {upcomingBookingsData.length > 0 ? (
            <div>
              {upcomingBookingsData.map(booking => renderBookingCard(booking, true))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You have no upcoming bookings.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          {pastBookingsData.length > 0 ? (
            <div>
              {pastBookingsData.map(booking => renderBookingCard(booking, false))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You have no past bookings.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
