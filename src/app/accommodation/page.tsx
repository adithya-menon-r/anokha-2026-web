import React from 'react';
import AccommodationForm from '@/components/Accommodation/AccommodationForm';
import UnifiedBackground from '@/components/UnifiedBackground';

const AccommodationPage: React.FC = () => {
  return (
    <>
      <UnifiedBackground />
      <main className="relative z-10 min-h-screen flex items-start justify-center px-4 md:px-16 py-10">
        <div className="w-full max-w-7xl text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white text-center md:text-left">
            Accommodation
          </h1>
          <AccommodationForm />
        </div>
      </main>
    </>
  );
};

export default AccommodationPage;
