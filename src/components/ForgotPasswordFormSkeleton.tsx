import React from 'react';
import { SkeletonBlock } from '@/components/SkeletonBlock';

export const ForgotPasswordFormSkeleton: React.FC = () => (
  <div className="forgot-password-skeleton-inner">
    <div className="forgot-password-skeleton-header">
      {/* Removed logo skeleton block */}
      <SkeletonBlock className="forgot-password-skeleton-title" />
      <SkeletonBlock className="forgot-password-skeleton-subtitle" />
    </div>
    <div className="forgot-password-skeleton-group">
      <SkeletonBlock className="forgot-password-skeleton-label" />
      <SkeletonBlock className="forgot-password-skeleton-input" />
    </div>
    <SkeletonBlock className="forgot-password-skeleton-submit" />
  </div>
);
 