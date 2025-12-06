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
    'top-left': 'top-32 left-1/4',
    'top-right': 'top-32 right-1/4',
    'bottom-left': 'bottom-32 left-1/4',
    'bottom-right': 'bottom-32 right-1/4',
  };

  return (
    <div
      ref={ref}
      className={`absolute ${positionClasses[position]} text-blue-400 font-mono z-30`}
    >
      <div className="border border-blue-400/50 p-2 bg-blue-950/30 backdrop-blur">
        <div className="text-xs opacity-70">{label}</div>
        <div className="text-xs mt-0.5">{value}</div>
      </div>
    </div>
  );
});

HUDCornerElement.displayName = 'HUDCornerElement';

export default HUDCornerElement;
