import Image from 'next/image';
import type React from 'react';

interface GlassFormWrapperProps {
  children: React.ReactNode;
  className?: string; // Optional: to allow additional classes to be passed
  showCorners?: boolean; // Optional: to control visibility of corner images
}

export const GlassFormWrapper: React.FC<GlassFormWrapperProps> = ({
  children,
  className,
  showCorners = true, // Default to true
}) => {
  return (
    <div className={`relative w-full max-w-md mx-auto ${className || ''}`}>
      {/* Corner Images - conditionally rendered */}
      {showCorners && (
        <>
          <Image
            src="/top_left.png"
            alt=""
            width={70}
            height={70}
            className="absolute -top-3 -left-3 pointer-events-none z-10"
          />
          <Image
            src="/top_right.png"
            alt=""
            width={70}
            height={70}
            className="absolute -top-3 -right-3 pointer-events-none z-10"
          />
          <Image
            src="/bottom_left.png"
            alt=""
            width={70}
            height={70}
            className="absolute -bottom-3 -left-3 pointer-events-none z-10"
          />
          <Image
            src="/bottom_right.png"
            alt=""
            width={70}
            height={70}
            className="absolute -bottom-3 -right-3 pointer-events-none z-10"
          />
        </>
      )}

      {/* The content wrapped by the glass style */}
      <div className="glass space-y-4 w-full p-6">{children}</div>
    </div>
  );
};
