import Image from 'next/image';
import React from 'react';

export const AboutAnokhaContent: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="z-20 -mb-16 md:-mb-40">
        <Image
          src="/Images/mascot-flag.png"
          alt="Mascot"
          height={700}
          width={700}
          priority={false}
        />
      </div>
      <div className="about_anokha relative max-w-3xl text-left p-8 md:p-12 backdrop-blur-md bg-white/10 border border-white/50 rounded-3xl shadow-xl z-50">
        {/* Top left corner */}
        <Image
          src="/top_left.png"
          alt=""
          height={60}
          width={60}
          className="absolute -top-2 -left-2 pointer-events-none"
          priority={false}
        />
        {/* Top right corner */}
        <Image
          src="/top_right.png"
          alt=""
          height={60}
          width={60}
          className="absolute -top-2 -right-2 pointer-events-none"
          priority={false}
        />
        {/* Bottom left corner */}
        <Image
          src="/bottom_left.png"
          alt=""
          height={60}
          width={60}
          className="absolute -bottom-2 -left-2 pointer-events-none"
          priority={false}
        />
        {/* Bottom right corner */}
        <Image
          src="/bottom_right.png"
          alt=""
          height={60}
          width={60}
          className="absolute -bottom-2 -right-2 pointer-events-none"
          priority={false}
        />
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-white mb-8">
          About <span style={{ fontFamily: 'SPINC' }}>anokha</span>
        </h2>

        {/* Context paragraph */}
        <p className="text-sm md:text-lg text-gray-300 mb-16 leading-relaxed">
          Amrita Vishwa Vidyapeetham's Coimbatore Campus hosts Anokha, a lively
          tech extravaganza! This dynamic 3-day event brings together students,
          professionals, and tech enthusiasts from across the nation for
          exciting competitions, workshops, and interactive sessions covering
          engineering, robotics, AI, and sustainable technologies. More than
          just a competition, Anokha is a celebration of collaboration and
          knowledge exchange. With diverse events catering to different
          interests and skill sets, it's a vibrant showcase of curiosity and
          creativity. Beyond tech, Anokha incorporates cultural elements,
          creating a festive and engaging atmosphere.
        </p>
      </div>
    </div>
  );
};
