import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';

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
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Set to true on first mount to trigger the animation
    setShouldAnimate(true);
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div
      className={`relative w-full max-w-md mx-auto ${className || ''} ${shouldAnimate ? 'form-reveal-animation' : 'opacity-0'}`}
    >
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

      <div className="glass space-y-4 w-full p-6">{children}</div>
    </div>
  );
};
