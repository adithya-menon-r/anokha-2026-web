import { SkeletonBlock } from '../SkeletonBlock';

const otpSlots = ['a', 'b', 'c', 'd', 'e', 'f'];

export function OtpVerficationSkeleton() {
  return (
    <div className="w-full max-w-sm px-4 mx-auto flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {otpSlots.map((slot) => (
          <SkeletonBlock
            key={slot}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md"
          />
        ))}
      </div>
      <SkeletonBlock className="w-full h-10 rounded-md" />
    </div>
  );
}
