'use client';

import React from 'react';
import { useMaintenanceStore } from '@/stores/useMaintenanceStore';

export default function MaintenanceOverlay() {
  const isMaintenance = useMaintenanceStore((s) => s.isMaintenance);

  if (!isMaintenance) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
    </div>
  );
}
