'use client';

import React, { useRef } from 'react';
import HUDCornerElement from './VisorSection/HUDCornerElement';
import { useVisorAnimation } from './VisorSection/useVisorAnimation';
import VisorBackgrounds from './VisorSection/VisorBackgrounds';
import VisorContent from './VisorSection/VisorContent';

const VisorSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hudElementsRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  // Use animation hook
  useVisorAnimation({
    containerRef,
    visorRef,
    titleRef,
    imageRef,
    textRef,
    scanLineRef,
    topLeftRef,
    topRightRef,
    bottomLeftRef,
    bottomRightRef,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Main Visor Container */}
      <div
        ref={visorRef}
        className="relative w-full h-screen flex items-center justify-center bg-[url('/images/Visor-mobile.png')] md:bg-[url('/images/Visor.png')] bg-cover bg-center"
        style={{
          boxShadow:
            '0 0 60px rgba(59, 130, 246, 0.5), inset 0 0 60px rgba(59, 130, 246, 0.1)',
        }}
      >
        {/* Background layers and effects */}
        <VisorBackgrounds scanLineRef={scanLineRef} />

        {/* HUD Corner Elements */}
        <HUDCornerElement
          ref={topLeftRef}
          label="SYSTEM STATUS"
          value="ACTIVE"
          position="top-left"
        />
        <HUDCornerElement
          ref={topRightRef}
          label="ANALYSIS"
          value="READY"
          position="top-right"
        />
        <HUDCornerElement
          ref={bottomLeftRef}
          label="SIGNAL"
          value="███████ 100%"
          position="bottom-left"
        />
        <HUDCornerElement
          ref={bottomRightRef}
          label="TIMESTAMP"
          value="ONLINE"
          position="bottom-right"
        />

        {/* Main Content */}
        <VisorContent
          titleRef={titleRef}
          imageRef={imageRef}
          textRef={textRef}
          hudElementsRef={hudElementsRef}
        />
      </div>
    </div>
  );
};

export default VisorSection;
