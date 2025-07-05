import { SkeletonBlock } from '../SkeletonBlock';

export function OtpVerficationSkeleton() {
  return (
    <div className="w-full max-w-sm px-4 mx-auto flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlock key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
        ))}
      </div>
      <SkeletonBlock className="w-full h-10 rounded-md" />
    </div>
  );
}
