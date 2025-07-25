import { SkeletonBlock } from '../SkeletonBlock';

export function ResetPasswordFormSkeleton() {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-5 w-32" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
      <SkeletonBlock className="h-10 w-full mt-2" />
    </form>
  );
}
