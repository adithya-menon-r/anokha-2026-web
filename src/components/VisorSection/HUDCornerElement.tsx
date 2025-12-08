'use client';

import React from 'react';

interface HUDCornerElementProps {
  label: string;
  value: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  ref: React.RefObject<HTMLDivElement>;
}

const HUDCornerElement = React.forwardRef<
  HTMLDivElement,
  Omit<HUDCornerElementProps, 'ref'>
>(({ label, value, position }, ref) => {
  const positionClasses = {
    'top-left':
      'top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-32 md:left-1/4',
    'top-right':
      'top-16 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-32 md:right-1/4 md:left-auto',
    'bottom-left':
      'bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-32 md:left-1/4',
    'bottom-right':
      'bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-32 md:right-1/4 md:left-auto',
  };

  return (
    <div
      ref={ref}
      className={`absolute ${positionClasses[position]} text-blue-400 font-mono z-30`}
    >
      <div className="border border-blue-400/50 px-2 py-1 bg-blue-950/40 backdrop-blur-md rounded-md">
        <div className="text-[11px] md:text-xs opacity-70 leading-none">
          {label}
        </div>
        <div className="text-[11px] md:text-xs mt-0.5 leading-none">
          {value}
        </div>
      </div>
    </div>
  );
});

HUDCornerElement.displayName = 'HUDCornerElement';

export default HUDCornerElement;
