
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, Star, LogIn } from 'lucide-react'; // Added LogIn
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext'; // Import useApp hook

const Profile: React.FC = () => {
  const { isAuthenticated, currentUser, login, logout } = useApp(); // Get auth state and functions

  // Use a mock user for login if needed, or rely on AppContext's initial login
  // This specific mockUser is for the login button if user is not authenticated.
  // AppContext already logs in mockAppContextUser on load.
  const handleMockLogin = () => {
    // This is just an example, ideally, you'd have a proper user object or form
    const mockLoginUser = { 
      id: 'temp-user', 
      name: 'Guest User', 
      email: 'guest@example.com', 
      phone: '0000000000', 
      joinDate: new Date().toDateString(), 
      location: 'Unknown', 
      isArtisan: false 
    };
    login(mockLoginUser);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container-custom py-16 min-h-screen text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>
        <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
        <Button onClick={handleMockLogin}>
          <LogIn className="mr-2 h-4 w-4" /> Login (Mock)
        </Button>
      </div>
    );
  }

  // Now currentUser is guaranteed to be non-null
  const user = currentUser;

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        <div className="w-full md:w-1/3">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User className="h-12 w-12 text-gray-500" />
                )}
              </div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-gray-500">Client since {user.joinDate}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {user.location}
                </p>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </div>
              
              {!user.isArtisan && (
                <div className="mt-4">
                  <Button variant="secondary" className="w-full">
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
                <Button variant="ghost" className="w-full justify-start">Notification Preferences</Button>
                <Button variant="ghost" className="w-full justify-start">Payment Methods</Button>
                <Button variant="ghost" className="w-full justify-start">Security Settings</Button>
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={logout}>Sign Out</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="history">Booking History</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't made any bookings yet.</p>
                    <Button variant="default" className="mt-4">Find an Artisan</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reviews You've Written</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't written any reviews yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Saved Artisans</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't saved any artisans yet.</p>
                    <Button variant="default" className="mt-4">Browse Artisans</Button>
                  </div>
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
