'use client';

import Image from 'next/image';
import React from 'react';
import { useMaintenanceStore } from '@/stores/useMaintenanceStore';

export default function MaintenanceOverlay() {
  const isMaintenance = useMaintenanceStore((s) => s.isMaintenance);

  if (!isMaintenance) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />

      <div className="relative z-10 rounded-lg m-4 md:m-0 bg-white/95 w-full max-w-sm md:max-w-2xl text-center space-y-3 md:space-y-8 px-6 md:px-20 pb-6 md:pb-8 pt-4 md:pt-0 shadow-2xl">
        <div className="absolute -top-52 left-1/4 transform -translate-x-1/2 md:hidden w-[18rem] h-[18rem] pointer-events-none">
          <Image
            src="/images/mascot-maintenance.png"
            alt="Maintenance Mascot"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-3xl md:text-6xl text-black font-bold mb-0">
          Maintenance in Progress!
        </h2>
        <p className="text-sm md:text-lg text-black">
          The site is currently under maintenance while we perform system
          updates. We'll be back shortly.
        </p>

        <div className="absolute -left-72 -bottom-36 z-50 w-[36rem] h-[36rem] pointer-events-none hidden md:block">
          <Image
            src="/images/mascot-maintenance.png"
            alt="Maintenance Mascot"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
