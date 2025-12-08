'use client';

import React from 'react';

interface VisorBackgroundsProps {
  scanLineRef: React.RefObject<HTMLDivElement | null>;
}

const VisorBackgrounds: React.FC<VisorBackgroundsProps> = ({ scanLineRef }) => {
  return (
    <>
      {/* Transparent overlay for visor effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/30 pointer-events-none" />

      {/* HUD Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent), 
                             linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Scan Line Effect */}
      <div
        ref={scanLineRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
          height: '100px',
          zIndex: 30,
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black/30" />

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-400/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-blue-400/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-400/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-400/30" />
    </>
  );
};

export default VisorBackgrounds;
