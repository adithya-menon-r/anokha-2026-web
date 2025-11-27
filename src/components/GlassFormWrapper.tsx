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
    setShouldAnimate(true);
  }, []);

  return (
    <div
      className={`relative w-full mx-auto ${className || ''} ${shouldAnimate ? 'form-reveal-animation' : 'opacity-0'}`}
    >
      {showCorners && (
        <>
          <Image
            src="/top_left.png"
            alt=""
            width={70}
            height={70}
            className="absolute -top-3 -left-3 pointer-events-none z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]"
          />
          <Image
            src="/top_right.png"
            alt=""
            width={70}
            height={70}
            className="absolute -top-3 -right-3 pointer-events-none z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]"
          />
          <Image
            src="/bottom_left.png"
            alt=""
            width={70}
            height={70}
            className="absolute -bottom-3 -left-3 pointer-events-none z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]"
          />
          <Image
            src="/bottom_right.png"
            alt=""
            width={70}
            height={70}
            className="absolute -bottom-3 -right-3 pointer-events-none z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]"
          />
        </>
      )}

      <div className="glass space-y-4 w-full p-4 sm:p-5 md:p-6">{children}</div>
    </div>
  );
};
