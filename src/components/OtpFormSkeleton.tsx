import React from 'react';
import { SkeletonBlock } from '@/components/SkeletonBlock';

export const OtpFormSkeleton: React.FC = () => (
  <div className="forgot-password-skeleton-inner">
    <div className="forgot-password-skeleton-group">
      <SkeletonBlock className="forgot-password-skeleton-label" />
      <SkeletonBlock className="forgot-password-skeleton-input" />
    </div>
    <div className="forgot-password-skeleton-group">
      <SkeletonBlock className="forgot-password-skeleton-label" />
      <SkeletonBlock className="forgot-password-skeleton-input" />
    </div>
    <SkeletonBlock className="forgot-password-skeleton-submit" />
  </div>
); 