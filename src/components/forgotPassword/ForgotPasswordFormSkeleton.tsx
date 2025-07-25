import React from 'react';
import { SkeletonBlock } from '@/components/SkeletonBlock';

export const ForgotPasswordFormSkeleton: React.FC = () => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col items-center gap-1">
      <SkeletonBlock className="h-6 w-32" />
      <SkeletonBlock className="h-4 w-48" />
    </div>
    <div className="flex flex-col gap-1">
      <SkeletonBlock className="h-4 w-20" />
      <SkeletonBlock className="h-10 w-full" />
    </div>
    <SkeletonBlock className="h-10 w-full mt-2" />
  </div>
);
