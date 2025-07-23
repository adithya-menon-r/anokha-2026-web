import { SkeletonBlock } from './SkeletonBlock';

export function ResetPasswordFormSkeleton() {
  return (
    <form className="forgot-password-form">
      <div className="forgot-password-form-group">
        <SkeletonBlock className="h-5 w-32 mb-2" />
        <SkeletonBlock className="h-10 w-full" /> 
      </div>
      <div className="forgot-password-form-group">
        <SkeletonBlock className="h-5 w-40 mb-2" /> 
        <SkeletonBlock className="h-10 w-full" /> 
      </div>
      <SkeletonBlock className="h-10 w-full mt-4" /> 
    </form>
  );
} 