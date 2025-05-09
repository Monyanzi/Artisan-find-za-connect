
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

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
      status: 'confirmed'
    },
    {
      id: 'book2',
      artisanName: 'Mary Plumber',
      service: 'Pipe Repair',
      date: '18 May 2025',
      time: '2:30 PM',
      location: 'Rosebank, Johannesburg',
      status: 'pending'
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
      status: 'completed'
    }
  ];

  const renderBookingCard = (booking: any) => {
    return (
      <Card key={booking.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{booking.service}</CardTitle>
              <CardDescription>with {booking.artisanName}</CardDescription>
            </div>
            <div className={`badge ${getStatusBadgeClass(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
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

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>
      
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          {upcomingBookings.length > 0 ? (
            <div>
              {upcomingBookings.map(booking => renderBookingCard(booking))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You have no upcoming bookings.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          {pastBookings.length > 0 ? (
            <div>
              {pastBookings.map(booking => renderBookingCard(booking))}
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
