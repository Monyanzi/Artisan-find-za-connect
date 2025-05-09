import React from 'react';
import { useParams } from 'react-router-dom';
import { artisans } from '@/utils/data';

// Function to get artisan by ID
export const getArtisanById = (id: string | undefined) => {
  if (!id) return null;
  return artisans.find(artisan => artisan.id === id);
};

const ArtisanProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const artisan = getArtisanById(id);
  
  if (!artisan) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Artisan Not Found</h1>
        <p>The artisan you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{artisan.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-600">{artisan.description}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <ul className="list-disc list-inside space-y-2">
              {artisan.services.map((service, index) => (
                <li key={index} className="text-gray-600">{service}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-medium w-24">Phone:</span>
                <span>{artisan.contact}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Available:</span>
                <span>{artisan.availability}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Location:</span>
                <span>{artisan.location}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Rate:</span>
                <span>R{artisan.hourlyRate}/hour</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
