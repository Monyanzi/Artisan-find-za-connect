
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, Star, LogIn, Edit3, Save, XCircle, Shield, CreditCard, Bell } from 'lucide-react'; // Added more icons
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Profile: React.FC = () => {
  const { isAuthenticated, currentUser, login, logout } = useApp();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState('');
  const [editablePhone, setEditablePhone] = useState('');
  const [editableLocation, setEditableLocation] = useState('');

  useEffect(() => {
    if (currentUser) {
      setEditableName(currentUser.name);
      setEditablePhone(currentUser.phone);
      setEditableLocation(currentUser.location);
    }
  }, [currentUser, isEditing]); // Re-populate form if currentUser changes or edit mode is re-entered

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
      isArtisan: false,
      // Ensure all fields from User type are present
      profileImage: currentUser.profileImageUrl || currentUser.profileImage, // Use profileImageUrl first
      category: currentUser.category,
      skills: currentUser.skills,
      description: currentUser.description,
    };
    login(mockLoginUser);
  };

  const handleEditToggle = () => {
    if (currentUser) {
      setIsEditing(true);
      // Initialize editable states when starting edit
      setEditableName(currentUser.name);
      setEditablePhone(currentUser.phone);
      setEditableLocation(currentUser.location);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editable states to current user's data to discard changes
    if (currentUser) {
      setEditableName(currentUser.name);
      setEditablePhone(currentUser.phone);
      setEditableLocation(currentUser.location);
    }
  };

  const handleSaveChanges = () => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: editableName,
      phone: editablePhone,
      location: editableLocation,
      // profileImageUrl will be updated if a mechanism to change it is added
    };
    login(updatedUser); // This updates the currentUser in AppContext
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };
  
  const handleComingSoon = (featureName: string) => {
    toast({
      title: featureName,
      description: "This feature is coming soon!",
    });
  };

  const handleBecomeArtisan = () => {
    console.log("User wants to become an artisan. User ID:", currentUser?.id);
    toast({
      title: "Become an Artisan",
      description: "Artisan registration process coming soon!",
    });
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
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {user.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : user.profileImage ? ( // Fallback to profileImage if profileImageUrl is not set
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-500" />
                )}
              </div>
              {isEditing ? (
                <Input 
                  value={editableName} 
                  onChange={(e) => setEditableName(e.target.value)} 
                  className="text-center text-2xl font-bold"
                  placeholder="Your Name"
                />
              ) : (
                <CardTitle>{user.name}</CardTitle>
              )}
              <p className="text-sm text-gray-500">Client since {user.joinDate}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Email</label>
                  <p className="text-sm">{user.email}</p> {/* Email not editable for now */}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Phone</label>
                  {isEditing ? (
                    <Input value={editablePhone} onChange={(e) => setEditablePhone(e.target.value)} placeholder="Your Phone"/>
                  ) : (
                    <p className="text-sm">{user.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Location</label>
                  {isEditing ? (
                    <Input value={editableLocation} onChange={(e) => setEditableLocation(e.target.value)} placeholder="Your Location"/>
                  ) : (
                    <p className="text-sm">{user.location}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveChanges} className="w-full">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit} className="w-full">
                      <XCircle className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full" onClick={handleEditToggle}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
              </div>
              
              {!user.isArtisan && !isEditing && (
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
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start pl-2" onClick={() => handleComingSoon("Notification Preferences")}>
                  <Bell className="mr-2 h-4 w-4" /> Notification Preferences
                </Button>
                <Button variant="ghost" className="w-full justify-start pl-2" onClick={() => handleComingSoon("Payment Methods")}>
                  <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start pl-2" onClick={() => handleComingSoon("Security Settings")}>
                  <Shield className="mr-2 h-4 w-4" /> Security Settings
                </Button>
                 {/* Placeholder for Change Password / Delete Account under Security */}
                <div className="pl-8 pr-2 py-2 text-sm">
                    <p className="text-gray-400 cursor-not-allowed" onClick={() => handleComingSoon("Change Password")}>Change Password (coming soon)</p>
                    <p className="text-red-400 cursor-not-allowed mt-1" onClick={() => handleComingSoon("Delete Account")}>Delete Account (coming soon)</p>
                </div>
                <Button variant="ghost" className="w-full justify-start pl-2 text-destructive hover:text-destructive" onClick={logout}>
                  <LogIn className="mr-2 h-4 w-4" /> Sign Out
                </Button>
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
