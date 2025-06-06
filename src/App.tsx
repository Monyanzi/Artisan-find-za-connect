
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./contexts/AppContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Index from "./pages/Index";
import Category from "./pages/Category";
import ArtisanProfile from "./pages/ArtisanProfile";
import Search from "./pages/Search";
import AllArtisans from "./pages/AllArtisans";
import Bookings from "./pages/Bookings";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar toggleSidebar={toggleSidebar} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              
              <main className="pt-16 flex-1 lg:pl-64">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/artisan/:id" element={<ArtisanProfile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/artisans" element={<AllArtisans />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
