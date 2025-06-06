
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, Star, Edit, Save, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+27 71 234 5678',
    joinDate: 'May 2023',
    location: 'Cape Town, South Africa',
    isArtisan: false
  });

  const [editForm, setEditForm] = useState(user);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editForm);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        duration: 3000,
      });
    } else {
      // Start editing
      setEditForm(user);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBecomeArtisan = () => {
    toast({
      title: "Artisan Application Started",
      description: "Your application to become an artisan has been submitted. We'll review your profile and contact you within 48 hours.",
      duration: 6000,
    });
  };

  const handleSettingClick = (setting: string) => {
    toast({
      title: `${setting} Settings`,
      description: `Opening ${setting.toLowerCase()} settings...`,
      duration: 3000,
    });
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
      duration: 3000,
    });
  };

  const mockBookings = [
    {
      id: 'book1',
      artisan: 'John Carpenter',
      service: 'Furniture Repair',
      date: '15 May 2025',
      status: 'confirmed'
    },
    {
      id: 'book2',
      artisan: 'Mary Plumber',
      service: 'Pipe Repair',
      date: '18 May 2025',
      status: 'pending'
    }
  ];

  const mockReviews = [
    {
      id: 'rev1',
      artisan: 'David Electrician',
      service: 'Light Installation',
      rating: 5,
      comment: 'Excellent work and very professional!',
      date: '5 May 2025'
    }
  ];

  const mockFavorites = [
    {
      id: 'fav1',
      name: 'John Carpenter',
      service: 'Furniture Repair',
      rating: 4.5,
      location: 'Sandton, Johannesburg'
    },
    {
      id: 'fav2',
      name: 'Mary Plumber',
      service: 'Plumbing Services',
      rating: 4.8,
      location: 'Rosebank, Johannesburg'
    }
  ];

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        <div className="w-full md:w-1/3">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-gray-500">Client since {user.joinDate}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{user.location}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-6">
                <Button onClick={handleEditToggle} className="w-full">
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              
              {!user.isArtisan && (
                <div className="mt-4">
                  <Button variant="secondary" className="w-full" onClick={handleBecomeArtisan}>
                    Become an Artisan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleSettingClick('Notification Preferences')}>
                  Notification Preferences
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleSettingClick('Payment Methods')}>
                  Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleSettingClick('Security')}>
                  Security Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="history">Booking History ({mockBookings.length})</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews ({mockReviews.length})</TabsTrigger>
              <TabsTrigger value="favorites">Favorites ({mockFavorites.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  {mockBookings.length > 0 ? (
                    <div className="space-y-4">
                      {mockBookings.map((booking) => (
                        <div key={booking.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{booking.service}</p>
                              <p className="text-sm text-gray-600">with {booking.artisan}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't made any bookings yet.</p>
                      <Button variant="default" className="mt-4">Find an Artisan</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reviews You've Written</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  {mockReviews.length > 0 ? (
                    <div className="space-y-4">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{review.service}</p>
                              <p className="text-sm text-gray-600">for {review.artisan}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't written any reviews yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Saved Artisans</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  {mockFavorites.length > 0 ? (
                    <div className="space-y-4">
                      {mockFavorites.map((favorite) => (
                        <div key={favorite.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{favorite.name}</p>
                              <p className="text-sm text-gray-600">{favorite.service}</p>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-sm">{favorite.rating}</span>
                                <span className="text-sm text-gray-500 ml-2">{favorite.location}</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">View Profile</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't saved any artisans yet.</p>
                      <Button variant="default" className="mt-4">Browse Artisans</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
