'use client';

import { Globe, Instagram, Linkedin } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface Club {
  name: string;
  logo: string;
  desc: string;
  instagram: string;
  linkedin: string;
  website: string;
}

const clubs: Club[] = [
  {
    name: 'Amrita School of AI',
    logo: '/hackathon/Club_logos/Amrita.png',
    desc: 'Amrita School of AI is a premier centre for AI and data science education, fostering innovation, research, and real-world problem-solving.',
    instagram: 'https://www.instagram.com/amrita_university',
    linkedin: 'https://www.linkedin.com/showcase/asai-coimbatore',
    website:
      'https://www.amrita.edu/school/artificial-intelligence/coimbatore/',
  },
  {
    name: 'Anokha',
    logo: '/hackathon/anokha_logo.png',
    desc: 'Anokha is the national tech fest of Amrita Vishwa Vidyapeetham, bringing together the brightest minds for a celebration of technology and innovation.',
    instagram: 'https://www.instagram.com/anokhatechfest',
    linkedin: 'https://www.linkedin.com/school/anokha-amrita',
    website: 'http://anokha.amrita.edu',
  },
  {
    name: 'Tensor AI Club',
    logo: '/hackathon/Club_logos/Tensor.png',
    desc: 'Tensor, the premier Artificial Intelligence club of Amrita Vishwa Vidyapeetham, is committed to nurturing a culture of innovation.',
    instagram: 'https://www.instagram.com/tensor_club',
    linkedin: 'https://www.linkedin.com/in/tensor-club-680958382',
    website: 'https://tensor-web-tau.vercel.app',
  },
  {
    name: 'IETE Student Forum',
    logo: '/hackathon/Club_logos/Iete.png',
    desc: 'IETE Amrita is a multidisciplinary student forum that bridges electronics, communication, and computing with modern AI-driven applications.',
    instagram: 'https://www.instagram.com/iete_amrita',
    linkedin: 'https://www.linkedin.com/in/iete-amrita-sf',
    website: 'https://avvsf.ietecbe.org/',
  },
  {
    name: 'Intel IoT Club',
    logo: '/hackathon/Club_logos/IoT.png',
    desc: 'The Intel IoT Club at Amrita focuses on practical AIoT and edge-computing innovation, guiding students from simulation to full hardware deployment.',
    instagram: 'https://www.instagram.com/inteliotclub',
    linkedin: 'https://www.linkedin.com/company/intel-iot-club',
    website: 'https://inteliotclub.vercel.app',
  },
];

export default function OrganizedBy(): React.JSX.Element {
  const [paused, setPaused] = useState<boolean>(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearResumeTimer = (): void => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const scheduleResume = (delay: number): void => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, delay);
  };

  const handlePointerEnter = (): void => {
    setPaused(true);
    clearResumeTimer();
  };

  const handlePointerLeave = (): void => {
    scheduleResume(5000); // Resume after 5 seconds on hover leave
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Prevent pause if clicking on links (social icons)
    if (e.target instanceof HTMLElement && e.target.closest('a')) {
      return;
    }
    setPaused(true);
    clearResumeTimer();
    scheduleResume(3000); // Pause for 3 seconds on card click
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight pb-1">
            <span className="text-white">Organized</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 pr-1">
              By
            </span>
          </h2>

          <p className="mx-auto mt-4 text-lg text-zinc-400 max-w-2xl italic">
            Presented by the leading student communities of Amrita Vishwa
            Vidyapeetham, Coimbatore
          </p>
        </div>

        {/* ========= MOBILE INFINITE ROTATING CAROUSEL ========= */}
        <div
          className="md:hidden overflow-hidden w-full"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <div className={`carousel-track ${paused ? 'paused' : ''}`}>
            {[...clubs, ...clubs, ...clubs].map((club, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[80vw] bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center mx-3 cursor-pointer"
                onClick={handleCardClick}
              >
                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
                  {club.name}
                </h3>

                {/* Logo */}
                <div className="w-24 h-24 rounded-2xl bg-black/60 p-3 border border-white/20 mb-6 shadow-xl mx-auto flex items-center justify-center">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {club.desc}
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-5">
                  <a
                    href={club.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5 text-zinc-300 hover:text-purple-400" />
                  </a>

                  <a
                    href={club.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-zinc-300 hover:text-purple-400" />
                  </a>

                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5 text-zinc-300 hover:text-purple-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== DESKTOP GRID ========== */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.1] hover:border-purple-500/60 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(139,92,246,0.3)]"
            >
              <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
                {club.name}
              </h3>

              <div className="w-24 h-24 rounded-2xl bg-black/60 p-3 border border-white/20 mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <img
                  src={club.logo}
                  alt={club.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {club.desc}
              </p>

              <div className="mt-auto flex items-center gap-5">
                <a
                  href={club.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 text-zinc-300 hover:text-purple-400" />
                </a>

                <a
                  href={club.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 text-zinc-300 hover:text-purple-400" />
                </a>

                <a
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5 text-zinc-300 hover:text-purple-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .carousel-track {
          display: flex;
          width: max-content;
          animation: infiniteScroll 30s linear infinite;
        }

        .carousel-track.paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
