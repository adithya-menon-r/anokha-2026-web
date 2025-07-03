import React from "react";
import { SkeletonBlock } from "@/components/SkeletonBlock";

export const LoginFormSkeleton: React.FC = () => (
  <div className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    {/* Title + subtitle */}
    <SkeletonBlock className="h-8 w-1/2 mx-auto mb-2" />
    <SkeletonBlock className="h-4 w-2/3 mx-auto mb-6" />

    {/* Email */}
    <SkeletonBlock className="h-4 w-1/4" />
    <SkeletonBlock className="h-10 w-full" />

    {/* Password */}
    <SkeletonBlock className="h-4 w-1/4" />
    <SkeletonBlock className="h-10 w-full" />

    {/* Forgot pwd link */}
    <SkeletonBlock className="h-4 w-1/3 ml-auto" />

    {/* Submit button */}
    <SkeletonBlock className="h-10 w-full" />

    {/* Signup text */}
    <SkeletonBlock className="h-4 w-3/4 mx-auto" />
  </div>
);
