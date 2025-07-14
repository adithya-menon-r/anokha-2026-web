import React from 'react';
import { SkeletonBlock } from '@/components/SkeletonBlock';

export const ForgotPasswordFormSkeleton: React.FC = () => (
  <div className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div className="flex flex-col items-center mb-2">
      <SkeletonBlock className="h-[90px] w-[120px] mb-2" />
      <SkeletonBlock className="h-6 w-32 mb-1" />
      <SkeletonBlock className="h-4 w-48" />
    </div>
    <div className="space-y-2">
      <SkeletonBlock className="h-4 w-16 mb-1" />
      <SkeletonBlock className="h-10 w-full" />
    </div>
    <SkeletonBlock className="h-10 w-full mt-4" />
  </div>
);
